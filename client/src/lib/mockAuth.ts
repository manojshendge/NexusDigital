// This is a temporary mock authentication implementation for demo purposes
// Replace with real Firebase authentication in production

// Types that mimic Firebase types
export interface MockUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: Date;
  lastLogin: {
    timestamp: Date;
    device: string;
    browser: string;
    ip: string;
    location: string;
  } | null;
}

// Mock Storage for demo
const STORAGE_KEY = 'mock_auth_users';

// Load users from localStorage
const loadUsers = (): Record<string, MockUser> => {
  try {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : {};
  } catch (error) {
    console.error('Error loading users from localStorage:', error);
    return {};
  }
};

// Save users to localStorage
const saveUsers = (users: Record<string, MockUser>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
  }
};

// Current user storage
let currentUser: MockUser | null = null;

// Mock authentication methods
export const mockAuth = {
  // Register a new user
  createUserWithEmailAndPassword: async (email: string, password: string): Promise<{ user: MockUser }> => {
    const users = loadUsers();
    
    // Check if email already exists
    const existingUser = Object.values(users).find(user => user.email === email);
    if (existingUser) {
      throw new Error('auth/email-already-in-use');
    }
    
    // Create new user
    const newUser: MockUser = {
      uid: `mock_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`,
      email,
      displayName: null,
      phoneNumber: null,
      photoURL: null,
      emailVerified: false,
      createdAt: new Date(),
      lastLogin: null,
    };
    
    // Store user locally
    users[newUser.uid] = newUser;
    saveUsers(users);
    
    // Set current user
    currentUser = newUser;
    
    // Store current user in session
    localStorage.setItem('mock_current_user', JSON.stringify(newUser));
    
    return { user: newUser };
  },
  
  // Sign in existing user
  signInWithEmailAndPassword: async (email: string, password: string): Promise<{ user: MockUser }> => {
    const users = loadUsers();
    
    // Find user by email
    const user = Object.values(users).find(user => user.email === email);
    if (!user) {
      throw new Error('auth/user-not-found');
    }
    
    // Update last login
    user.lastLogin = {
      timestamp: new Date(),
      device: navigator.platform,
      browser: navigator.userAgent,
      ip: '127.0.0.1',
      location: 'Local Demo',
    };
    
    // Update user in storage
    users[user.uid] = user;
    saveUsers(users);
    
    // Set current user
    currentUser = user;
    
    // Store current user in session
    localStorage.setItem('mock_current_user', JSON.stringify(user));
    
    return { user };
  },
  
  // Sign out
  signOut: async (): Promise<void> => {
    currentUser = null;
    localStorage.removeItem('mock_current_user');
  },
  
  // Update profile
  updateProfile: async (user: MockUser, profile: { displayName?: string; photoURL?: string }): Promise<void> => {
    const users = loadUsers();
    
    if (!users[user.uid]) {
      throw new Error('auth/user-not-found');
    }
    
    // Update profile fields
    if (profile.displayName) {
      users[user.uid].displayName = profile.displayName;
    }
    
    if (profile.photoURL) {
      users[user.uid].photoURL = profile.photoURL;
    }
    
    // Save updated user
    saveUsers(users);
    
    // Update current user if that's the one being modified
    if (currentUser && currentUser.uid === user.uid) {
      currentUser = users[user.uid];
      localStorage.setItem('mock_current_user', JSON.stringify(currentUser));
    }
  },
  
  // Get current user
  getCurrentUser: (): MockUser | null => {
    if (!currentUser) {
      try {
        const storedUser = localStorage.getItem('mock_current_user');
        if (storedUser) {
          currentUser = JSON.parse(storedUser);
        }
      } catch (error) {
        console.error('Error getting current user:', error);
      }
    }
    return currentUser;
  },
  
  // Send email verification
  sendEmailVerification: async (user: MockUser): Promise<void> => {
    const users = loadUsers();
    
    if (!users[user.uid]) {
      throw new Error('auth/user-not-found');
    }
    
    // For demo, just mark as verified immediately
    users[user.uid].emailVerified = true;
    saveUsers(users);
    
    // Update current user if that's the one being modified
    if (currentUser && currentUser.uid === user.uid) {
      currentUser = users[user.uid];
      localStorage.setItem('mock_current_user', JSON.stringify(currentUser));
    }
    
    console.log(`[MOCK] Email verification sent to ${user.email}`);
  },
  
  // Send password reset email
  sendPasswordResetEmail: async (email: string): Promise<void> => {
    const users = loadUsers();
    
    // Check if email exists
    const user = Object.values(users).find(user => user.email === email);
    if (!user) {
      throw new Error('auth/user-not-found');
    }
    
    console.log(`[MOCK] Password reset email sent to ${email}`);
  },
  
  // Update email
  updateEmail: async (user: MockUser, newEmail: string): Promise<void> => {
    const users = loadUsers();
    
    if (!users[user.uid]) {
      throw new Error('auth/user-not-found');
    }
    
    // Check if email already exists
    const existingUser = Object.values(users).find(u => u.email === newEmail && u.uid !== user.uid);
    if (existingUser) {
      throw new Error('auth/email-already-in-use');
    }
    
    // Update email
    users[user.uid].email = newEmail;
    users[user.uid].emailVerified = false;
    saveUsers(users);
    
    // Update current user if that's the one being modified
    if (currentUser && currentUser.uid === user.uid) {
      currentUser = users[user.uid];
      localStorage.setItem('mock_current_user', JSON.stringify(currentUser));
    }
  },
  
  // Update password
  updatePassword: async (user: MockUser, newPassword: string): Promise<void> => {
    const users = loadUsers();
    
    if (!users[user.uid]) {
      throw new Error('auth/user-not-found');
    }
    
    // For demo, we don't need to store the password
    console.log(`[MOCK] Password updated for ${user.email}`);
  },
  
  // Mock auth change listener
  onAuthStateChanged: (callback: (user: MockUser | null) => void) => {
    // Immediately call with current user
    callback(mockAuth.getCurrentUser());
    
    // Set up storage event listener to detect changes from other tabs
    const storageListener = (event: StorageEvent) => {
      if (event.key === 'mock_current_user') {
        if (event.newValue) {
          currentUser = JSON.parse(event.newValue);
        } else {
          currentUser = null;
        }
        callback(currentUser);
      }
    };
    
    window.addEventListener('storage', storageListener);
    
    // Return unsubscribe function
    return () => {
      window.removeEventListener('storage', storageListener);
    };
  },
};

// Helper functions for mock Firebase Firestore
export const mockDb = {
  collection: (collectionName: string) => ({
    doc: (docId: string) => ({
      set: async (data: any) => {
        const storageKey = `mock_${collectionName}_${docId}`;
        localStorage.setItem(storageKey, JSON.stringify(data));
      },
      update: async (data: any) => {
        const storageKey = `mock_${collectionName}_${docId}`;
        const existingData = localStorage.getItem(storageKey);
        const mergedData = {
          ...(existingData ? JSON.parse(existingData) : {}),
          ...data
        };
        localStorage.setItem(storageKey, JSON.stringify(mergedData));
      },
      get: async () => {
        const storageKey = `mock_${collectionName}_${docId}`;
        const data = localStorage.getItem(storageKey);
        return {
          exists: !!data,
          data: () => data ? JSON.parse(data) : null,
        };
      },
    }),
  }),
};

// Mock serverTimestamp
export const mockServerTimestamp = () => new Date();

// Mock array operations
export const mockArrayUnion = (...elements: any[]) => ({
  __type: 'arrayUnion',
  __elements: elements,
});

// Apply the array operations during updates
const processArrayOperations = (obj: any): any => {
  if (!obj) return obj;
  
  const result = { ...obj };
  
  Object.entries(result).forEach(([key, value]) => {
    if (value && typeof value === 'object') {
      if (value && '__type' in value && value.__type === 'arrayUnion' && '__elements' in value && Array.isArray(value.__elements)) {
        // Get the current array or create a new one
        const currentArray = Array.isArray(result[key]) ? result[key] : [];
        // Add new elements that don't already exist
        value.__elements.forEach((element: any) => {
          if (!currentArray.includes(element)) {
            currentArray.push(element);
          }
        });
        result[key] = currentArray;
      } else {
        // Recursively process nested objects
        result[key] = processArrayOperations(value);
      }
    }
  });
  
  return result;
};