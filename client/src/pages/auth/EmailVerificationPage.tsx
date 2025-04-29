import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import AuthLayout from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, Mail } from 'lucide-react';

export default function EmailVerificationPage() {
  const [_, setLocation] = useLocation();
  const { currentUser, verifyEmail, logout, errors, loading } = useAuth();
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [resendSuccess, setResendSuccess] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    // If no user is logged in, redirect to login
    if (!currentUser) {
      setLocation('/login');
    }

    // If user's email is already verified, redirect to dashboard
    if (currentUser?.emailVerified) {
      setLocation('/dashboard');
    }
  }, [currentUser, setLocation]);

  useEffect(() => {
    // Countdown timer for resend button
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendVerification = async () => {
    setShowErrors(false);
    setResendSuccess(false);
    
    const success = await verifyEmail();
    
    if (success) {
      setResendSuccess(true);
      setCountdown(60); // 60 seconds cooldown
    } else {
      setShowErrors(true);
    }
  };

  const handleLogout = async () => {
    await logout();
    setLocation('/login');
  };

  return (
    <AuthLayout 
      title="Verify Your Email" 
      description="We've sent a verification email to your inbox"
      showSocialLogin={false}
      isLoading={loading}
    >
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-primary/10 p-4 rounded-full">
            <Mail className="h-12 w-12 text-primary" />
          </div>
        </div>

        {showErrors && errors.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </AlertDescription>
          </Alert>
        )}

        {resendSuccess && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription>
              Verification email sent! Please check your inbox.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-gray-600 dark:text-gray-300">
          <p className="mb-2">We've sent a verification email to:</p>
          <p className="font-semibold">{currentUser?.email}</p>
          <p className="mt-4 text-sm">
            Click the link in the email to verify your account. 
            If you don't see it, check your spam folder.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            onClick={handleResendVerification}
            disabled={loading || countdown > 0}
            className="w-full"
          >
            {countdown > 0 
              ? `Resend Email (${countdown}s)` 
              : loading 
                ? 'Sending...' 
                : 'Resend Verification Email'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={loading}
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}