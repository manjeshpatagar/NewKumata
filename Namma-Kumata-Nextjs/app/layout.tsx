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
  description: 'Discover local shops, temples, services, and more in Kumta. Your one-stop guide to everything local.',
  keywords: ['Kumta', 'local guide', 'shops', 'services', 'community'],
  authors: [{ name: 'Namma Kumta' }],
  openGraph: {
    title: 'Namma Kumta - Your Local Community Guide',
    description: 'Discover local shops, temples, services, and more in Kumta.',
    type: 'website',
  },
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
                    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
                      <div className="w-full max-w-[1920px] mx-auto bg-white dark:bg-gray-950 min-h-screen relative">
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

