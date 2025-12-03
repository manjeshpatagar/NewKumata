'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { RouterProvider, useRouter, usePathname, useSearchParams } from '@/lib/router';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import '@/styles/globals.css';
import { useEffect } from 'react';

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

// Layout
import { BottomNav } from '@/components/BottomNav';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/contexts/AdminContext';
import { useState } from 'react';


// Import mock data
import { mockAdvertisements } from '@/lib/advertisementData';

function Router() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isAuthenticated, isGuest } = useAuth();
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
      '/admin/analytics'
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

  // Navigation helper
  const handleNavigate = (page: string, data?: any) => {
    if (data) {
      setNavData(data);
    }
    
    // Handle special cases
    if (page === 'subcategory' && data) {
      router.push(`/subcategory?categoryId=${data.categoryId}&categoryName=${encodeURIComponent(data.categoryName)}`);
    } else if (page === 'categoryListings' && data) {
      router.push(`/category-listings?categoryId=${data.categoryId}&categoryName=${encodeURIComponent(data.categoryName)}&subcategory=${encodeURIComponent(data.subcategory)}`);
    } else if (page === 'detail' && data) {
      // Extract listing from data
      const listing = data.listing || data;
      // Store in navData for now (we can improve this later)
      setNavData({ listing });
      router.push('/detail');
    } else if (page === 'ad-detail' && data) {
      // Extract ad object from data
      const ad = data.ad || data;
      
      if (ad && ad.id) {
        // Store in both state and sessionStorage for persistence
        setNavData({ ad });
        try {
          sessionStorage.setItem('currentAd', JSON.stringify(ad));
        } catch (e) {
          console.error('Failed to store ad in sessionStorage:', e);
        }
        router.push('/ad-detail');
      } else {
        console.error('❌ No ad ID found in data:', data);
        toast.error('Unable to open ad details');
      }
      return;
    } else if (page === 'edit-advertisement' && data) {
      setNavData({ ad: data });
      router.push('/edit-advertisement');
    } else if (page === 'edit-listing' && data) {
      setNavData({ listing: data });
      router.push('/edit-listing');
    } else if (page === 'admin/edit-shop' && data) {
      setNavData({ shop: data.shop });
      router.push('/admin/edit-shop');
    } else if (page === 'admin/edit-ad' && data) {
      setNavData({ ad: data.ad });
      router.push('/admin/edit-ad');
    } else {
      router.push(`/${page === 'home' ? '' : page}`);
    }
  };

  // Show bottom nav on main pages
  const showBottomNav = ['/', '/explore', '/advertisements', '/favorites', '/profile'].includes(pathname);
  const getActivePage = () => {
    if (pathname === '/') return 'home';
    if (pathname === '/explore') return 'explore';
    if (pathname === '/advertisements') return 'advertisements';
    if (pathname === '/favorites') return 'favorites';
    if (pathname === '/profile') return 'profile';
    return '';
  };

  // Render page based on pathname
  const renderPage = () => {
    // Debug logging
    console.log('Current pathname:', pathname);
    console.log('Nav data:', navData);
    
    // Auth pages
    if (pathname === '/login') {
      return <LoginScreen onNavigate={handleNavigate} />;
    }
    if (pathname === '/register') {
      return <RegisterScreen onNavigate={handleNavigate} />;
    }
    if (pathname === '/forgot-password') {
      return <ForgotPasswordScreen onNavigate={handleNavigate} />;
    }

    // Main pages
    if (pathname === '/') {
      return <HomePage onNavigate={handleNavigate} />;
    }
    if (pathname === '/explore') {
      return <ExplorePage onBack={() => router.back()} onNavigate={handleNavigate} />;
    }
    if (pathname === '/categories') {
      return <CategoriesPage onBack={() => router.back()} onNavigate={handleNavigate} />;
    }
    if (pathname === '/subcategory') {
      const categoryId = searchParams.get('categoryId') || '';
      const categoryName = searchParams.get('categoryName') || '';
      return (
        <SubcategoryPage
          categoryId={categoryId}
          categoryName={categoryName}
          onBack={() => router.back()}
          onNavigate={handleNavigate}
        />
      );
    }
    if (pathname === '/category-listings') {
      const categoryId = searchParams.get('categoryId') || '';
      const categoryName = searchParams.get('categoryName') || '';
      const subcategory = searchParams.get('subcategory') || '';
      return (
        <CategoryListingsPage
          categoryId={categoryId}
          categoryName={categoryName}
          subcategory={subcategory}
          onBack={() => router.back()}
          onNavigate={handleNavigate}
        />
      );
    }
    if (pathname === '/detail') {
      if (!navData?.listing) {
        return <div className="p-4">Loading...</div>;
      }
      return <DetailPage listing={navData.listing} onBack={() => router.back()} onNavigate={handleNavigate} />;
    }

    // User pages
    if (pathname === '/profile') {
      return <ProfilePage onBack={() => router.back()} onNavigate={handleNavigate} />;
    }
    if (pathname === '/edit-profile') {
      return <EditProfilePage onBack={() => router.back()} />;
    }
    if (pathname === '/favorites') {
      return <FavoritesPage onBack={() => router.back()} onNavigate={handleNavigate} />;
    }
    if (pathname === '/notifications') {
      return <NotificationsPage onBack={() => router.back()} />;
    }
    if (pathname === '/settings') {
      return <SettingsPage onBack={() => router.back()} onNavigate={handleNavigate} />;
    }

    // Advertisement pages
    if (pathname === '/advertisements') {
      return <AdvertisementsPage onBack={() => router.back()} onNavigate={handleNavigate} />;
    }
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
      // Try to get ad data from navData first, then sessionStorage
      let ad = navData?.ad;
      
      if (!ad) {
        try {
          const storedAd = sessionStorage.getItem('currentAd');
          if (storedAd) {
            ad = JSON.parse(storedAd);
            console.log('Retrieved ad from sessionStorage:', ad);
          }
        } catch (e) {
          console.error('Failed to retrieve ad from sessionStorage:', e);
        }
      }
      
      if (!ad) {
        console.error('Ad Detail: No ad data available');
        return (
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Unable to load ad details</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">Please try again</p>
              <button
                onClick={() => router.push('/advertisements')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
      if (!navData?.ad) {
        return <div className="p-4">Loading...</div>;
      }
      return (
        <EditAdvertisementPage
          ad={navData.ad}
          onBack={() => router.back()}
          onSuccess={() => router.push('/advertisements')}
          onNavigate={handleNavigate}
        />
      );
    }
    if (pathname === '/request-advertisement') {
      return (
        <RequestAdvertisementPage
          onBack={() => router.back()}
          onSuccess={() => router.push('/advertisements')}
        />
      );
    }

    // Listing pages
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
      return (
        <AddBusinessPage
          onBack={() => router.back()}
        />
      );
    }
    if (pathname === '/edit-listing') {
      if (!navData?.listing) {
        return <div className="p-4">Loading...</div>;
      }
      return (
        <EditListingPage
          listing={navData.listing}
          onBack={() => router.back()}
          onSuccess={() => router.push('/advertisements')}
          onNavigate={handleNavigate}
        />
      );
    }

    // Utility pages
    if (pathname === '/emergency') {
      return <EmergencyPage onBack={() => router.back()} />;
    }
    if (pathname === '/help') {
      return <HelpPage onBack={() => router.back()} onNavigate={handleNavigate} />;
    }
    if (pathname === '/contact-us') {
      return <ContactUsPage onBack={() => router.back()} />;
    }
    if (pathname === '/terms-conditions') {
      return <TermsConditionsPage onBack={() => router.back()} onNavigate={handleNavigate} />;
    }
    if (pathname === '/about') {
      return <AboutPage onBack={() => router.back()} onNavigate={handleNavigate} />;
    }
    if (pathname === '/privacy-policy') {
      return <PrivacyPolicyPage onBack={() => router.back()} onNavigate={handleNavigate} />;
    }

    // Admin pages
    if (pathname === '/admin-login') {
      return <AdminLoginPage onNavigate={handleNavigate} />;
    }
    if (pathname === '/admin') {
      return <AdminDashboard onBack={() => router.back()} onNavigate={handleNavigate} />;
    }
    if (pathname === '/admin/shops') {
      return <AdminShopsPage onBack={() => router.push('/admin')} onNavigate={handleNavigate} />;
    }
    if (pathname === '/admin/ads') {
      return <AdminAdsPage onBack={() => router.push('/admin')} onNavigate={handleNavigate} />;
    }
    if (pathname === '/admin/users') {
      return <AdminUsersPage onBack={() => router.push('/admin')} />;
    }
    if (pathname === '/admin/add-shop') {
      return <AdminAddShopPage onBack={() => router.push('/admin/shops')} onNavigate={handleNavigate} />;
    }
    if (pathname === '/admin/edit-shop') {
      if (!navData?.shop) {
        return <div className="p-4">Loading...</div>;
      }
      return <AdminEditShopPage shop={navData.shop} onBack={() => router.push('/admin/shops')} onNavigate={handleNavigate} />;
    }
    if (pathname === '/admin/add-ad') {
      return <AdminAddAdPage onBack={() => router.push('/admin/ads')} onNavigate={handleNavigate} />;
    }
    if (pathname === '/admin/edit-ad') {
      if (!navData?.ad) {
        return <div className="p-4">Loading...</div>;
      }
      return <AdminEditAdPage ad={navData.ad} onBack={() => router.push('/admin/ads')} onNavigate={handleNavigate} />;
    }
    if (pathname === '/admin/categories') {
      return <AdminCategoriesPage onBack={() => router.push('/admin')} />;
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
                    <div className="w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1920px] mx-auto bg-white dark:bg-gray-950 min-h-screen relative">
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