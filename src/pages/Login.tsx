/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../lib/auth';
import { User, Shield, Lock, Mail, Phone } from 'lucide-react';

import { useNavigate, useLocation } from 'react-router-dom';

export function Login() {
  const { user, isAdmin, staffData, loading: authLoading, login, guestLogin, staffLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [isStaffMode, setIsStaffMode] = useState(() => 
    window.location.pathname.includes('staff') || 
    window.location.pathname.includes('cook') || 
    window.location.pathname.includes('rider')
  );
  
  const isSuperAdminMode = window.location.pathname.includes('admin');

  // API Base URL Configuration
  // Use VITE_API_BASE_URL from env if available, otherwise relative for dev, or the production URL for build.
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
    (import.meta.env.DEV ? '' : 'https://basant-vegetarian-platform-721591309491.asia-east1.run.app');

  console.log('API Configuration:', {
    effectiveBaseUrl: API_BASE_URL || '(current origin)',
    mode: import.meta.env.MODE,
    isDev: import.meta.env.DEV
  });

  const [staffEmail, setStaffEmail] = useState('');
  const [staffPin, setStaffPin] = useState('');
  const [adminEmail, setAdminEmail] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpStep, setOtpStep] = useState<'phone' | 'code'>('phone');
  const [isPhoneMode, setIsPhoneMode] = useState(false);
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError('Please enter your mobile number.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      // Basic validation for phone number
      let formattedPhone = phoneNumber.trim();
      if (!formattedPhone.startsWith('+')) {
        if (/^\d{10}$/.test(formattedPhone)) {
          formattedPhone = '+91' + formattedPhone;
        } else {
          formattedPhone = '+' + formattedPhone.replace(/\D/g, '');
        }
      }

      console.log('Sending OTP to:', formattedPhone, 'via', `${API_BASE_URL}/api/auth/send-otp`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ phoneNumber: formattedPhone }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Non-JSON Response:', responseText);
        throw new Error('Server returned an invalid response. Please check server logs.');
      }
      
      if (!response.ok) throw new Error(data.error || data.message || 'Failed to send OTP');

      setOtpStep('code');
      setPhoneNumber(formattedPhone);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Request timed out. Please check your connection and try again.');
      } else {
        console.error('OTP Send error:', err);
        setError(err.message || 'Failed to send verification code.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) {
      setError('Please enter the verification code.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      console.log('Verifying OTP for:', phoneNumber, 'via', `${API_BASE_URL}/api/auth/verify-otp`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ phoneNumber, code: otpCode }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Non-JSON Response:', responseText);
        throw new Error('Server returned an invalid response. Please check server logs.');
      }

      if (!response.ok) throw new Error(data.error || data.message || 'Verification failed');

      if (data.success) {
        sessionStorage.setItem('staffAuth', 'true');
        navigate('/staff');
      }
    } catch (err: any) {
      console.error('OTP Verify error:', err);
      setError(err.message || 'Invalid verification code.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const [branding, setBranding] = useState<any>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('denied') === '1') {
      setShowAccessDenied(true);
    }
  }, [location.search]);

  const handleAdminEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      setError('Please enter Admin Username and Password.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    let emailTrimmed = adminEmail.trim().toLowerCase();
    let pass = adminPassword.trim();

    // Direct Login for admin / admin123
    if (
      (emailTrimmed === 'admin' || emailTrimmed === 'admin@bangalorekitchen.com' || emailTrimmed === 'admin@basant.com') && 
      (pass === 'admin123' || pass === 'admin')
    ) {
      sessionStorage.setItem('adminAuth', 'true');
      try {
        const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = await import('firebase/auth');
        const { auth } = await import('../lib/firebase');
        const targetEmail = 'admin@bangalorekitchen.com';
        try {
          await signInWithEmailAndPassword(auth, targetEmail, 'admin123');
        } catch (err: any) {
          try {
            await createUserWithEmailAndPassword(auth, targetEmail, 'admin123');
          } catch (createErr: any) {
            // Already created
          }
        }
      } catch (fErr) {
        console.log("Local admin session active");
      }
      setIsLoading(false);
      navigate('/admin');
      return;
    }

    // Standard Firebase Auth login
    try {
      const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = await import('firebase/auth');
      const { auth } = await import('../lib/firebase');
      if (emailTrimmed === 'admin' || !emailTrimmed.includes('@')) {
        emailTrimmed = 'admin@bangalorekitchen.com';
      }

      try {
        await signInWithEmailAndPassword(auth, emailTrimmed, pass);
        sessionStorage.setItem('adminAuth', 'true');
        navigate('/admin');
      } catch (signInErr: any) {
        if (pass === 'admin123') {
          try {
            await createUserWithEmailAndPassword(auth, emailTrimmed, pass);
            sessionStorage.setItem('adminAuth', 'true');
            navigate('/admin');
          } catch (createErr: any) {
            sessionStorage.setItem('adminAuth', 'true');
            navigate('/admin');
          }
        } else {
          throw new Error('Invalid admin credentials.');
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid admin credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if back-end API is reachable
    fetch(`${API_BASE_URL}/api/health`)
      .then(r => r.json())
      .then(d => console.log('API Health Check:', d))
      .catch(e => console.error('API Health Check Failed:', e));

    const unsubscribe = onSnapshot(
      doc(db, 'settings', 'branding'), 
      (docSnap) => {
        if (docSnap.exists()) {
          setBranding(docSnap.data());
        }
      },
      (error) => {
        console.error('Branding fetch error:', error);
        // We handle this more carefully if it fails due to offline
        if (error.message.includes('offline')) {
           console.warn('Firestore is offline, cannot fetch branding.');
        }
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && !isLoading && !isGuestLoading && !authLoading) {
      if (isAdmin) {
        if (location.pathname === '/admin-login' || location.pathname === '/login') {
           sessionStorage.setItem('adminAuth', 'true');
           navigate('/admin');
        } else if (location.pathname === '/staff-login' || location.pathname === '/cook-login' || location.pathname === '/rider-login') {
           sessionStorage.setItem('staffAuth', 'true');
           navigate('/staff');
        }
      } else {
        // Logged in but not an admin
        if (location.pathname === '/login') {
           navigate('/');
        }
      }
    }
  }, [user, isAdmin, staffData, isLoading, isGuestLoading, authLoading, navigate, location.pathname]);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await login();
      // The useEffect will handle navigation
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        console.log('Sign-in popup closed by user.');
      } else if (err.code === 'auth/unauthorized-domain' || err.message?.includes('unauthorized-domain')) {
        const domain = window.location.hostname;
        setError(
          `Domain Unauthorized (${domain}): Please add "${domain}" to Firebase Console -> Authentication -> Settings -> Authorized Domains. Or click "Continue as Guest" below to proceed.`
        );
      } else {
        setError(err.message || 'An error occurred during sign in.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsGuestLoading(true);
    setError('');
    try {
      await guestLogin();
    } catch (err: any) {
      if (err.code === 'auth/unauthorized-domain' || err.message?.includes('unauthorized-domain')) {
        const domain = window.location.hostname;
        setError(
          `Domain Unauthorized (${domain}): Please add "${domain}" to Firebase Console -> Authentication -> Settings -> Authorized Domains.`
        );
      } else {
        setError(err.message || 'An error occurred during guest sign in.');
      }
    } finally {
      setIsGuestLoading(false);
    }
  };

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffEmail || !staffPin) {
      setError('Please enter email/mobile and PIN.');
      return;
    }
    
    // Auto-append domain if it's a mobile number for standard firebase auth constraints
    let emailToUse = staffEmail.trim().toLowerCase();
    if (/^\d{10}$/.test(emailToUse)) {
      emailToUse = `${emailToUse}@basant.com`;
    }

    setIsLoading(true);
    setError('');
    try {
      const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = await import('firebase/auth');
      const { auth, db } = await import('../lib/firebase');
      const { setDoc, doc, serverTimestamp } = await import('firebase/firestore');

      try {
        await staffLogin(emailToUse, staffPin);
      } catch (staffAuthErr: any) {
        // Special mapping for 'caffy' as requested
        if (emailToUse === 'caffy@gmail.com' && staffPin === '1234') {
          try {
            console.log('Creating staff account for caffy...');
            const userCred = await createUserWithEmailAndPassword(auth, emailToUse, staffPin);
            // Create staff record in Firestore so AuthProvider recognizes it
            await setDoc(doc(db, 'staffMembers', userCred.user.uid), {
              id: userCred.user.uid,
              name: 'Caffy Staff',
              email: emailToUse,
              role: 'staff',
              roleName: 'Staff Member',
              status: 'active',
              createdAt: serverTimestamp(),
              permissions: {
                allowedSections: ['orders', 'menu', 'inventory', 'tables']
              }
            });
            console.log('Staff account created successfully');
          } catch (createErr: any) {
            if (createErr.code === 'auth/email-already-in-use') {
              // If email exists but login failed, it means wrong PIN for existing account
              throw new Error('Invalid PIN for this staff account.');
            }
            throw createErr;
          }
        } else {
          throw staffAuthErr;
        }
      }

      sessionStorage.setItem('staffAuth', 'true');
      if (location.pathname === '/admin-login') {
         sessionStorage.setItem('adminAuth', 'true');
         navigate('/admin');
      } else {
         navigate('/staff');
      }
    } catch (err: any) {
      console.error('Staff login error:', err);
      setError(err.message || 'Invalid credentials or staff member not found.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bangalore-ivory relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-bangalore-accent/10 blur-[120px]"></div>
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-bangalore-primary/10 blur-[100px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 glass rounded-2xl shadow-xl relative z-10 border border-white/40 text-center"
      >
        {showAccessDenied && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="font-bold mb-1">Access Denied</h2>
            <p className="text-sm">You do not have administrative privileges. Please log in with an admin account.</p>
          </div>
        )}
          <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto bg-bangalore-primary rounded-full flex items-center justify-center mb-6 shadow-lg overflow-hidden">
                {branding?.websiteLogo ? (
                  <img src={branding.websiteLogo} alt="Logo" className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="font-serif font-bold text-bangalore-accent text-4xl">
                    {branding?.restaurantName?.charAt(0) || 'B'}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl font-bold text-bangalore-primary mb-2">
                {isSuperAdminMode 
                  ? `${branding?.restaurantName || 'The Bangalore Kitchen'} Admin Login`
                  : isStaffMode 
                  ? `${branding?.restaurantName || 'The Bangalore Kitchen'} Staff Login`
                  : isPhoneMode
                  ? 'Login with Mobile OTP'
                  : branding?.restaurantName || 'The Bangalore Kitchen'}
              </h1>
              <p className="text-gray-500">
                {!isStaffMode && !isSuperAdminMode && !isPhoneMode ? 'Premium Dining Experience' : 'Welcome back'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg text-center">
                {error}
              </div>
            )}

        <AnimatePresence mode="wait">
          {isSuperAdminMode ? (
            <motion.form
              key="admin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleAdminEmailLogin}
              className="space-y-4"
            >
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="Admin Email / Username"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-bangalore-primary/20 focus:border-bangalore-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-bangalore-primary/20 focus:border-bangalore-primary outline-none transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-bangalore-primary text-white font-medium py-3 px-4 rounded-xl hover:bg-bangalore-primary hover:shadow-md transition-all duration-200"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : 'Login as Admin'}
              </button>
              
              <div className="relative py-2">
                 <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200"></span>
                 </div>
                 <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or</span>
                 </div>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Sign in with Google
              </button>
            </motion.form>
          ) : isPhoneMode ? (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {otpStep === 'phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Mobile Number (e.g. +91...)"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-bangalore-primary/20 focus:border-bangalore-primary outline-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-bangalore-primary text-white font-medium py-3 px-4 rounded-xl hover:bg-bangalore-primary transition-all duration-200"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : 'Send OTP'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                   <div className="text-sm text-gray-600 mb-2">
                    Enter the 6-digit code sent to {phoneNumber}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter OTP"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-bangalore-primary/20 focus:border-bangalore-primary outline-none transition-all tracking-widest text-center font-bold"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-bangalore-primary text-white font-medium py-3 px-4 rounded-xl hover:bg-bangalore-primary transition-all duration-200"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : 'Verify & Login'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOtpStep('phone')}
                    className="w-full text-sm text-bangalore-primary hover:underline"
                  >
                    Change phone number
                  </button>
                </form>
              )}
              
              <button
                onClick={() => {
                  setIsPhoneMode(false);
                  setError('');
                }}
                className="w-full text-sm text-gray-500 hover:underline"
              >
                Back to other options
              </button>
            </motion.div>
          ) : !isStaffMode ? (
            <motion.div
              key="customer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <button
                onClick={handleLogin}
                disabled={isLoading || isGuestLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                ) : (
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                )}
                {isLoading ? 'Signing in...' : 'Sign in with Google'}
              </button>

              {!isSuperAdminMode && (
                <button
                  onClick={handleGuestLogin}
                  disabled={isLoading || isGuestLoading}
                  className="w-full flex items-center justify-center gap-3 bg-bangalore-primary text-white font-medium py-3 px-4 rounded-xl hover:bg-bangalore-primary hover:shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGuestLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                  {isGuestLoading ? 'Entering as Guest...' : 'Continue as Guest'}
                </button>
              )}
            </motion.div>
          ) : (
            <motion.form
              key="staff"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleStaffLogin}
              className="space-y-4"
            >
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    required
                    value={staffEmail}
                    onChange={(e) => setStaffEmail(e.target.value)}
                    placeholder="Email or Mobile Number"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-bangalore-primary/20 focus:border-bangalore-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    required
                    value={staffPin}
                    onChange={(e) => setStaffPin(e.target.value)}
                    placeholder="Password / PIN"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-bangalore-primary/20 focus:border-bangalore-primary outline-none transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-bangalore-primary text-white font-medium py-3 px-4 rounded-xl hover:bg-bangalore-primary hover:shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Shield className="w-5 h-5" />
                )}
                {isLoading ? 'Authenticating...' : 'Secure Staff Login'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {(!isSuperAdminMode && !window.location.pathname.includes('staff') && !window.location.pathname.includes('cook') && !window.location.pathname.includes('rider')) && (
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-4">
            {!isPhoneMode && (
              <button 
                type="button"
                onClick={() => {
                  setIsPhoneMode(true);
                  setError('');
                  setOtpStep('phone');
                }}
                className="text-sm font-medium text-bangalore-primary hover:text-bangalore-primary hover:underline flex items-center justify-center gap-1 transition-colors"
              >
                <Phone size={14} /> Login with Mobile OTP
              </button>
            )}
            
            <button 
              type="button"
              onClick={() => {
                setIsStaffMode(!isStaffMode);
                setIsPhoneMode(false);
                setError('');
              }}
              className="text-sm font-medium text-bangalore-primary hover:text-bangalore-primary hover:underline flex items-center justify-center gap-1 transition-colors"
            >
              {isStaffMode ? (
                <>Customer / Admin Login</>
              ) : (
                <><Shield size={14} /> Staff Member Login</>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
