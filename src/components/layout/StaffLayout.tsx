import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, LogOut, ChevronDown, Bell,
  LayoutDashboard, Menu as MenuIcon, ShoppingBag, 
  MapPin, Users, Settings, Tag, MessageSquare, 
  Gift, CreditCard, BarChart3, ShieldCheck, LifeBuoy, FileText,
  Calendar, Building2, Ticket
} from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { cn } from '../../lib/utils';

// Using same exact IDs to match permissions
const navItems = [
  { name: 'Dashboard', sectionId: 'dashboard', path: '', icon: LayoutDashboard },
  { name: 'Menu Management', sectionId: 'menu', path: 'menu', icon: MenuIcon },
  { name: 'Categories', sectionId: 'categories', path: 'categories', icon: Tag },
  { name: 'Offers & Coupons', sectionId: 'offers', path: 'offers', icon: Ticket },
  { name: 'Orders', sectionId: 'orders', path: 'orders', icon: ShoppingBag },
  { name: 'Table Bookings', sectionId: 'bookings', path: 'bookings', icon: Calendar },
  { name: 'Branches', sectionId: 'branches', path: 'branches', icon: Building2 },
  { name: 'Delivery Zones', sectionId: 'zones', path: 'zones', icon: MapPin },
  { name: 'Delivery Personnel', sectionId: 'riders', path: 'riders', icon: Users },
  { name: 'Customers', sectionId: 'customers', path: 'customers', icon: Users },
  { name: 'App Announcements', sectionId: 'announcements', path: 'announcements', icon: Bell },
  { name: 'Notifications', sectionId: 'notifications', path: 'notifications', icon: MessageSquare },
  { name: 'Banners & Promos', sectionId: 'banners', path: 'banners', icon: Gift },
  { name: 'Reviews', sectionId: 'reviews', path: 'reviews', icon: MessageSquare },
  { name: 'Loyalty & Rewards', sectionId: 'rewards', path: 'rewards', icon: Gift },
  { name: 'Payments', sectionId: 'payments', path: 'payments', icon: CreditCard },
  { name: 'Reports', sectionId: 'reports', path: 'reports', icon: BarChart3 },
  { name: 'App & Web Branding', sectionId: 'branding', path: 'settings', icon: Settings },
  { name: 'Queue Management', sectionId: 'queue', path: 'queue', icon: Users },
  { name: 'Staff & Roles', sectionId: 'staff', path: 'staff', icon: ShieldCheck },
  { name: 'Support Tickets', sectionId: 'support', path: 'support', icon: LifeBuoy },
  { name: 'Content', sectionId: 'content', path: 'content', icon: FileText },
];

export function StaffLayout() {
  const navigate = useNavigate();
  const { user, staffData } = useAuth();

  if (!user) {
    return <Navigate to="/staff-login" replace />;
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branding, setBranding] = useState<any>(null);
  
  const location = useLocation().pathname;

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'branding'), (docSnap) => {
      if (docSnap.exists()) {
        setBranding(docSnap.data());
      }
    });
    return () => unsubscribe();
  }, []);

  // Filter allowed nav items exactly as AdminLayout does
  const allowedNavItems = navItems.filter(item => {
    if (staffData?.isSuperAdmin || staffData?.permissions?.allowedSections?.includes('all')) return true;
    return staffData?.permissions?.allowedSections?.includes(item.sectionId);
  });

  if (!staffData || allowedNavItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 text-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🔒</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">No Sections Assigned</h1>
          <p className="text-gray-600 mb-6">Your account has not been assigned any sections yet. Please contact your administrator to set up your role permissions.</p>
          <button 
            onClick={() => {
               sessionStorage.removeItem('staffAuth');
               window.location.href = '/staff-login';
            }}
            className="w-full bg-bangalore-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-bangalore-primary transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const exactLocationMatch = location === '/staff' || location === '/staff/';
  const currentPathStr = exactLocationMatch ? '' : location.replace('/staff/', '');

  let isAllowed = false;
  
  const hasAccess = (sectionId: string) => {
    if (staffData?.isSuperAdmin || staffData?.permissions?.allowedSections?.includes('all')) return true;
    return staffData?.permissions?.allowedSections?.includes(sectionId);
  };
  
  if (exactLocationMatch) {
    isAllowed = hasAccess('dashboard');
  } else {
    const matchedNavItem = navItems.find(item => item.path === currentPathStr || (item.path && currentPathStr.startsWith(item.path)));
    if (matchedNavItem) {
      isAllowed = hasAccess(matchedNavItem.sectionId);
    } else {
      // If path is completely unknown, we'll deny to be safe unless it's a sub-page of an allowed module
      // But usually, all main modules are covered by navItems.
      isAllowed = false;
    }
  }

  // If a staff lands on /staff exactly without dashboard permission, redirect
  if (exactLocationMatch && !isAllowed && allowedNavItems.length > 0) {
    const firstSection = allowedNavItems.find(i => i.sectionId !== 'dashboard') || allowedNavItems[0];
    if (firstSection && firstSection.path) {
      return <Navigate to={`/staff/${firstSection.path}`} replace />;
    }
  }

  // If not allowed to view current section, show Access Denied
  if (!isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 text-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">You do not have permission to view this section.</p>
          <button 
            onClick={() => {
               const firstSection = allowedNavItems[0];
               if (firstSection) {
                 window.location.href = `/staff/${firstSection.path}`;
               } else {
                 sessionStorage.removeItem('staffAuth');
                 window.location.href = '/staff-login';
               }
            }}
            className="w-full bg-bangalore-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-bangalore-primary transition-colors"
          >
            Go to My Assigned Section
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Mobile Header for Staff */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
            {branding?.websiteLogo ? (
              <img src={branding.websiteLogo} alt="Logo" className="w-8 h-8 object-contain shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-bangalore-primary flex items-center justify-center shrink-0">
                <span className="font-serif font-bold text-white text-sm">
                  {branding?.restaurantName?.charAt(0) || 'B'}
                </span>
              </div>
            )}
           <span className="font-semibold text-gray-900">Staff Portal</span>
        </div>
        <button onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Staff Sidebar - Clean and simple */}
      <motion.aside
        initial={false}
        animate={{ 
          x: mobileMenuOpen ? 0 : (window.innerWidth < 768 ? -280 : 0)
        }}
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:translate-x-0"
        )}
      >
        <div className="p-6 pb-2 border-b border-gray-100 flex flex-col items-center">
            {/* Staff profile summary */}
             <img 
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(staffData?.name || user?.displayName || 'Staff')}&background=800000&color=fff`} 
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover border border-gray-200 mb-3 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <h2 className="font-bold text-gray-900 text-lg">{staffData?.name || user?.displayName || 'Staff Person'}</h2>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mt-1">
                 {(!staffData?.isSuperAdmin && staffData?.roleName) ? staffData.roleName : 'Staff Member'}
              </span>
        </div>

        <div className="p-4 border-b border-gray-100 md:hidden flex justify-end">
            <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-800 p-2">
                <X size={20} />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Allowed Tasks</p>
          <nav className="space-y-1">
            {allowedNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path ? `/staff/${item.path}` : '/staff'}
                end={!item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group",
                  isActive 
                    ? "bg-bangalore-accent/10 text-bangalore-primary font-medium" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon size={20} className={cn("shrink-0", location.endsWith(item.path || '') && location.includes('/staff') ? "text-bangalore-primary" : "text-gray-400 group-hover:text-gray-600")} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 shrink-0">
          <button 
            onClick={() => {
              sessionStorage.removeItem('staffAuth');
              window.location.href = '/staff-login';
            }}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors font-medium"
          >
            <LogOut size={20} className="shrink-0" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-gray-50">
         <header className="hidden md:flex h-16 bg-white border-b border-gray-200 items-center justify-between px-8 shrink-0">
             <h1 className="text-xl font-bold text-gray-800">
               {allowedNavItems.find(i => location.endsWith(i.path) || (location === '/staff' && !i.path))?.name || 'Portal'}
             </h1>
             <div className="flex items-center gap-4 text-gray-500">
                 <Bell size={20} />
             </div>
         </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
           <Outlet />
        </main>
      </div>
    </div>
  );
}
