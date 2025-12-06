'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';

import { RouterProvider, useRouter, usePathname, useSearchParams } from '@/lib/router';

import { Toaster } from '@/components/ui/sonner';

import '@/styles/globals.css';

import { useEffect, useState } from 'react';
import { toast } from 'sonner@2.0.3';

// Auth pages
import { LoginScreen } from '@/components/auth/LoginScreen';
import { RegisterScreen } from '@/components/auth/RegisterScreen';
import { ForgotPasswordScreen } from '@/components/auth/ForgotPasswordScreen';

// Main pages
import { HomePage } from '@/components/HomePage';
import { ExplorePage } from '@/components/ExplorePage';
import { CategoriesPage } from '@/components/CategoriesPage';
import { SubcategoryPage } from '@/components/SubcategoryPage';
import { CategoryListingsPage } from '@/components/CategoryListingsPage';
import { DetailPage } from '@/components/DetailPage';

// User pages
import { ProfilePage } from '@/components/ProfilePage';
import { EditProfilePage } from '@/components/EditProfilePage';
import { FavoritesPage } from '@/components/FavoritesPage';
import { NotificationsPage } from '@/components/NotificationsPage';
import { SettingsPage } from '@/components/SettingsPage';

// Advertisement pages
import { AdvertisementsPage } from '@/components/AdvertisementsPage';
import { AddAdvertisementPage } from '@/components/AddAdvertisementPage';
import { AdDetailPage } from '@/components/AdDetailPage';
import { EditAdvertisementPage } from '@/components/EditAdvertisementPage';
import { RequestAdvertisementPage } from '@/components/RequestAdvertisementPage';

// Listing pages
import { AddListingPage } from '@/components/AddListingPage';
import { EditListingPage } from '@/components/EditListingPage';
import { AddBusinessPage } from '@/components/AddBusinessPage';

// Utility pages
import { EmergencyPage } from '@/components/EmergencyPage';
import { HelpPage } from '@/components/HelpPage';
import { ContactUsPage } from '@/components/ContactUsPage';
import { TermsConditionsPage } from '@/components/TermsConditionsPage';
import { AboutPage } from '@/components/AboutPage';
import { PrivacyPolicyPage } from '@/components/PrivacyPolicyPage';

// Admin pages
import { AdminLoginPage } from '@/components/admin/AdminLoginPage';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminShopsPage } from '@/components/admin/AdminShopsPage';
import { AdminAdsPage } from '@/components/admin/AdminAdsPage';
import { AdminUsersPage } from '@/components/admin/AdminUsersPage';
import { AdminAddShopPage } from '@/components/admin/AdminAddShopPage';
import { AdminEditShopPage } from '@/components/admin/AdminEditShopPage';
import { AdminAddAdPage } from '@/components/admin/AdminAddAdPage';
import { AdminEditAdPage } from '@/components/admin/AdminEditAdPage';
import { AdminCategoriesPage } from '@/components/admin/AdminCategoriesPage';
import { AdminNotificationsPage } from '@/components/admin/AdminNotificationsPage';
import { AdminAnalyticsPage } from '@/components/admin/AdminAnalyticsPage';
import {AdminSubcategoriesPage} from '@/components/admin/AdminSubcategoriesPage';

// Layout
import { BottomNav } from '@/components/BottomNav';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/contexts/AdminContext';

// ----------------------------------------------
// ROUTER COMPONENT FIXED (NO HOOK ORDER ERRORS)
// ----------------------------------------------

function Router() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isAuthenticated, isGuest, isAuthLoading } = useAuth();
  const { isAdminLoggedIn } = useAdmin();

  const [navData, setNavData] = useState<any>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    const publicRoutes = ['/login', '/register', '/forgot-password', '/admin-login', '/']; // Home page is public
    const adminRoutes = [
      '/admin', 
      '/admin/shops', 
      '/admin/ads', 
      '/admin/users', 
      '/admin/add-shop',
      '/admin/edit-shop',
      '/admin/add-ad',
      '/admin/edit-ad',
      '/admin/categories', 
      '/admin/notifications', 
      '/admin/analytics',
      '/admin/subcategories'
    ];
    
    // Check admin routes
    if (adminRoutes.includes(pathname) && !isAdminLoggedIn) {
      router.push('/admin-login');
    }
    // Check regular routes - allow home page without auth
    else if (!isAuthenticated && !isGuest && !publicRoutes.includes(pathname) && !adminRoutes.includes(pathname)) {
      router.push('/login');
    }
  }, [isAuthenticated, isGuest, isAdminLoggedIn, pathname, router]);

  // --------------------------------
  // AUTH LOADING SCREEN (SAFE PLACE)
  // --------------------------------
  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  // --------------------------------
  // NAVIGATION HANDLER
  // --------------------------------
  const handleNavigate = (page: string, data?: any) => {
    if (data) {
      setNavData(data);
    }

    if (page === 'subcategory') {
      router.push(`/subcategory?categoryId=${data.categoryId}&categoryName=${encodeURIComponent(data.categoryName)}`);
      return;
    }

    if (page === 'categoryListings') {
      router.push(
        `/category-listings?categoryId=${data.categoryId}&categoryName=${encodeURIComponent(data.categoryName)}&subcategory=${encodeURIComponent(data.subcategory)}`
      );
      return;
    }

    if (page === 'detail') {
      const listing = data.listing || data;
      setNavData({ listing });
      router.push('/detail');
      return;
    }

    if (page === 'ad-detail') {
      const ad = data.ad || data;
      if (ad && ad.id) {
        setNavData({ ad });
        sessionStorage.setItem('currentAd', JSON.stringify(ad));
        router.push('/ad-detail');
      } else {
        toast.error('Unable to open ad details');
      }
      return;
    }

    if (page === 'edit-advertisement') {
      setNavData({ ad: data });
      router.push('/edit-advertisement');
      return;
    }

    if (page === 'edit-listing') {
      setNavData({ listing: data });
      router.push('/edit-listing');
      return;
    }

    if (page.startsWith('admin/')) {
      router.push(`/${page}`);
      return;
    }

    // default
    router.push(`/${page === 'home' ? '' : page}`);
  };

  // --------------------------------
  // SHOW BOTTOM NAV
  // --------------------------------
  const showBottomNav = ['/', '/explore', '/advertisements', '/favorites', '/profile'].includes(pathname);

  const getActivePage = () => {
    if (pathname === '/') return 'home';
    return pathname.replace('/', '');
  };

  // --------------------------------
  // PAGE RENDERER
  // --------------------------------
  const renderPage = () => {
    console.log('Current pathname:', pathname);
    console.log('Nav data:', navData);

    // Auth pages
    if (pathname === '/login') return <LoginScreen onNavigate={handleNavigate} />;
    if (pathname === '/register') return <RegisterScreen onNavigate={handleNavigate} />;
    if (pathname === '/forgot-password') return <ForgotPasswordScreen onNavigate={handleNavigate} />;

    // Main
    if (pathname === '/') return <HomePage onNavigate={handleNavigate} />;
    if (pathname === '/explore') return <ExplorePage onBack={() => router.back()} onNavigate={handleNavigate} />;
    if (pathname === '/categories') return <CategoriesPage onBack={() => router.back()} onNavigate={handleNavigate} />;

    if (pathname === '/subcategory') {
      return (
        <SubcategoryPage
          categoryId={searchParams.get('categoryId') || ''}
          categoryName={searchParams.get('categoryName') || ''}
          onBack={() => router.back()}
          onNavigate={handleNavigate}
        />
      );
    }

    if (pathname === '/category-listings') {
      return (
        <CategoryListingsPage
          categoryId={searchParams.get('categoryId') || ''}
          categoryName={searchParams.get('categoryName') || ''}
          subcategory={searchParams.get('subcategory') || ''}
          onBack={() => router.back()}
          onNavigate={handleNavigate}
        />
      );
    }

    if (pathname === '/detail') {
      if (!navData?.listing) return <div className="p-4">Loading...</div>;
      return <DetailPage listing={navData.listing} onBack={() => router.back()} onNavigate={handleNavigate} />;
    }

    // User pages
    if (pathname === '/profile') return <ProfilePage onBack={() => router.back()} onNavigate={handleNavigate} />;
    if (pathname === '/edit-profile') return <EditProfilePage onBack={() => router.back()} />;
    if (pathname === '/favorites') return <FavoritesPage onBack={() => router.back()} onNavigate={handleNavigate} />;
    if (pathname === '/notifications') return <NotificationsPage onBack={() => router.back()} />;
    if (pathname === '/settings') return <SettingsPage onBack={() => router.back()} onNavigate={handleNavigate} />;

    // Ads
    if (pathname === '/advertisements') return <AdvertisementsPage onBack={() => router.back()} onNavigate={handleNavigate} />;
    if (pathname === '/add-advertisement') {
      return (
        <AddAdvertisementPage
          onBack={() => router.back()}
          onSuccess={() => router.push('/advertisements')}
          onNavigate={handleNavigate}
        />
      );
    }

    if (pathname === '/ad-detail') {
      let ad = navData?.ad;

      if (!ad) {
        try {
          const storedAd = sessionStorage.getItem('currentAd');
          if (storedAd) ad = JSON.parse(storedAd);
        } catch {}
      }

      if (!ad) {
        return (
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="text-center">
              <p className="text-gray-600">Unable to load ad details</p>
              <button
                onClick={() => router.push('/advertisements')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Back to Advertisements
              </button>
            </div>
          </div>
        );
      }

      return <AdDetailPage ad={ad} onBack={() => router.back()} onNavigate={handleNavigate} />;
    }

    if (pathname === '/edit-advertisement') {
      if (!navData?.ad) return <div className="p-4">Loading...</div>;
      return (
        <EditAdvertisementPage
          ad={navData.ad}
          onBack={() => router.back()}
          onSuccess={() => router.push('/advertisements')}
          onNavigate={handleNavigate}
        />
      );
    }

    // Listings
    if (pathname === '/add-listing') {
      return (
        <AddListingPage
          onBack={() => router.back()}
          onSuccess={() => router.push('/advertisements')}
          onNavigate={handleNavigate}
        />
      );
    }

    if (pathname === '/add-business') {
      return <AddBusinessPage onBack={() => router.back()} />;
    }

    if (pathname === '/edit-listing') {
      if (!navData?.listing) return <div className="p-4">Loading...</div>;
      return (
        <EditListingPage
          listing={navData.listing}
          onBack={() => router.back()}
          onSuccess={() => router.push('/advertisements')}
          onNavigate={handleNavigate}
        />
      );
    }

    // Utility
    if (pathname === '/emergency') return <EmergencyPage onBack={() => router.back()} />;
    if (pathname === '/help') return <HelpPage onBack={() => router.back()} onNavigate={handleNavigate} />;
    if (pathname === '/contact-us') return <ContactUsPage onBack={() => router.back()} />;
    if (pathname === '/terms-conditions') return <TermsConditionsPage onBack={() => router.back()} onNavigate={handleNavigate} />;
    if (pathname === '/about') return <AboutPage onBack={() => router.back()} onNavigate={handleNavigate} />;
    if (pathname === '/privacy-policy') return <PrivacyPolicyPage onBack={() => router.back()} onNavigate={handleNavigate} />;

    // Admin
    if (pathname === '/admin-login') return <AdminLoginPage onNavigate={handleNavigate} />;
    if (pathname === '/admin') return <AdminDashboard onBack={() => router.back()} onNavigate={handleNavigate} />;
    if (pathname === '/admin/shops') return <AdminShopsPage onBack={() => router.push('/admin')} onNavigate={handleNavigate} />;
    if (pathname === '/admin/ads') return <AdminAdsPage onBack={() => router.push('/admin')} onNavigate={handleNavigate} />;
    if (pathname === '/admin/users') return <AdminUsersPage onBack={() => router.push('/admin')} />;

    if (pathname === '/admin/subcategories') {
      return <AdminSubcategoriesPage categories={[]} onBack={() => router.push('/admin')} />;
    }
    if (pathname === '/admin/add-shop') {
      return <AdminAddShopPage onBack={() => router.push('/admin/shops')} onNavigate={handleNavigate} />;
    }

    if (pathname === '/admin/edit-shop') {
      if (!navData?.shop) return <div className="p-4">Loading...</div>;
      return <AdminEditShopPage shop={navData.shop} onBack={() => router.push('/admin/shops')} onNavigate={handleNavigate} />;
    }

    if (pathname === '/admin/add-ad') {
      return <AdminAddAdPage onBack={() => router.push('/admin/ads')} onNavigate={handleNavigate} />;
    }

    if (pathname === '/admin/edit-ad') {
      if (!navData?.ad) return <div className="p-4">Loading...</div>;
      return <AdminEditAdPage ad={navData.ad} onBack={() => router.push('/admin/ads')} onNavigate={handleNavigate} />;
    }
    if (pathname === '/admin/categories') {
      return <AdminCategoriesPage onBack={() => router.push('/admin')} />;
    }
    if (pathname === '/admin/subcategories') {
      return <AdminSubcategoriesPage onBack={() => router.push('/admin')} />;
    }
    if (pathname === '/admin/notifications') {
      return <AdminNotificationsPage onBack={() => router.push('/admin')} />;
    }
    if (pathname === '/admin/analytics') {
      return <AdminAnalyticsPage onBack={() => router.push('/admin')} />;
    }
  };

  return (
    <>
      {renderPage()}
      {showBottomNav && (
        <BottomNav
          activePage={getActivePage()}
          onNavigate={(page) => router.push(`/${page === 'home' ? '' : page}`)}
        />
      )}
    </>
  );
}

// ----------------------------------------------
// APP WRAPPER
// ----------------------------------------------

export default function App() {
  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <NotificationProvider>
            <FavoritesProvider>
              <AdminProvider>
                <RouterProvider>
                  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
                    <div className="w-full max-w-[1920px] mx-auto bg-white dark:bg-gray-950 min-h-screen relative">
                      <Router />
                    </div>
                  </div>
                  <Toaster />
                </RouterProvider>
              </AdminProvider>
            </FavoritesProvider>
          </NotificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
