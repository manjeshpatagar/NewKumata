'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { Toaster } from '@/components/ui/sonner';
import '@/styles/globals.css';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Namma Kumta - Community Guide</title>
        <meta name="description" content="Your local community guide for Kumta area" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <NotificationProvider>
                <FavoritesProvider>
                  <AdminProvider>
                    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
                      <div className="w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1920px] mx-auto bg-white dark:bg-gray-950 min-h-screen relative">
                        {children}
                      </div>
                    </div>
                    <Toaster />
                  </AdminProvider>
                </FavoritesProvider>
              </NotificationProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
