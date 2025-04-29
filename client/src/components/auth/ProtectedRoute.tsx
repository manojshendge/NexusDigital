import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVerified?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  requireVerified = true 
}: ProtectedRouteProps) {
  const [location, setLocation] = useLocation();
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    // Wait until auth is initialized
    if (loading) return;

    // If not logged in, redirect to login
    if (!currentUser) {
      setLocation('/login');
      return;
    }

    // If verification is required and email is not verified, redirect
    if (requireVerified && !currentUser.emailVerified) {
      setLocation('/email-verification');
      return;
    }
  }, [currentUser, loading, requireVerified, setLocation]);

  // While loading, show nothing
  if (loading) {
    return null;
  }

  // If not authenticated, don't render children
  if (!currentUser) {
    return null;
  }

  // If email verification is required but not verified, don't render children
  if (requireVerified && !currentUser.emailVerified) {
    return null;
  }

  // Otherwise, render the protected content
  return <>{children}</>;
}