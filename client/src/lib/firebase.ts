import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup,
  updatePassword,
  updateEmail,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  multiFactor,
  PhoneMultiFactorGenerator,
  TotpMultiFactorGenerator,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence
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

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// OAuth Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

// Session persistence
if (typeof window !== 'undefined') {
  const rememberMe = window.localStorage.getItem('rememberMe') === 'true';
  setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
}

// Helper to get current user
const getCurrentUser = () => auth.currentUser;

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

// Track login device information in Firestore
const trackLoginDevice = async (userId: string) => {
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
  RecaptchaVerifier,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  TotpMultiFactorGenerator,
  multiFactor,
  signInWithPhoneNumber
};