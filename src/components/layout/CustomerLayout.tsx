import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, User, MapPin, Phone, Bell, ArrowRight, Home, UtensilsCrossed, Tag, CalendarDays } from 'lucide-react';
import { doc, onSnapshot, collection, query, orderBy, limit, where, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../lib/auth';
import { cn } from '../../lib/utils';
import { useCart } from '../../lib/CartContext';
import { AnnouncementBanner } from '../AnnouncementBanner';
import { NotificationToast } from '../NotificationToast';
import { Footer } from './Footer';
import { Logo } from '../ui/Logo';

export function CustomerLayout() {
  const { user, isAdmin, staffData, loading } = useAuth();
  const { totalItems } = useCart();
  const [branding, setBranding] = useState<any>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const location = useLocation();

  // Reduced motion preference
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Scroll listener for sticky floating capsule morph
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen to branding settings
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'branding'), (docSnap) => {
      if (docSnap.exists()) {
        setBranding(docSnap.data());
      }
    });
    return () => unsubscribe();
  }, []);

  // Unread notifications count
  useEffect(() => {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    // Query using Firestore Timestamp for type compatibility with serverTimestamp()
    const q = query(
      collection(db, 'notifications'), 
      where('createdAt', '>=', Timestamp.fromDate(oneDayAgo)),
      limit(10)
    );
    
    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        setUnreadNotifications(snapshot.size);
      },
      (err) => {
        console.warn('Notifications count listener error:', err);
      }
    );
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Offers', path: '/offers' },
    { name: 'Notifications', path: '/notifications' },
    { name: 'Reserve Table', path: '/reserve' },
  ];

  const mobileDockItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Menu', path: '/menu', icon: UtensilsCrossed },
    { name: 'Offers', path: '/offers', icon: Tag },
    { name: 'Reserve', path: '/reserve', icon: CalendarDays },
    { name: 'Notifications', path: '/notifications', icon: Bell },
  ];

  // Determine active route based on React Router location
  const getActiveLinkPath = () => {
    const current = location.pathname;
    if (current === '/') return '/';
    if (current.startsWith('/menu')) return '/menu';
    if (current.startsWith('/offers')) return '/offers';
    if (current.startsWith('/notifications')) return '/notifications';
    if (current.startsWith('/reserve')) return '/reserve';
    return null;
  };

  const activePath = getActiveLinkPath();
  const highlightedPath = hoveredPath !== null ? hoveredPath : activePath;

  return (
    <div className="min-h-screen bg-bangalore-ivory flex flex-col font-sans">
      <AnnouncementBanner />
      <NotificationToast />

      {/* =========================================================================
          DESKTOP: LARGE FLOATING CAPSULE NAVBAR OVERLAY (76px–84px)
          (Positioned floating directly above the hero, glassmorphism, gliding indicator)
          ========================================================================= */}
      <header
        className={cn(
          "hidden lg:block fixed z-50 inset-x-0 mx-auto pointer-events-none transition-all duration-300 px-4 sm:px-6 w-full max-w-[1340px]",
          isScrolled ? "top-3 sm:top-4" : "top-4 sm:top-5"
        )}
      >
        <div
          className={cn(
            "pointer-events-auto w-full rounded-full transition-all duration-300 flex items-center justify-between border",
            isScrolled
              ? "bg-white/92 py-2.5 px-7 border-white/80 shadow-[0_14px_40px_rgba(0,0,0,0.14)]"
              : "bg-white/78 py-3.5 px-8 border-white/45 shadow-[0_10px_32px_rgba(0,0,0,0.10)]"
          )}
          style={{
            backdropFilter: isScrolled ? "blur(24px) saturate(180%)" : "blur(20px) saturate(170%)",
            WebkitBackdropFilter: isScrolled ? "blur(24px) saturate(180%)" : "blur(20px) saturate(170%)",
            boxShadow: isScrolled
              ? "0 14px 40px rgba(0, 0, 0, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.85)"
              : "0 10px 32px rgba(0, 0, 0, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.45)",
          }}
        >
          {/* SECTION 1: LEFT — Branding & Official Bangalore Kitchen Logo */}
          <Link to="/" className="flex items-center group focus:outline-none shrink-0" aria-label="The Bangalore Kitchen Home">
            <Logo
              variant="light-bg"
              logoUrl={branding?.websiteLogo}
              width={180}
              className="transition-transform duration-300 group-hover:scale-[1.02]"
              containerClassName="hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
            />
          </Link>

          {/* SECTION 2: CENTER — Larger Floating Capsule Navigation with Sliding Indicator */}
          <nav
            aria-label="Main Navigation"
            onMouseLeave={() => setHoveredPath(null)}
            className="flex items-center bg-[#F4F1EC]/90 p-1.5 rounded-full border border-stone-200/70 shadow-inner"
          >
            {navLinks.map((link) => {
              const isHighlighted = highlightedPath === link.path;
              const isActive = activePath === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onFocus={() => setHoveredPath(link.path)}
                  onBlur={() => setHoveredPath(null)}
                  className={cn(
                    "relative px-5 sm:px-6 py-2.5 text-xs sm:text-[13px] font-semibold rounded-full transition-colors duration-200 z-10 focus:outline-none select-none tracking-wide",
                    isHighlighted ? "text-white" : "text-[#464642] hover:text-[#111827]"
                  )}
                >
                  {isHighlighted && (
                    <motion.div
                      layoutId="navbar-large-pill"
                      className="absolute inset-0 bg-[#252D28] rounded-full -z-10 shadow-sm"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              type: "spring",
                              stiffness: 350,
                              damping: 30,
                            }
                      }
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* SECTION 3: RIGHT — Premium Interactive Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Notification Bell */}
            <Link
              to="/notifications"
              aria-label="Notifications"
              className="relative w-11 h-11 rounded-full flex items-center justify-center text-[#464642] hover:text-[#252D28] hover:bg-[#F4F1EC] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none"
            >
              <Bell size={21} strokeWidth={1.8} className="transition-colors" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                  {unreadNotifications}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <Link
              to="/cart"
              aria-label="Shopping Cart"
              className="relative w-11 h-11 rounded-full flex items-center justify-center text-[#464642] hover:text-[#252D28] hover:bg-[#F4F1EC] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none"
            >
              <ShoppingBag size={21} strokeWidth={1.8} className="transition-colors" />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#C5A46B] text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm border border-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Account Controls or Dark Capsule Sign In Button */}
            <div className="flex items-center gap-2.5">
              {loading ? (
                <div className="w-24 h-10 bg-stone-200/60 animate-pulse rounded-full" />
              ) : user ? (
                <>
                  <Link
                    to="/account"
                    className="flex items-center gap-2.5 p-1.5 pl-2.5 pr-4 rounded-full hover:bg-[#F4F1EC] transition-all duration-200 hover:-translate-y-0.5 border border-stone-200/60"
                  >
                    <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-300/60 overflow-hidden shrink-0">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || 'User'}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <User size={18} className="m-1.5 text-stone-500" />
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-stone-800">
                      {user.displayName?.split(' ')[0] || 'Account'}
                    </span>
                  </Link>
                  {isAdmin && (
                    <Link
                      to={staffData?.isSuperAdmin ? "/admin" : "/staff"}
                      className="text-xs sm:text-sm bg-[#252D28] text-white px-4 py-2.5 rounded-full hover:bg-[#343D37] transition-all duration-200 hover:-translate-y-0.5 shadow-sm whitespace-nowrap font-medium"
                    >
                      {staffData?.isSuperAdmin ? "Admin Panel" : "Staff Panel"}
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="group flex items-center gap-2 bg-[#252D28] hover:bg-[#343D37] text-white px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-stone-900/15 hover:shadow-lg active:translate-y-0 focus:outline-none"
                >
                  <span>Sign In</span>
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE: APPLE-INSPIRED LIQUID GLASS TOP HEADER
          (Floating translucent glass capsule over hero, logo, cart, and account/sign-in)
          ========================================================================= */}
      <header
        className={cn(
          "lg:hidden fixed z-50 inset-x-0 pointer-events-none transition-all duration-300",
          "top-3 sm:top-4 px-3.5 sm:px-5"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
          }
          className={cn(
            "pointer-events-auto w-full rounded-full transition-all duration-300 flex items-center justify-between",
            "py-2 sm:py-2.5 px-3.5 sm:px-4.5 border",
            isScrolled
              ? "bg-white/88 text-[#252D28] border-white/80 shadow-[0_12px_36px_rgba(0,0,0,0.12)]"
              : "bg-white/[0.14] text-white border-white/[0.30] shadow-[0_10px_34px_rgba(0,0,0,0.18)]"
          )}
          style={{
            backdropFilter: isScrolled
              ? "blur(24px) saturate(180%)"
              : "blur(22px) saturate(180%)",
            WebkitBackdropFilter: isScrolled
              ? "blur(24px) saturate(180%)"
              : "blur(22px) saturate(180%)",
            boxShadow: isScrolled
              ? "0 12px 36px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.75)"
              : "0 10px 34px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.40)",
          }}
        >
          {/* Mobile LEFT: Branding & Official Bangalore Kitchen Logo */}
          <Link to="/" className="flex items-center group focus:outline-none shrink-0 min-w-0" aria-label="The Bangalore Kitchen Home">
            <Logo
              variant="light-bg"
              logoUrl={branding?.websiteLogo}
              width={138}
              className="transition-transform duration-200 active:scale-95"
              containerClassName={cn(
                "py-1 px-2.5 shadow-sm transition-all duration-300",
                isScrolled ? "bg-[#1c221e]/95" : "bg-[#1c221e]/85"
              )}
            />
          </Link>

          {/* Mobile RIGHT: Action Controls (Cart + Account/Sign-In) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Shopping Cart */}
            <Link
              to="/cart"
              aria-label="Shopping Cart"
              className={cn(
                "relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 focus:outline-none",
                isScrolled
                  ? "text-[#252D28] hover:bg-black/5 active:bg-black/10"
                  : "text-white/95 hover:bg-white/15 active:bg-white/20"
              )}
            >
              <ShoppingBag size={19} strokeWidth={1.8} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#C5A46B] text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-sm border border-white/60">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Account / Sign-In Control */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
            ) : user ? (
              <Link
                to="/account"
                aria-label="My Account"
                className={cn(
                  "flex items-center gap-1.5 p-1 rounded-full transition-all duration-200 active:scale-95 focus:outline-none border",
                  isScrolled
                    ? "border-stone-200/90 bg-stone-100/80 text-stone-800"
                    : "border-white/35 bg-white/15 text-white backdrop-blur-sm"
                )}
              >
                <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-stone-200/60">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <User size={15} className="text-current" />
                  )}
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                aria-label="Sign In"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 focus:outline-none shadow-xs",
                  isScrolled
                    ? "bg-[#252D28] text-white hover:bg-[#343D37]"
                    : "bg-white/25 text-white hover:bg-white/35 border border-white/40 backdrop-blur-sm"
                )}
              >
                <User size={13} strokeWidth={2} />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </motion.div>
      </header>

      {/* =========================================================================
          MOBILE: FLOATING LIQUID GLASS BOTTOM NAVIGATION DOCK
          (Apple-inspired translucent capsule, sliding active tab, safe-area inset)
          ========================================================================= */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="lg:hidden fixed z-50 left-1/2 -translate-x-1/2 bottom-[calc(12px+env(safe-area-inset-bottom,0px))] w-[calc(100%-1.75rem)] max-w-[420px] pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
          }
          className={cn(
            "pointer-events-auto w-full rounded-full p-1.5 flex items-center justify-between border transition-all duration-300",
            isScrolled
              ? "bg-white/88 text-[#252D28] border-white/80 shadow-[0_14px_40px_rgba(0,0,0,0.14)]"
              : "bg-[#1A211D]/82 text-white border-white/20 shadow-[0_18px_44px_rgba(0,0,0,0.42)]"
          )}
          style={{
            backdropFilter: isScrolled
              ? "blur(24px) saturate(180%)"
              : "blur(22px) saturate(180%)",
            WebkitBackdropFilter: isScrolled
              ? "blur(24px) saturate(180%)"
              : "blur(22px) saturate(180%)",
            boxShadow: isScrolled
              ? "0 14px 40px rgba(0, 0, 0, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.85)"
              : "0 18px 44px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
          }}
        >
          {mobileDockItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activePath === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                aria-label={item.name}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  "relative flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full text-center transition-colors duration-200 focus:outline-none select-none group min-w-0",
                  isActive
                    ? isScrolled
                      ? "text-white"
                      : "text-[#1A211D]"
                    : isScrolled
                    ? "text-stone-500 hover:text-stone-900"
                    : "text-stone-300/80 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-dock-active-pill"
                    className={cn(
                      "absolute inset-0 rounded-full -z-10 shadow-sm",
                      isScrolled ? "bg-[#252D28]" : "bg-[#C5A46B]"
                    )}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                            mass: 0.8,
                          }
                    }
                  />
                )}

                <motion.div
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.88 }}
                  className="relative flex flex-col items-center justify-center gap-0.5"
                >
                  <div className="relative">
                    <IconComponent
                      size={19}
                      strokeWidth={isActive ? 2.2 : 1.75}
                      className="transition-transform duration-200"
                    />
                    {item.name === 'Notifications' && unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white animate-pulse">
                        {unreadNotifications}
                      </span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] leading-none tracking-tight truncate max-w-full px-0.5",
                      isActive ? "font-bold" : "font-medium"
                    )}
                  >
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </nav>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 flex flex-col pb-24 lg:pb-0",
          location.pathname !== '/' && location.pathname !== '/menu' && "pt-24 sm:pt-28 md:pt-32"
        )}
      >
        <Outlet />
      </main>

      {/* Luxury Editorial Footer */}
      <Footer branding={branding} />
    </div>
  );
}
