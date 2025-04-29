import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, LogOut, Settings, Shield, UserIcon, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';

export default function DashboardPage() {
  const [_, setLocation] = useLocation();
  const { currentUser, userInfo, logout, errors, getUserLoginActivity } = useAuth();
  const [loginActivity, setLoginActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!currentUser) {
      setLocation('/login');
      return;
    }

    // Redirect to email verification if email is not verified
    if (currentUser && !currentUser.emailVerified) {
      setLocation('/email-verification');
      return;
    }

    // Fetch login activity
    const fetchLoginActivity = async () => {
      try {
        const activity = await getUserLoginActivity();
        setLoginActivity(activity);
      } catch (error) {
        console.error('Error fetching login activity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoginActivity();
  }, [currentUser, setLocation, getUserLoginActivity]);

  const handleLogout = async () => {
    await logout();
    setLocation('/login');
  };

  if (!currentUser || !userInfo) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {userInfo.displayName || 'User'}!
          </p>
        </div>
        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>

      {!currentUser.emailVerified && (
        <Alert className="mb-6 bg-yellow-50 text-yellow-800 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription>
            Your email is not verified. Please check your inbox and verify your email address.
          </AlertDescription>
        </Alert>
      )}

      {errors.length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span>{currentUser.emailVerified ? 'Verified' : 'Unverified'}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {userInfo.createdAt ? `Created ${format(userInfo.createdAt.toDate(), 'MMM d, yyyy')}` : 'Recently created'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Login</CardTitle>
          </CardHeader>
          <CardContent>
            {userInfo.lastLogin ? (
              <div className="space-y-1">
                <div className="text-lg font-semibold">
                  {userInfo.lastLogin.location || 'Unknown location'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {userInfo.lastLogin.timestamp ? 
                    format(userInfo.lastLogin.timestamp.toDate(), 'PPpp') : 
                    'Recently'}
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No previous login data</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Account Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">
                {userInfo.email}
              </div>
              {userInfo.phoneNumber && (
                <div className="text-sm text-muted-foreground">
                  {userInfo.phoneNumber}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Manage Account
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="activity">
        <TabsList className="mb-4">
          <TabsTrigger value="activity">Login Activity</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Login Activity</CardTitle>
              <CardDescription>
                A list of your recent logins and their details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading activity...</div>
              ) : loginActivity.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Browser</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>IP Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginActivity.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {activity.timestamp ? 
                            format(activity.timestamp.toDate(), 'PPpp') : 
                            'Unknown'}
                        </TableCell>
                        <TableCell>{activity.device || 'Unknown'}</TableCell>
                        <TableCell>{activity.browser || 'Unknown'}</TableCell>
                        <TableCell>{activity.location || 'Unknown'}</TableCell>
                        <TableCell>{activity.ip || 'Unknown'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No login activity recorded yet.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your profile details and personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="bg-primary/10 p-6 rounded-full">
                    {userInfo.photoURL ? (
                      <img 
                        src={userInfo.photoURL} 
                        alt="Profile" 
                        className="h-24 w-24 rounded-full"
                      />
                    ) : (
                      <UserIcon className="h-24 w-24 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {userInfo.displayName || 'User'}
                    </h3>
                    <p className="text-muted-foreground">{userInfo.email}</p>
                    {userInfo.phoneNumber && (
                      <p className="text-muted-foreground">{userInfo.phoneNumber}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-4">
                  <Button>Update Profile</Button>
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication options.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Setup 2FA</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Password</h4>
                      <p className="text-sm text-muted-foreground">
                        Last changed: Never
                      </p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Active Sessions</h4>
                      <p className="text-sm text-muted-foreground">
                        Manage your active login sessions
                      </p>
                    </div>
                    <Button variant="outline">View Sessions</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}