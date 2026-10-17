import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Tags, 
  ShoppingBag, 
  CalendarDays, 
  Store, 
  Users, 
  Bell, 
  Megaphone,
  MapPin,
  Bike,
  Image as ImageIcon, 
  MessageSquare, 
  Gift, 
  CreditCard, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  LifeBuoy, 
  FileText,
  LogOut,
  Menu,
  X,
  Search,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { cn } from '../../lib/utils';
import { Logo } from '../ui/Logo';

const navItems = [
  { name: 'Dashboard', sectionId: 'dashboard', path: '', icon: LayoutDashboard },
  { name: 'Menu Management', sectionId: 'menu', path: 'menu', icon: UtensilsCrossed },
  { name: 'Categories', sectionId: 'categories', path: 'categories', icon: Tags },
  { name: 'Offers & Coupons', sectionId: 'offers', path: 'offers', icon: Gift },
  { name: 'Orders', sectionId: 'orders', path: 'orders', icon: ShoppingBag },
  { name: 'Table Bookings', sectionId: 'bookings', path: 'bookings', icon: CalendarDays },
  { name: 'Branches', sectionId: 'branches', path: 'branches', icon: Store },
  { name: 'Delivery Zones', sectionId: 'zones', path: 'zones', icon: MapPin },
  { name: 'Delivery Personnel', sectionId: 'delivery', path: 'delivery-personnel', icon: Bike },
  { name: 'Customers', sectionId: 'customers', path: 'customers', icon: Users },
  { name: 'App Announcements', sectionId: 'announcements', path: 'announcements', icon: Megaphone },
  { name: 'Notifications', sectionId: 'notifications', path: 'notifications', icon: Bell },
  { name: 'Home Banner', sectionId: 'home-banner', path: 'home-banner', icon: ImageIcon },
  { name: 'Banners & Promos', sectionId: 'banners', path: 'banners', icon: ImageIcon },
  { name: 'Reviews', sectionId: 'reviews', path: 'reviews', icon: MessageSquare },
  { name: 'Loyalty & Rewards', sectionId: 'rewards', path: 'rewards', icon: Gift },
  { name: 'Payments', sectionId: 'payments', path: 'payments', icon: CreditCard },
  { name: 'Reports', sectionId: 'reports', path: 'reports', icon: BarChart3 },
  { name: 'App & Web Branding', sectionId: 'branding', path: 'settings', icon: Settings },
  { name: 'Queue Management', sectionId: 'queue', path: 'queue', icon: Users },
  { name: 'System Settings', sectionId: 'system-settings', path: 'system-settings', icon: Settings },
  { name: 'Staff & Roles', sectionId: 'staff', path: 'staff', icon: ShieldCheck },
  { name: 'Support Tickets', sectionId: 'support', path: 'support', icon: LifeBuoy },
  { name: 'Content', sectionId: 'content', path: 'content', icon: FileText },
];

export function AdminLayout() {
  const { user, staffData, logout } = useAuth();
  
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branding, setBranding] = useState<any>(null);
  
  const location = window.location.pathname;

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'branding'), (docSnap) => {
      if (docSnap.exists()) {
        setBranding(docSnap.data());
      }
    });
    return () => unsubscribe();
  }, []);

  // Filter allowed nav items
  const allowedNavItems = navItems.filter(item => {
    if (staffData?.isSuperAdmin || staffData?.permissions?.allowedSections?.includes('all')) return true;
    return staffData?.permissions?.allowedSections?.includes(item.sectionId);
  });

  // If a staff lands on /staff exactly, redirect to their first allowed screen
  if (location === '/staff' && !staffData?.isSuperAdmin) {
    const firstSection = allowedNavItems.find(i => i.sectionId !== 'dashboard') || allowedNavItems[0];
    if (firstSection && firstSection.path) {
      return <Navigate to={`/staff/${firstSection.path}`} replace />;
    }
  }

  // The first section logic for paths is dynamic based on current base path
  const basePath = location.startsWith('/admin') ? '/admin' : '/staff';

  return (
    <div className="min-h-screen bg-bangalore-ivory flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: sidebarOpen ? 280 : 80,
          x: mobileMenuOpen ? 0 : (window.innerWidth < 1024 ? -280 : 0)
        }}
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-bangalore-primary text-white shadow-2xl transition-all duration-300 ease-in-out",
          !sidebarOpen && "items-center"
        )}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          <div className="flex items-center overflow-hidden whitespace-nowrap">
            {sidebarOpen ? (
              <Logo
                variant="dark-bg"
                logoUrl={branding?.websiteLogo}
                width={165}
                className="h-auto select-none"
              />
            ) : (
              <Logo
                variant="icon-only"
                logoUrl={branding?.websiteLogo}
                width={36}
                className="h-9 w-9 select-none"
              />
            )}
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-white/70 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
          <nav className="space-y-1 px-3">
            {allowedNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path ? `${basePath}/${item.path}` : basePath}
                end={!item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative",
                  isActive 
                    ? "bg-white/10 text-bangalore-accent" 
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
                title={!sidebarOpen ? item.name : undefined}
              >
                <item.icon size={20} className="shrink-0" />
                {sidebarOpen && (
                  <span className="font-medium whitespace-nowrap">{item.name}</span>
                )}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none z-50 whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 shrink-0 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white w-full transition-colors",
              !sidebarOpen && "justify-center"
            )}
            title={!sidebarOpen ? "View Website" : undefined}
          >
            <Store size={20} className="shrink-0" />
            {sidebarOpen && <span className="font-medium whitespace-nowrap">View Website</span>}
          </a>
          
          <button 
            onClick={() => {
              sessionStorage.removeItem('adminAuth');
              window.location.href = '/admin-login';
            }}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-white/5 hover:text-red-300 w-full transition-colors",
              !sidebarOpen && "justify-center"
            )}
            title={!sidebarOpen ? "Logout" : undefined}
          >
            <LogOut size={20} className="shrink-0" />
            {sidebarOpen && <span className="font-medium whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 glass z-30 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileMenuOpen(true);
                } else {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <Menu size={24} />
            </button>
            
            <div className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full w-96 focus-within:ring-2 focus-within:ring-bangalore-primary/20 transition-all">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search orders, customers, or menu items..." 
                className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-bangalore-primary rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
              <img 
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(staffData?.name || user?.displayName || 'Admin')}&background=800000&color=fff`} 
                alt="Profile" 
                className="w-9 h-9 rounded-full object-cover border border-gray-200"
                referrerPolicy="no-referrer"
              />
              <div className="hidden md:block text-sm">
                <p className="font-medium text-gray-900">{staffData?.name || user?.displayName || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{staffData?.roleName || 'Super Admin'}</p>
              </div>
              <ChevronDown size={16} className="text-gray-400 hidden md:block" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-bangalore-accent/5 blur-[120px]"></div>
            <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-bangalore-primary/5 blur-[100px]"></div>
          </div>
          <div className="relative z-10 h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
