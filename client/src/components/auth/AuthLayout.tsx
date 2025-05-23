import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FaGithub, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  showSocialLogin?: boolean;
  footer?: React.ReactNode;
  isLoading?: boolean;
}

export default function AuthLayout({
  children,
  title,
  description,
  showSocialLogin = true,
  footer,
  isLoading = false
}: AuthLayoutProps) {
  const { socialLogin } = useAuth();
  
  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'github' | 'apple') => {
    await socialLogin(provider);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <ToastContainer position="top-right" autoClose={5000} />
      
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
          {description && <CardDescription className="text-center">{description}</CardDescription>}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Main Content */}
          {children}
          
          {/* Social Login Options */}
          {showSocialLogin && (
            <>
              <div className="flex items-center space-x-2 my-4">
                <Separator className="flex-1" />
                <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
                <Separator className="flex-1" />
              </div>
              
              <div className="space-y-4">
                <p className="text-xs text-amber-600 text-center">
                  Note: To enable social login, you need to configure each provider in the Firebase Console and add this domain to the authorized domains list.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    type="button" 
                    disabled={true}
                    className="flex items-center justify-center space-x-2 opacity-50 cursor-not-allowed"
                    title="Configuration needed in Firebase Console"
                  >
                    <FaGoogle />
                    <span>Google</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    type="button" 
                    disabled={true}
                    className="flex items-center justify-center space-x-2 opacity-50 cursor-not-allowed"
                    title="Configuration needed in Firebase Console"
                  >
                    <FaFacebook />
                    <span>Facebook</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    type="button" 
                    disabled={true}
                    className="flex items-center justify-center space-x-2 opacity-50 cursor-not-allowed"
                    title="Configuration needed in Firebase Console"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    type="button" 
                    disabled={true}
                    className="flex items-center justify-center space-x-2 opacity-50 cursor-not-allowed"
                    title="Configuration needed in Firebase Console"
                  >
                    <FaApple />
                    <span>Apple</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
        
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </div>
  );
}