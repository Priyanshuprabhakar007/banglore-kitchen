import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './lib/auth';
import { CartProvider } from './lib/CartContext';
import { AdminLayout } from './components/layout/AdminLayout';
import { StaffLayout } from './components/layout/StaffLayout';
import { CustomerLayout } from './components/layout/CustomerLayout';
import { Login } from './pages/Login';
import { Home } from './pages/customer/Home';
import { CustomerMenu } from './pages/customer/Menu';
import { Cart } from './pages/customer/Cart';
import { Checkout } from './pages/customer/Checkout';
import { Account } from './pages/customer/Account';
import { Reserve } from './pages/customer/Reserve';
import { Offers } from './pages/customer/Offers';
import { Notifications } from './pages/customer/Notifications';

// Code-split heavy administrative and standalone routes
const Dashboard = React.lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const MenuManagement = React.lazy(() => import('./pages/MenuManagement').then(m => ({ default: m.MenuManagement })));
const OrdersManagement = React.lazy(() => import('./pages/OrdersManagement').then(m => ({ default: m.OrdersManagement })));
const CategoriesManagement = React.lazy(() => import('./pages/CategoriesManagement').then(m => ({ default: m.CategoriesManagement })));
const OffersManagement = React.lazy(() => import('./pages/OffersManagement').then(m => ({ default: m.OffersManagement })));
const BookingsManagement = React.lazy(() => import('./pages/BookingsManagement').then(m => ({ default: m.BookingsManagement })));
const BranchesManagement = React.lazy(() => import('./pages/BranchesManagement').then(m => ({ default: m.BranchesManagement })));
const BannersManagement = React.lazy(() => import('./pages/BannersManagement').then(m => ({ default: m.BannersManagement })));
const HomeBannerManagement = React.lazy(() => import('./pages/HomeBannerManagement').then(m => ({ default: m.HomeBannerManagement })));
const AppAnnouncementsManagement = React.lazy(() => import('./pages/AppAnnouncementsManagement').then(m => ({ default: m.AppAnnouncementsManagement })));
const DeliveryZonesManagement = React.lazy(() => import('./pages/DeliveryZonesManagement').then(m => ({ default: m.DeliveryZonesManagement })));
const DeliveryPersonnelManagement = React.lazy(() => import('./pages/DeliveryPersonnelManagement').then(m => ({ default: m.DeliveryPersonnelManagement })));
const CustomersManagement = React.lazy(() => import('./pages/CustomersManagement').then(m => ({ default: m.CustomersManagement })));
const NotificationsManagement = React.lazy(() => import('./pages/NotificationsManagement').then(m => ({ default: m.NotificationsManagement })));
const ReviewsManagement = React.lazy(() => import('./pages/ReviewsManagement').then(m => ({ default: m.ReviewsManagement })));
const StaffManagement = React.lazy(() => import('./pages/StaffManagement').then(m => ({ default: m.StaffManagement })));
const QueueManagement = React.lazy(() => import('./pages/QueueManagement').then(m => ({ default: m.QueueManagement })));
const QueueDisplay = React.lazy(() => import('./pages/QueueDisplay').then(m => ({ default: m.QueueDisplay })));
const BrandingSettings = React.lazy(() => import('./pages/BrandingSettings').then(m => ({ default: m.BrandingSettings })));
const SettingsManagement = React.lazy(() => import('./pages/SettingsManagement').then(m => ({ default: m.SettingsManagement })));
const KitchenDisplay = React.lazy(() => import('./pages/KitchenDisplay').then(m => ({ default: m.KitchenDisplay })));
const RiderApp = React.lazy(() => import('./pages/RiderApp').then(m => ({ default: m.RiderApp })));
const ImageAuditGallery = React.lazy(() => import('./pages/ImageAuditGallery').then(m => ({ default: m.ImageAuditGallery })));

const RewardsManagement = React.lazy(() => import('./pages/GenericAdminPages').then(m => ({ default: m.RewardsManagement })));
const PaymentsManagement = React.lazy(() => import('./pages/GenericAdminPages').then(m => ({ default: m.PaymentsManagement })));
const ReportsManagement = React.lazy(() => import('./pages/GenericAdminPages').then(m => ({ default: m.ReportsManagement })));
const SupportManagement = React.lazy(() => import('./pages/GenericAdminPages').then(m => ({ default: m.SupportManagement })));
const ContentManagement = React.lazy(() => import('./pages/GenericAdminPages').then(m => ({ default: m.ContentManagement })));

function RouteSuspenseFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-bangalore-ivory gap-4">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-[#1c221e] flex items-center justify-center shadow-lg border border-stone-800/80">
          <img
            src="/images/branding/bangalore-kitchen-symbol.png"
            alt="The Bangalore Kitchen"
            className="w-8 h-8 object-contain animate-pulse"
          />
        </div>
        <div className="absolute -inset-1.5 rounded-full border-2 border-t-[#C5A46B] border-r-transparent border-b-[#C5A46B]/30 border-l-transparent animate-spin" />
      </div>
      <span className="text-[11px] font-serif font-bold text-stone-700 tracking-[0.2em] uppercase">The Bangalore Kitchen</span>
    </div>
  );
}

function ProtectedSuperAdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bangalore-ivory">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bangalore-primary"></div>
      </div>
    );
  }

  if (user && isAdmin) {
    return <>{children}</>;
  }

  return <Navigate to="/admin-login" replace />;
}

function ProtectedStaffRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, isStaff, staffData } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bangalore-ivory">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bangalore-primary"></div>
      </div>
    );
  }

  if (!user || (!isAdmin && !isStaff) || !staffData) {
    return <Navigate to="/staff-login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const adminRoutes = (
    <>
      <Route index element={<Dashboard />} />
      <Route path="menu" element={<MenuManagement />} />
      <Route path="orders" element={<OrdersManagement />} />
      <Route path="categories" element={<CategoriesManagement />} />
      <Route path="offers" element={<OffersManagement />} />
      <Route path="bookings" element={<BookingsManagement />} />
      <Route path="branches" element={<BranchesManagement />} />
      <Route path="customers" element={<CustomersManagement />} />
      <Route path="zones" element={<DeliveryZonesManagement />} />
      <Route path="delivery-personnel" element={<DeliveryPersonnelManagement />} />
      <Route path="notifications" element={<NotificationsManagement />} />
      <Route path="home-banner" element={<HomeBannerManagement />} />
      <Route path="announcements" element={<AppAnnouncementsManagement />} />
      <Route path="banners" element={<BannersManagement />} />
      <Route path="reviews" element={<ReviewsManagement />} />
      <Route path="rewards" element={<RewardsManagement />} />
      <Route path="payments" element={<PaymentsManagement />} />
      <Route path="reports" element={<ReportsManagement />} />
      <Route path="settings" element={<BrandingSettings />} />
      <Route path="system-settings" element={<SettingsManagement />} />
      <Route path="staff" element={<StaffManagement />} />
      <Route path="support" element={<SupportManagement />} />
      <Route path="content" element={<ContentManagement />} />
      <Route path="queue" element={<QueueManagement />} />
    </>
  );

  return (
    <Routes>
      {/* Customer Facing Website */}
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="menu" element={<CustomerMenu />} />
        <Route path="offers" element={<Offers />} />
        <Route path="reserve" element={<Reserve />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="account" element={<Account />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* Standalone Views */}
      <Route path="/audit-gallery" element={<React.Suspense fallback={<RouteSuspenseFallback />}><ImageAuditGallery /></React.Suspense>} />
      <Route path="/kitchen" element={<React.Suspense fallback={<RouteSuspenseFallback />}><KitchenDisplay /></React.Suspense>} />
      <Route path="/riders" element={<React.Suspense fallback={<RouteSuspenseFallback />}><RiderApp /></React.Suspense>} />
      <Route path="/queue-display/:branchId" element={<React.Suspense fallback={<RouteSuspenseFallback />}><QueueDisplay /></React.Suspense>} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/admin-login" element={<Login />} />
      <Route path="/staff-login" element={<Login />} />
      <Route path="/cook-login" element={<Login />} />
      <Route path="/rider-login" element={<Login />} />
      
      {/* Admin Panel */}
      <Route path="/admin" element={
        <ProtectedSuperAdminRoute>
          <React.Suspense fallback={<RouteSuspenseFallback />}>
            <AdminLayout />
          </React.Suspense>
        </ProtectedSuperAdminRoute>
      }>
        {adminRoutes}
      </Route>

      {/* Staff Panel */}
      <Route path="/staff" element={
        <ProtectedStaffRoute>
          <React.Suspense fallback={<RouteSuspenseFallback />}>
            <StaffLayout />
          </React.Suspense>
        </ProtectedStaffRoute>
      }>
        <Route index element={<React.Suspense fallback={<RouteSuspenseFallback />}><Dashboard /></React.Suspense>} />
        <Route path="menu" element={<React.Suspense fallback={<RouteSuspenseFallback />}><MenuManagement /></React.Suspense>} />
        <Route path="orders" element={<React.Suspense fallback={<RouteSuspenseFallback />}><OrdersManagement /></React.Suspense>} />
        <Route path="categories" element={<React.Suspense fallback={<RouteSuspenseFallback />}><CategoriesManagement /></React.Suspense>} />
        <Route path="offers" element={<React.Suspense fallback={<RouteSuspenseFallback />}><OffersManagement /></React.Suspense>} />
        <Route path="bookings" element={<React.Suspense fallback={<RouteSuspenseFallback />}><BookingsManagement /></React.Suspense>} />
        <Route path="customers" element={<React.Suspense fallback={<RouteSuspenseFallback />}><CustomersManagement /></React.Suspense>} />
        <Route path="notifications" element={<React.Suspense fallback={<RouteSuspenseFallback />}><NotificationsManagement /></React.Suspense>} />
        <Route path="reviews" element={<React.Suspense fallback={<RouteSuspenseFallback />}><ReviewsManagement /></React.Suspense>} />
        <Route path="queue" element={<React.Suspense fallback={<RouteSuspenseFallback />}><QueueManagement /></React.Suspense>} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
