import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword as firebaseCreateUser, 
  signInWithEmailAndPassword as firebaseSignIn, 
  signOut as firebaseSignOut, 
  sendEmailVerification as firebaseSendEmailVerification,
  sendPasswordResetEmail as firebaseSendPasswordReset,
  updateProfile as firebaseUpdateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup,
  updatePassword as firebaseUpdatePassword,
  updateEmail as firebaseUpdateEmail,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  multiFactor,
  PhoneMultiFactorGenerator,
  TotpMultiFactorGenerator,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  User,
  onAuthStateChanged as firebaseAuthStateChanged
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection,
  query,
  where,
  getDocs,
  arrayUnion,
  serverTimestamp 
} from "firebase/firestore";

// Import mock auth system for fallback
import { mockAuth, mockDb, mockServerTimestamp, mockArrayUnion, MockUser } from './mockAuth';

// Track whether to use real Firebase or fallback
let useFirebase = false; // Start with mock auth by default 
let failedConfigurationAttempt = false;

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app: any;
let auth: any;
let db: any;

// Initialize Firebase with fallback mechanism
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Test the configuration
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.warn('Firebase configuration incomplete - falling back to mock auth');
    useFirebase = false;
  }
} catch (error) {
  console.error('Firebase initialization error', error);
  useFirebase = false;
}

// OAuth Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

// Session persistence
if (typeof window !== 'undefined' && useFirebase && auth) {
  try {
    const rememberMe = window.localStorage.getItem('rememberMe') === 'true';
    setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  } catch (error) {
    console.error('Error setting auth persistence', error);
  }
}

// Firebase fallback wrappers
const createUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!useFirebase || failedConfigurationAttempt) {
    console.log('Using mock auth for registration');
    return mockAuth.createUserWithEmailAndPassword(email, password);
  }
  
  try {
    return await firebaseCreateUser(auth, email, password);
  } catch (error: any) {
    if (error?.code === 'auth/configuration-not-found') {
      failedConfigurationAttempt = true;
      console.warn('Firebase configuration not found - falling back to mock auth for registration');
      return mockAuth.createUserWithEmailAndPassword(email, password);
    }
    throw error;
  }
};

const signInWithEmailAndPassword = async (email: string, password: string) => {
  if (!useFirebase || failedConfigurationAttempt) {
    console.log('Using mock auth for login');
    return mockAuth.signInWithEmailAndPassword(email, password);
  }
  
  try {
    return await firebaseSignIn(auth, email, password);
  } catch (error: any) {
    if (error?.code === 'auth/configuration-not-found') {
      failedConfigurationAttempt = true;
      console.warn('Firebase configuration not found - falling back to mock auth for login');
      return mockAuth.signInWithEmailAndPassword(email, password);
    }
    throw error;
  }
};

const signOut = async () => {
  if (!useFirebase || failedConfigurationAttempt) {
    return mockAuth.signOut();
  }
  
  try {
    return await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out with Firebase', error);
    return mockAuth.signOut();
  }
};

const updateProfile = async (user: any, profile: { displayName?: string; photoURL?: string }) => {
  if (!useFirebase || failedConfigurationAttempt) {
    return mockAuth.updateProfile(user, profile);
  }
  
  try {
    return await firebaseUpdateProfile(user, profile);
  } catch (error: any) {
    if (error?.code === 'auth/configuration-not-found') {
      failedConfigurationAttempt = true;
      return mockAuth.updateProfile(user, profile);
    }
    throw error;
  }
};

const sendEmailVerification = async (user: any) => {
  if (!useFirebase || failedConfigurationAttempt) {
    return mockAuth.sendEmailVerification(user);
  }
  
  try {
    return await firebaseSendEmailVerification(user);
  } catch (error: any) {
    if (error?.code === 'auth/configuration-not-found') {
      failedConfigurationAttempt = true;
      return mockAuth.sendEmailVerification(user);
    }
    throw error;
  }
};

const sendPasswordResetEmail = async (email: string) => {
  if (!useFirebase || failedConfigurationAttempt) {
    return mockAuth.sendPasswordResetEmail(email);
  }
  
  try {
    return await firebaseSendPasswordReset(auth, email);
  } catch (error: any) {
    if (error?.code === 'auth/configuration-not-found') {
      failedConfigurationAttempt = true;
      return mockAuth.sendPasswordResetEmail(email);
    }
    throw error;
  }
};

const updateEmail = async (user: any, newEmail: string) => {
  if (!useFirebase || failedConfigurationAttempt) {
    return mockAuth.updateEmail(user, newEmail);
  }
  
  try {
    return await firebaseUpdateEmail(user, newEmail);
  } catch (error: any) {
    if (error?.code === 'auth/configuration-not-found') {
      failedConfigurationAttempt = true;
      return mockAuth.updateEmail(user, newEmail);
    }
    throw error;
  }
};

const updatePassword = async (user: any, newPassword: string) => {
  if (!useFirebase || failedConfigurationAttempt) {
    return mockAuth.updatePassword(user, newPassword);
  }
  
  try {
    return await firebaseUpdatePassword(user, newPassword);
  } catch (error: any) {
    if (error?.code === 'auth/configuration-not-found') {
      failedConfigurationAttempt = true;
      return mockAuth.updatePassword(user, newPassword);
    }
    throw error;
  }
};

const onAuthStateChanged = (callback: (user: User | MockUser | null) => void) => {
  if (!useFirebase || failedConfigurationAttempt) {
    return mockAuth.onAuthStateChanged(callback);
  }
  
  try {
    return firebaseAuthStateChanged(auth, callback);
  } catch (error) {
    console.error('Error with auth state changes in Firebase', error);
    return mockAuth.onAuthStateChanged(callback);
  }
};

// Helper to get current user
const getCurrentUser = () => {
  if (!useFirebase || failedConfigurationAttempt) {
    return mockAuth.getCurrentUser();
  }
  return auth.currentUser;
};

// Helper to get browser and platform info for device tracking
const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";
  let browserVersion = "Unknown";
  let platform = navigator.platform;
  
  // Detect browser
  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "Chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "Firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "Safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "Opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "Edge";
  } else if (userAgent.match(/msie|trident/i)) {
    browserName = "Internet Explorer";
  }
  
  // Get browser version
  const versionMatch = userAgent.match(/(chrome|firefox|safari|opr|edg|msie|rv)[\s/:](\d+(\.\d+)?)/i);
  if (versionMatch) {
    browserVersion = versionMatch[2];
  }
  
  return {
    browser: `${browserName} ${browserVersion}`,
    platform,
    userAgent
  };
};

// Helper to get user's approximate location
const getLocationInfo = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      city: data.city,
      region: data.region,
      country: data.country_name,
      ip: data.ip
    };
  } catch (error) {
    console.error("Error fetching location info:", error);
    return {
      city: "Unknown",
      region: "Unknown",
      country: "Unknown",
      ip: "Unknown"
    };
  }
};

// Track login device information in storage
const trackLoginDevice = async (userId: string) => {
  if (!useFirebase || failedConfigurationAttempt) {
    // For mock auth, we don't need to track login device
    return true;
  }
  
  try {
    const deviceInfo = getBrowserInfo();
    const locationInfo = await getLocationInfo();
    
    const loginData = {
      timestamp: serverTimestamp(),
      device: deviceInfo.platform,
      browser: deviceInfo.browser,
      ip: locationInfo.ip,
      location: `${locationInfo.city}, ${locationInfo.region}, ${locationInfo.country}`
    };
    
    const userRef = doc(db, "users", userId);
    
    // Add login to history
    await updateDoc(userRef, {
      loginHistory: arrayUnion(loginData),
      lastLogin: loginData
    });
    
    return true;
  } catch (error) {
    console.error("Error tracking login device:", error);
    return false;
  }
};

export {
  app,
  auth,
  db,
  getCurrentUser,
  googleProvider,
  facebookProvider,
  githubProvider,
  appleProvider,
  trackLoginDevice,
  getBrowserInfo,
  getLocationInfo,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
  RecaptchaVerifier,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  TotpMultiFactorGenerator,
  multiFactor,
  signInWithPhoneNumber,
  serverTimestamp,
  arrayUnion
};