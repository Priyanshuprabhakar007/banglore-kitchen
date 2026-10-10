import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './lib/auth';
import { CartProvider } from './lib/CartContext';
import { AdminLayout } from './components/layout/AdminLayout';
import { StaffLayout } from './components/layout/StaffLayout';
import { CustomerLayout } from './components/layout/CustomerLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { MenuManagement } from './pages/MenuManagement';
import { OrdersManagement } from './pages/OrdersManagement';
import { CategoriesManagement } from './pages/CategoriesManagement';
import { OffersManagement } from './pages/OffersManagement';
import { BookingsManagement } from './pages/BookingsManagement';
import { BranchesManagement } from './pages/BranchesManagement';
import { BannersManagement } from './pages/BannersManagement';
import { HomeBannerManagement } from './pages/HomeBannerManagement';
import { AppAnnouncementsManagement } from './pages/AppAnnouncementsManagement';
import { DeliveryZonesManagement } from './pages/DeliveryZonesManagement';
import { DeliveryPersonnelManagement } from './pages/DeliveryPersonnelManagement';
import { CustomersManagement } from './pages/CustomersManagement';
import { NotificationsManagement } from './pages/NotificationsManagement';
import { ReviewsManagement } from './pages/ReviewsManagement';
import { 
  RewardsManagement, 
  PaymentsManagement, 
  ReportsManagement, 
  SupportManagement, 
  ContentManagement 
} from './pages/GenericAdminPages';
import { StaffManagement } from './pages/StaffManagement';
import { QueueManagement } from './pages/QueueManagement';
import { QueueDisplay } from './pages/QueueDisplay';
import { BrandingSettings } from './pages/BrandingSettings';
import { SettingsManagement } from './pages/SettingsManagement';
import { KitchenDisplay } from './pages/KitchenDisplay';
import { RiderApp } from './pages/RiderApp';
import { Home } from './pages/customer/Home';
import { CustomerMenu } from './pages/customer/Menu';
import { Cart } from './pages/customer/Cart';
import { Checkout } from './pages/customer/Checkout';
import { Account } from './pages/customer/Account';
import { Reserve } from './pages/customer/Reserve';
import { Offers } from './pages/customer/Offers';
import { Notifications } from './pages/customer/Notifications';

function ProtectedSuperAdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const hasAdminSession = sessionStorage.getItem('adminAuth') === 'true';

  if (loading && !hasAdminSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bangalore-ivory">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bangalore-primary"></div>
      </div>
    );
  }

  if (hasAdminSession || (user && isAdmin)) {
    return <>{children}</>;
  }

  return <Navigate to="/admin-login" replace />;
}

function ProtectedStaffRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, staffData } = useAuth();
  const [sessionChecked, setSessionChecked] = React.useState(false);

  React.useEffect(() => {
    if (!loading) {
      setSessionChecked(true);
    }
  }, [loading]);

  if (loading || !sessionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bangalore-ivory">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bangalore-primary"></div>
      </div>
    );
  }

  if (!loading && sessionChecked && !user) {
    return <Navigate to="/staff-login" replace />;
  }

  const hasStaffSession = sessionStorage.getItem('staffAuth') === 'true';

  if (!user || !isAdmin || !hasStaffSession) {
    return <Navigate to="/staff-login" replace />;
  }

  if (!staffData) {
    return <Navigate to="/staff-login" replace />;
  }

  // We allow either super admins or regular staff to view Staff Panel (if they have staffAuth)
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
      <Route path="/kitchen" element={<KitchenDisplay />} />
      <Route path="/riders" element={<RiderApp />} />
      <Route path="/queue-display/:branchId" element={<QueueDisplay />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/admin-login" element={<Login />} />
      <Route path="/staff-login" element={<Login />} />
      <Route path="/cook-login" element={<Login />} />
      <Route path="/rider-login" element={<Login />} />
      
      {/* Admin Panel */}
      <Route path="/admin" element={<ProtectedSuperAdminRoute><AdminLayout /></ProtectedSuperAdminRoute>}>
        {adminRoutes}
      </Route>

      {/* Staff Panel */}
      <Route path="/staff" element={<ProtectedStaffRoute><StaffLayout /></ProtectedStaffRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="menu" element={<MenuManagement />} />
        <Route path="orders" element={<OrdersManagement />} />
        <Route path="categories" element={<CategoriesManagement />} />
        <Route path="offers" element={<OffersManagement />} />
        <Route path="bookings" element={<BookingsManagement />} />
        <Route path="customers" element={<CustomersManagement />} />
        <Route path="notifications" element={<NotificationsManagement />} />
        <Route path="reviews" element={<ReviewsManagement />} />
        <Route path="queue" element={<QueueManagement />} />
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
