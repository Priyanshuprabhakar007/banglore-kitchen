import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, User, Menu, X, MapPin, Phone, Bell } from 'lucide-react';
import { doc, onSnapshot, collection, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../lib/auth';
import { cn } from '../../lib/utils';
import { useCart } from '../../lib/CartContext';
import { AnnouncementBanner } from '../AnnouncementBanner';
import { NotificationToast } from '../NotificationToast';

export function CustomerLayout() {
  const { user, isAdmin, staffData, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const [branding, setBranding] = useState<any>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'branding'), (docSnap) => {
      if (docSnap.exists()) {
        setBranding(docSnap.data());
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // For simplicity, we'll just show a badge if there are any notifications in the last 24 hours
    // In a real app, we'd track per-user read status
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    const q = query(
      collection(db, 'notifications'), 
      where('createdAt', '>=', oneDayAgo.toISOString()),
      limit(10)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnreadNotifications(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Offers', path: '/offers' },
    { name: 'Notifications', path: '/notifications' },
    { name: 'Reserve Table', path: '/reserve' },
  ];

  return (
    <div className="min-h-screen bg-bangalore-ivory flex flex-col font-sans">
      <AnnouncementBanner />
      <NotificationToast />
      {/* Top Bar */}
      <div className="bg-bangalore-text text-white/80 text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={12} /> (201) 300-4080</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> 126 River Dr S, Jersey City, NJ</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-4 h-24 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {branding?.websiteLogo ? (
              <img src={branding.websiteLogo} alt="Logo" className="w-10 h-10 object-contain shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-bangalore-primary flex items-center justify-center shrink-0 shadow-md">
                <span className="font-serif font-bold text-bangalore-accent text-xl">
                  {branding?.restaurantName?.charAt(0) || 'B'}
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl leading-tight text-bangalore-primary">
                {branding?.restaurantName || 'The Bangalore Kitchen'}
              </span>
              <span className="text-[10px] text-bangalore-accent uppercase tracking-widest font-bold">South Indian Bar & Restaurant</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink 
                key={link.name} 
                to={link.path}
                className={({isActive}) => cn(
                  "text-sm font-medium transition-colors hover:text-bangalore-primary",
                  isActive ? "text-bangalore-primary" : "text-gray-600"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/notifications" className="relative p-2 text-gray-600 hover:text-bangalore-primary transition-colors">
              <Bell size={24} />
              {unreadNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {unreadNotifications}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-bangalore-primary transition-colors">
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-bangalore-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <div className="hidden md:flex items-center gap-4">
              {loading ? (
                <div className="w-20 h-8 bg-gray-100 animate-pulse rounded-full"></div>
              ) : user ? (
                <>
                  <Link to="/account" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-bangalore-primary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <User size={20} className="m-1.5 text-gray-400" />
                      )}
                    </div>
                    <span>{user.displayName?.split(' ')[0] || 'Account'}</span>
                  </Link>
                  {isAdmin && (
                    <Link to={staffData?.isSuperAdmin ? "/admin" : "/staff"} className="text-xs bg-gray-800 text-white px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors whitespace-nowrap">
                      {staffData?.isSuperAdmin ? "Admin Panel" : "Staff Panel"}
                    </Link>
                  )}
                </>
              ) : (
                <Link to="/login" className="bg-bangalore-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-bangalore-primary transition-colors shadow-sm">
                  Sign In
                </Link>
              )}
            </div>

            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white z-50 shadow-2xl flex flex-col md:hidden"
            >
              <div className="p-4 flex justify-end border-b border-gray-100">
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-500">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 flex-1 overflow-y-auto">
                <nav className="flex flex-col gap-6">
                  {navLinks.map(link => (
                    <NavLink 
                      key={link.name} 
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({isActive}) => cn(
                        "text-lg font-serif font-medium transition-colors",
                        isActive ? "text-bangalore-primary" : "text-gray-800"
                      )}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                  {isAdmin && (
                    <NavLink 
                      to={staffData?.isSuperAdmin ? "/admin" : "/staff"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-serif font-medium text-bangalore-primary/80 transition-colors"
                    >
                      {staffData?.isSuperAdmin ? "Admin Panel" : "Staff Panel"}
                    </NavLink>
                  )}
                </nav>
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                {loading ? (
                  <div className="w-full h-12 bg-gray-200 animate-pulse rounded-xl"></div>
                ) : user ? (
                  <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 w-full p-3 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <User size={24} className="m-2 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.displayName || 'My Account'}</p>
                      <p className="text-xs text-gray-500">View profile & orders</p>
                    </div>
                  </Link>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center bg-bangalore-primary text-white py-3 rounded-xl font-medium shadow-sm">
                    Sign In / Sign Up
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-bangalore-text text-white/80 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              {branding?.websiteLogo ? (
                <img src={branding.websiteLogo} alt="Logo" className="w-10 h-10 object-contain shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-bangalore-primary flex items-center justify-center shrink-0">
                  <span className="font-serif font-bold text-bangalore-accent text-xl">
                    {branding?.restaurantName?.charAt(0) || 'B'}
                  </span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl leading-tight text-white">
                  {branding?.restaurantName || 'The Bangalore Kitchen'}
                </span>
                <span className="text-[10px] text-bangalore-accent uppercase tracking-widest font-bold">South Indian Bar & Restaurant</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6">A premium dining experience bringing authentic Indian flavours, Dosas, and Biryanis to Jersey City.</p>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/menu" className="hover:text-bangalore-accent transition-colors">Our Menu</Link></li>
              <li><Link to="/reserve" className="hover:text-bangalore-accent transition-colors">Book a Table</Link></li>
              <li><Link to="/offers" className="hover:text-bangalore-accent transition-colors">Special Offers</Link></li>
              <li><Link to="/about" className="hover:text-bangalore-accent transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="hover:text-bangalore-accent transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-bangalore-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refunds" className="hover:text-bangalore-accent transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-bangalore-accent" /> <span>126 River Dr S, Jersey City, NJ 07310</span></li>
              <li className="flex items-center gap-2"><Phone size={16} className="shrink-0 text-bangalore-accent" /> <span>(201) 300-4080</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {branding?.restaurantName || 'The Bangalore Kitchen'}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
