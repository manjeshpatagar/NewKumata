import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { AdminProvider } from '@/contexts/AdminContext';

import { Toaster } from '@/components/ui/sonner';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Namma Kumta - Your Local Community Guide',
  description:
    'Discover local shops, temples, services, and more in Kumta.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <NotificationProvider>
                <FavoritesProvider>
                  <AdminProvider>

                    {/* ONLY PROVIDERS HERE */}
                    {children}

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
