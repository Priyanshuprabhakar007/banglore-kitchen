/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../lib/auth';
import { User, Shield, Lock, Mail, Phone } from 'lucide-react';

import { useNavigate, useLocation } from 'react-router-dom';

export function Login() {
  const shouldReduceMotion = useReducedMotion();
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

  // 3D Tilt response to pointer on desktop (subtle 2.5 degrees)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 140, damping: 22 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], shouldReduceMotion ? ['0deg', '0deg'] : ['2.5deg', '-2.5deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], shouldReduceMotion ? ['0deg', '0deg'] : ['-2.5deg', '2.5deg']);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // API Base URL Configuration: uses relative origin by default (works on both local dev and Vercel)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

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
    <div 
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8 select-none [perspective:1200px]"
    >
      {/* Full-Page Background: Authentic Bangalore Kitchen Dining Room */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.img
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          src="/images/restaurant/login-bg.webp"
          alt="The Bangalore Kitchen Ambiance"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.08] saturate-[1.12]"
        />
        {/* Subtle cinematic gradient: dark perimeter / vignette, bright warm center */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(10,10,12,0.7)_100%)]" />
        <div className="absolute inset-0 bg-amber-950/5 mix-blend-color-burn" />
      </div>

      {/* Moving warm caustic ambient backlighting behind the glass card */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35],
          x: [-8, 8, -8],
          y: [-8, 8, -8],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-6 rounded-full bg-gradient-to-tr from-amber-500/25 via-amber-300/15 to-orange-400/20 blur-3xl pointer-events-none -z-10"
      />

      {/* Floating Liquid Glass Login Card */}
      <motion.div 
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.24) 45%, rgba(255, 255, 255, 0.18) 65%, rgba(255, 255, 255, 0.36) 100%)',
          backdropFilter: 'blur(28px) saturate(190%) contrast(102%)',
          WebkitBackdropFilter: 'blur(28px) saturate(190%) contrast(102%)',
          border: '1px solid rgba(255, 255, 255, 0.55)',
          boxShadow: '0 30px 80px -10px rgba(0, 0, 0, 0.42), 0 12px 30px -5px rgba(0, 0, 0, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.85), inset 0 -1px 2px rgba(255, 255, 255, 0.2), inset 0 0 24px rgba(255, 240, 200, 0.1)',
          borderRadius: '28px',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-[calc(100%-2rem)] max-w-md p-8 sm:p-10 relative z-10 text-center supports-[not(backdrop-filter:blur(1px))]:bg-white/95 overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-white/60 hover:shadow-[0_35px_90px_-10px_rgba(0,0,0,0.45),0_15px_35px_rgba(0,0,0,0.25),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(255,255,255,0.25)]"
      >
        {/* Animated Glass Specular Reflection on Entrance (1000–1500ms) */}
        <motion.div
          initial={{ x: '-150%', opacity: 0 }}
          animate={shouldReduceMotion ? { opacity: 0 } : { x: '250%', opacity: [0, 0.35, 0.7, 0.35, 0] }}
          transition={{ delay: 1.0, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -inset-y-12 w-[60%] -skew-x-25 bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none z-30"
        />

        {showAccessDenied && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50/90 border border-red-200/90 text-red-700 rounded-2xl text-center flex flex-col items-center backdrop-blur-xs shadow-xs"
          >
            <div className="w-11 h-11 bg-red-100/90 rounded-full flex items-center justify-center mb-2.5 shadow-2xs">
              <span className="text-xl">⚠️</span>
            </div>
            <h2 className="font-bold text-sm mb-1 text-red-900">Access Denied</h2>
            <p className="text-xs text-red-700/90">You do not have administrative privileges. Please log in with an admin account.</p>
          </motion.div>
        )}

        {/* Brand Header */}
        <div className="text-center mb-7 relative z-10">
          {/* Polished Circular Glass Medallion */}
          <motion.div 
            initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 h-20 mx-auto rounded-full p-2 mb-5 relative flex items-center justify-center bg-gradient-to-b from-white/40 via-white/15 to-white/20 backdrop-blur-xl border border-white/60 shadow-[0_15px_30px_rgba(0,0,0,0.25),inset_0_1.5px_2px_rgba(255,255,255,0.9),inset_0_-1px_1.5px_rgba(255,255,255,0.2)] ring-1 ring-amber-400/30 group"
          >
            <div className="w-14 h-14 rounded-full bg-white/95 shadow-inner flex items-center justify-center p-2 overflow-hidden ring-1 ring-stone-200/50">
              {branding?.websiteLogo ? (
                <img src={branding.websiteLogo} alt="Logo" className="w-full h-full object-contain" />
              ) : (
                <span className="font-['Bodoni_Moda',serif] font-bold text-amber-700 text-2xl tracking-wider">
                  {branding?.restaurantName?.charAt(0) || 'B'}
                </span>
              )}
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="font-['Bodoni_Moda',serif] text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mb-2 drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]"
          >
            {isSuperAdminMode 
              ? `${branding?.restaurantName || 'The Bangalore Kitchen'} Admin Login`
              : isStaffMode 
              ? `${branding?.restaurantName || 'The Bangalore Kitchen'} Staff Login`
              : isPhoneMode
              ? 'Login with Mobile OTP'
              : branding?.restaurantName || 'The Bangalore Kitchen'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.35 }}
            className="font-['DM_Sans',sans-serif] text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-amber-950/80 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
          >
            {!isStaffMode && !isSuperAdminMode && !isPhoneMode ? 'Premium Dining Experience' : 'Welcome back'}
          </motion.p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3.5 bg-red-50/95 border border-red-200/80 text-red-700 text-xs sm:text-sm rounded-xl text-center shadow-xs backdrop-blur-xs"
          >
            {error}
          </motion.div>
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
              className="space-y-4 relative z-10"
            >
              <div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="Admin Email / Username"
                    className="w-full pl-11 pr-4 py-3 bg-white/45 hover:bg-white/60 focus:bg-white/75 border border-white/60 focus:border-amber-500/70 rounded-xl outline-none transition-all text-stone-900 placeholder:text-stone-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] backdrop-blur-md"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-11 pr-4 py-3 bg-white/45 hover:bg-white/60 focus:bg-white/75 border border-white/60 focus:border-amber-500/70 rounded-xl outline-none transition-all text-stone-900 placeholder:text-stone-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] backdrop-blur-md"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[48px] flex items-center justify-center gap-3 bg-gradient-to-b from-stone-900/90 via-stone-950/88 to-black/92 hover:from-stone-850 hover:to-stone-950 backdrop-blur-md border border-amber-400/25 shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1.5px_rgba(255,255,255,0.25)] text-amber-50 font-medium py-3.5 px-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-amber-300/30 border-t-amber-400 rounded-full animate-spin"></div>
                ) : 'Login as Admin'}
              </button>
              
              <div className="relative py-2">
                 <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/30"></span>
                 </div>
                 <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white/50 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-stone-600 font-medium border border-white/50">Or</span>
                 </div>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full min-h-[48px] flex items-center justify-center gap-3 bg-white/45 hover:bg-white/65 active:bg-white/50 backdrop-blur-md border border-white/70 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_1.5px_rgba(255,255,255,0.9)] text-stone-900 font-medium py-3.5 px-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
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
              className="space-y-4 relative z-10"
            >
              {otpStep === 'phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Mobile Number (e.g. +91...)"
                      className="w-full pl-11 pr-4 py-3 bg-white/45 hover:bg-white/60 focus:bg-white/75 border border-white/60 focus:border-amber-500/70 rounded-xl outline-none transition-all text-stone-900 placeholder:text-stone-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] backdrop-blur-md"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full min-h-[48px] flex items-center justify-center gap-3 bg-gradient-to-b from-stone-900/90 via-stone-950/88 to-black/92 hover:from-stone-850 hover:to-stone-950 backdrop-blur-md border border-amber-400/25 shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1.5px_rgba(255,255,255,0.25)] text-amber-50 font-medium py-3.5 px-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-amber-300/30 border-t-amber-400 rounded-full animate-spin"></div>
                    ) : 'Send OTP'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                   <div className="text-xs sm:text-sm text-stone-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] mb-2 font-['DM_Sans',sans-serif]">
                    Enter the 6-digit code sent to <span className="font-semibold text-stone-950">{phoneNumber}</span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter OTP"
                      className="w-full pl-11 pr-4 py-3 bg-white/45 hover:bg-white/60 focus:bg-white/75 border border-white/60 focus:border-amber-500/70 rounded-xl outline-none transition-all tracking-widest text-center font-bold text-stone-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] backdrop-blur-md"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full min-h-[48px] flex items-center justify-center gap-3 bg-gradient-to-b from-stone-900/90 via-stone-950/88 to-black/92 hover:from-stone-850 hover:to-stone-950 backdrop-blur-md border border-amber-400/25 shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1.5px_rgba(255,255,255,0.25)] text-amber-50 font-medium py-3.5 px-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-amber-300/30 border-t-amber-400 rounded-full animate-spin"></div>
                    ) : 'Verify & Login'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOtpStep('phone')}
                    className="w-full text-xs sm:text-sm font-semibold text-amber-950 hover:underline cursor-pointer"
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
                className="w-full text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-950 hover:underline cursor-pointer"
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
              className="space-y-4 relative z-10"
            >
              {/* Frosted White-Glass Google Button */}
              <motion.button
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.45 }}
                onClick={handleLogin}
                disabled={isLoading || isGuestLoading}
                className="w-full min-h-[48px] flex items-center justify-center gap-3 bg-white/80 hover:bg-white active:bg-white/90 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.1),inset_0_1px_1.5px_rgba(255,255,255,1)] text-stone-900 font-semibold py-3.5 px-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.16),inset_0_1.5px_2px_rgba(255,255,255,1)] disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin"></div>
                ) : (
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                )}
                <span className="font-['DM_Sans',sans-serif] tracking-tight">{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
              </motion.button>

              {/* Premium Dark Smoked-Glass Guest Button */}
              {!isSuperAdminMode && (
                <motion.button
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.45 }}
                  onClick={handleGuestLogin}
                  disabled={isLoading || isGuestLoading}
                  className="w-full min-h-[48px] relative overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-b from-stone-900/90 via-stone-950/88 to-black/92 hover:from-stone-850 hover:to-stone-950 backdrop-blur-md border border-amber-400/25 shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1.5px_rgba(255,255,255,0.25),inset_0_-1px_2px_rgba(0,0,0,0.5)] text-amber-50 font-medium py-3.5 px-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/45 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.35)] disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer"
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
                  {isGuestLoading ? (
                    <div className="w-5 h-5 border-2 border-amber-300/30 border-t-amber-400 rounded-full animate-spin relative z-10"></div>
                  ) : (
                    <User className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                  )}
                  <span className="font-['DM_Sans',sans-serif] tracking-tight relative z-10">{isGuestLoading ? 'Entering as Guest...' : 'Continue as Guest'}</span>
                </motion.button>
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
              className="space-y-4 relative z-10"
            >
              <div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
                  <input
                    type="text"
                    required
                    value={staffEmail}
                    onChange={(e) => setStaffEmail(e.target.value)}
                    placeholder="Email or Mobile Number"
                    className="w-full pl-11 pr-4 py-3 bg-white/45 hover:bg-white/60 focus:bg-white/75 border border-white/60 focus:border-amber-500/70 rounded-xl outline-none transition-all text-stone-900 placeholder:text-stone-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] backdrop-blur-md"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
                  <input
                    type="password"
                    required
                    value={staffPin}
                    onChange={(e) => setStaffPin(e.target.value)}
                    placeholder="Password / PIN"
                    className="w-full pl-11 pr-4 py-3 bg-white/45 hover:bg-white/60 focus:bg-white/75 border border-white/60 focus:border-amber-500/70 rounded-xl outline-none transition-all text-stone-900 placeholder:text-stone-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] backdrop-blur-md"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[48px] flex items-center justify-center gap-3 bg-gradient-to-b from-stone-900/90 via-stone-950/88 to-black/92 hover:from-stone-850 hover:to-stone-950 backdrop-blur-md border border-amber-400/25 shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1.5px_rgba(255,255,255,0.25)] text-amber-50 font-medium py-3.5 px-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-amber-300/30 border-t-amber-400 rounded-full animate-spin"></div>
                ) : (
                  <Shield className="w-5 h-5 text-amber-400" />
                )}
                {isLoading ? 'Authenticating...' : 'Secure Staff Login'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {(!isSuperAdminMode && !window.location.pathname.includes('staff') && !window.location.pathname.includes('cook') && !window.location.pathname.includes('rider')) && (
          <motion.div 
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.45 }}
            className="mt-8 pt-6 border-t border-white/40 flex flex-col gap-3 relative z-10"
          >
            {!isPhoneMode && (
              <button 
                type="button"
                onClick={() => {
                  setIsPhoneMode(true);
                  setError('');
                  setOtpStep('phone');
                }}
                className="min-h-[44px] text-xs sm:text-sm font-semibold font-['DM_Sans',sans-serif] text-stone-900 hover:text-amber-950 flex items-center justify-center gap-2 transition-all cursor-pointer group bg-white/35 hover:bg-white/55 backdrop-blur-xs py-2.5 px-4 rounded-xl border border-white/50 shadow-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              >
                <Phone size={15} className="text-amber-800 group-hover:scale-110 transition-transform" /> 
                <span className="group-hover:underline underline-offset-4">Login with Mobile OTP</span>
              </button>
            )}
            
            <button 
              type="button"
              onClick={() => {
                setIsStaffMode(!isStaffMode);
                setIsPhoneMode(false);
                setError('');
              }}
              className="min-h-[44px] text-xs sm:text-sm font-semibold font-['DM_Sans',sans-serif] text-stone-800 hover:text-stone-950 flex items-center justify-center gap-2 transition-all cursor-pointer group bg-white/20 hover:bg-white/40 backdrop-blur-xs py-2.5 px-4 rounded-xl border border-white/40 shadow-xs focus:outline-none focus:ring-2 focus:ring-stone-500/40"
            >
              {isStaffMode ? (
                <span className="group-hover:underline underline-offset-4">Customer / Admin Login</span>
              ) : (
                <>
                  <Shield size={15} className="text-stone-700 group-hover:scale-110 transition-transform" /> 
                  <span className="group-hover:underline underline-offset-4">Staff Member Login</span>
                </>
              )}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
