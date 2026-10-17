import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, signInAnonymously, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, getDocFromServer } from 'firebase/firestore';
import { auth, db } from './firebase';

// Helper to get document with fallback for offline state
async function getDocWithRetry(ref: any) {
  try {
    // First try normal getDoc (cache + network)
    return await getDoc(ref);
  } catch (err: any) {
    if (err.message?.includes('the client is offline')) {
      console.warn('Firestore is offline, forcing server check for:', ref.path);
      // Force a server check which might wake up the connection
      return await getDocFromServer(ref);
    }
    throw err;
  }
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isStaff: boolean;
  staffData: any | null;
  loading: boolean;
  login: () => Promise<void>;
  guestLogin: () => Promise<void>;
  staffLogin: (email: string, pin: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [staffData, setStaffData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      try {
        if (currentUser) {
          const userEmail = currentUser.email?.trim().toLowerCase() || '';
          const superAdminEnv = (import.meta as any).env?.VITE_SUPER_ADMIN_EMAIL?.trim().toLowerCase();
          
          // Super Admin authorized emails
          const authorizedAdminEmails = [
            superAdminEnv,
            'admin@bangalorekitchen.com',
            'dilseinvite@gmail.com'
          ].filter(Boolean);
          
          if (userEmail && authorizedAdminEmails.includes(userEmail)) {
            const userRef = doc(db, 'users', currentUser.uid);
            const userSnap = await getDocWithRetry(userRef);
            
            if (!userSnap.exists() || (userSnap.data() as any).role !== 'super_admin') {
              await setDoc(userRef, {
                uid: currentUser.uid,
                email: currentUser.email || null,
                displayName: currentUser.displayName || 'Super Admin',
                role: 'super_admin',
                isAnonymous: currentUser.isAnonymous,
                createdAt: serverTimestamp()
              }, { merge: true });
            }
            
            setIsAdmin(true);
            setIsStaff(false);
            setStaffData({ roleName: 'Super Admin', permissions: { allowedSections: ['all'] }, isSuperAdmin: true });
            setUser(currentUser);
            setLoading(false);
            return;
          }

          // First check if they are a staff member
          const staffRef = doc(db, 'staffMembers', currentUser.uid);
          const staffSnap = await getDocWithRetry(staffRef);

          if (staffSnap.exists()) {
            const sData = { id: staffSnap.id, ...(staffSnap.data() as object) } as any;
            if (sData.status !== 'active') {
               await signOut(auth);
               setUser(null);
               setIsAdmin(false);
               setIsStaff(false);
               setStaffData(null);
               setLoading(false);
               return;
            }
            setStaffData(sData);
            setIsStaff(true);
            setIsAdmin(true); // Staff accesses the admin panel
            setUser(currentUser);
          } else {
            // Normal user / Super Admin check
            const userRef = doc(db, 'users', currentUser.uid);
            const userSnap = await getDocWithRetry(userRef);
            
            let role = 'customer';
            if (userSnap.exists()) {
              role = (userSnap.data() as any).role;
            }
            
            if (!userSnap.exists()) {
              await setDoc(userRef, {
                uid: currentUser.uid,
                email: currentUser.email || null,
                displayName: currentUser.displayName || 'Guest User',
                role: role,
                isAnonymous: currentUser.isAnonymous,
                createdAt: serverTimestamp()
              });
            }
            
            setIsAdmin(['super_admin', 'manager', 'branch_admin'].includes(role));
            setIsStaff(false);
            setStaffData(role === 'super_admin' ? { roleName: 'Super Admin', permissions: { allowedSections: ['all'] }, isSuperAdmin: true } : null);
            setUser(currentUser);
          }
        } else {
          setUser(null);
          setIsAdmin(false);
          setIsStaff(false);
          setStaffData(null);
        }
      } catch (err) {
        console.error('Auth check error:', err);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      if (err.code === 'auth/unauthorized-domain' || err.message?.includes('unauthorized-domain')) {
        const domain = window.location.hostname;
        throw new Error(`Domain Unauthorized: "${domain}" is not authorized in Firebase. Please add "${domain}" in Firebase Console > Authentication > Settings > Authorized Domains.`);
      }
      throw err;
    }
  };

  const guestLogin = async () => {
    try {
      await signInAnonymously(auth);
    } catch (err: any) {
      if (err.code === 'auth/unauthorized-domain' || err.message?.includes('unauthorized-domain')) {
        console.warn('Firebase anonymous auth blocked by domain authorization, creating local guest session fallback.');
        const mockGuestUser = {
          uid: `guest_${Date.now()}`,
          displayName: 'Guest User',
          isAnonymous: true,
          email: null
        } as User;
        setUser(mockGuestUser);
        sessionStorage.setItem('guestAuth', 'true');
      } else {
        throw err;
      }
    }
  };

  const staffLogin = async (email: string, pin: string) => {
    await signInWithEmailAndPassword(auth, email, pin);
  };

  const logout = async () => {
    sessionStorage.removeItem('guestAuth');
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('staffAuth');
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isStaff, staffData, loading, login, guestLogin, staffLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
