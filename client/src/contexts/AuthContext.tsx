import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  db, 
  googleProvider, 
  facebookProvider, 
  githubProvider, 
  appleProvider, 
  trackLoginDevice,
  // Use the wrappers that handle Firebase/mock fallback
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  updatePassword,
  updateEmail,
  onAuthStateChanged
} from '@/lib/firebase';
import {
  User,
  signInWithPopup,
  UserCredential
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { toast } from 'react-toastify';

interface AuthContextProps {
  currentUser: User | null;
  userInfo: UserInfo | null;
  loading: boolean;
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  register: (email: string, password: string, displayName: string, phoneNumber?: string) => Promise<boolean>;
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  socialLogin: (provider: 'google' | 'facebook' | 'github' | 'apple') => Promise<boolean>;
  phoneLogin: (phoneNumber: string, appVerifier: any) => Promise<any>;
  logout: () => Promise<boolean>;
  updateUserProfile: (data: {displayName?: string, photoURL?: string}) => Promise<boolean>;
  updateUserEmail: (newEmail: string) => Promise<boolean>;
  updateUserPassword: (newPassword: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  verifyEmail: () => Promise<boolean>;
  checkUsername: (username: string) => Promise<boolean>;
  getUserLoginActivity: () => Promise<any[]>;
  reauthenticate: () => Promise<boolean>;
}

interface UserInfo {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: any;
  lastLogin: any;
  username?: string;
  isNewUser?: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (user: User | null) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Get extended user info from Firestore
          try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
              const userData = userDoc.data();
              
              setUserInfo({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                createdAt: userData.createdAt,
                lastLogin: userData.lastLogin,
                username: userData.username,
                isNewUser: false
              });
            } else {
              // If user exists in Auth but not in Firestore, create a record
              const newUserData = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                createdAt: serverTimestamp(),
                lastLogin: null,
                loginHistory: [],
                isNewUser: true
              };
              
              await setDoc(userDocRef, newUserData);
              setUserInfo(newUserData as UserInfo);
              
              // Track this initial login
              await trackLoginDevice(user.uid);
            }
          } catch (firestoreError) {
            console.warn('Error accessing Firestore:', firestoreError);
            // Create minimal user info from auth
            setUserInfo({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
              createdAt: new Date(),
              lastLogin: new Date(),
              isNewUser: false
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserInfo(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Register new user
  const register = async (email: string, password: string, displayName: string, phoneNumber?: string): Promise<boolean> => {
    try {
      setLoading(true);
      setErrors([]);
      
      console.log('Starting registration with email:', email);
      
      // Create user - using our custom wrapper that handles the fallback
      const userCredential = await createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      console.log('User created successfully with ID:', user.uid);
      
      // Update profile with display name
      await updateProfile(user, {
        displayName: displayName
      });
      
      try {
        // Create user document in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          displayName: displayName,
          email: email,
          phoneNumber: phoneNumber || null,
          photoURL: null,
          emailVerified: false,
          createdAt: serverTimestamp(),
          lastLogin: null,
          loginHistory: []
        });
        
        // Track this initial login
        await trackLoginDevice(user.uid);
      } catch (firestoreError) {
        console.warn('Could not create user in Firestore - likely using mock auth', firestoreError);
      }
      
      // Send email verification
      await sendEmailVerification(user);
      
      toast.success("Registration successful! Please verify your email.");
      return true;
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMessage = error.message || "Registration failed";
      setErrors(prev => [...prev, errorMessage]);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login with email/password
  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    try {
      setLoading(true);
      setErrors([]);
      
      // Save remember me preference
      window.localStorage.setItem('rememberMe', rememberMe.toString());
      
      console.log('Starting login with email:', email);
      
      // Sign in user - using the imported wrapper that handles fallback
      const userCredential = await signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      console.log('Login successful with user ID:', user.uid);
      
      try {
        // Track this login
        await trackLoginDevice(user.uid);
      } catch (trackError) {
        console.warn('Could not track login device - likely using mock auth', trackError);
      }
      
      toast.success("Login successful!");
      return true;
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error.message || "Login failed";
      setErrors(prev => [...prev, errorMessage]);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Social login (Google, Facebook, GitHub, Apple)
  const socialLogin = async (providerName: 'google' | 'facebook' | 'github' | 'apple'): Promise<boolean> => {
    try {
      setLoading(true);
      setErrors([]);
      
      let provider;
      switch (providerName) {
        case 'google': provider = googleProvider; break;
        case 'facebook': provider = facebookProvider; break;
        case 'github': provider = githubProvider; break;
        case 'apple': provider = appleProvider; break;
        default: throw new Error("Invalid provider");
      }
      
      // Sign in with the provider
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Check if this is a new user
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // Create user document in Firestore for new social login
        await setDoc(userDocRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          createdAt: serverTimestamp(),
          lastLogin: null,
          loginHistory: [],
          provider: providerName
        });
      }
      
      // Track this login
      await trackLoginDevice(user.uid);
      
      toast.success("Login successful!");
      return true;
    } catch (error: any) {
      console.error("Social login error:", error);
      setErrors(prev => [...prev, error.message]);
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Phone number login
  const phoneLogin = async (phoneNumber: string, appVerifier: any) => {
    try {
      setLoading(true);
      setErrors([]);
      
      // Return the confirmation result for the next step
      return await signInWithEmailAndPassword(auth, phoneNumber, appVerifier);
    } catch (error: any) {
      console.error("Phone login error:", error);
      setErrors(prev => [...prev, error.message]);
      toast.error(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async (): Promise<boolean> => {
    try {
      setLoading(true);
      await signOut(auth);
      toast.success("Logged out successfully");
      return true;
    } catch (error: any) {
      console.error("Logout error:", error);
      setErrors(prev => [...prev, error.message]);
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (data: {displayName?: string, photoURL?: string}): Promise<boolean> => {
    try {
      setLoading(true);
      setErrors([]);
      
      if (!currentUser) {
        throw new Error("No user is logged in");
      }
      
      // Update Auth profile
      await updateProfile(currentUser, data);
      
      // Update Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, data);
      
      toast.success("Profile updated successfully");
      return true;
    } catch (error: any) {
      console.error("Profile update error:", error);
      setErrors(prev => [...prev, error.message]);
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update user email
  const updateUserEmail = async (newEmail: string): Promise<boolean> => {
    try {
      setLoading(true);
      setErrors([]);
      
      if (!currentUser) {
        throw new Error("No user is logged in");
      }
      
      // Update Auth email
      await updateEmail(currentUser, newEmail);
      
      // Update Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, { email: newEmail });
      
      // Send verification email
      await sendEmailVerification(currentUser);
      
      toast.success("Email updated successfully. Please verify your new email address.");
      return true;
    } catch (error: any) {
      console.error("Email update error:", error);
      setErrors(prev => [...prev, error.message]);
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update user password
  const updateUserPassword = async (newPassword: string): Promise<boolean> => {
    try {
      setLoading(true);
      setErrors([]);
      
      if (!currentUser) {
        throw new Error("No user is logged in");
      }
      
      // Update password
      await updatePassword(currentUser, newPassword);
      
      toast.success("Password updated successfully");
      return true;
    } catch (error: any) {
      console.error("Password update error:", error);
      setErrors(prev => [...prev, error.message]);
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      setLoading(true);
      setErrors([]);
      
      await sendPasswordResetEmail(auth, email);
      
      toast.success("Password reset email sent. Please check your inbox.");
      return true;
    } catch (error: any) {
      console.error("Password reset error:", error);
      setErrors(prev => [...prev, error.message]);
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Verify email
  const verifyEmail = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setErrors([]);
      
      if (!currentUser) {
        throw new Error("No user is logged in");
      }
      
      await sendEmailVerification(currentUser);
      
      toast.success("Verification email sent. Please check your inbox.");
      return true;
    } catch (error: any) {
      console.error("Email verification error:", error);
      setErrors(prev => [...prev, error.message]);
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check if username is available
  const checkUsername = async (username: string): Promise<boolean> => {
    try {
      setLoading(true);
      setErrors([]);
      
      // Check if username is already taken
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.empty; // True if username is available
    } catch (error: any) {
      console.error("Username check error:", error);
      setErrors(prev => [...prev, error.message]);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get user login activity
  const getUserLoginActivity = async (): Promise<any[]> => {
    try {
      setLoading(true);
      setErrors([]);
      
      if (!currentUser) {
        throw new Error("No user is logged in");
      }
      
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        return userDoc.data().loginHistory || [];
      }
      
      return [];
    } catch (error: any) {
      console.error("Login activity error:", error);
      setErrors(prev => [...prev, error.message]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Reauthenticate user (placeholder - will need specific implementation)
  const reauthenticate = async (): Promise<boolean> => {
    // This is a placeholder - reauthentication will depend on the specific implementation
    // Will need to use EmailAuthProvider or other providers to reauthenticate
    return true;
  };

  const value = {
    currentUser,
    userInfo,
    loading,
    errors,
    setErrors,
    register,
    login,
    socialLogin,
    phoneLogin,
    logout,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    resetPassword,
    verifyEmail,
    checkUsername,
    getUserLoginActivity,
    reauthenticate
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};