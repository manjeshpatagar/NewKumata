'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, Grid, Megaphone, Heart, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();
  const { requireAuth } = useRequireAuth();

  const navItems = [
    { id: 'home', path: '/', icon: Home, label: t('home'), requiresAuth: false },
    { id: 'explore', path: '/explore', icon: Grid, label: t('explore'), requiresAuth: false },
    {
      id: 'advertisements',
      path: '/ads',
      icon: Megaphone,
      label: t('advertise') || 'Advertise',
      requiresAuth: false,
    },
    { id: 'favorites', path: '/favorites', icon: Heart, label: t('favorites'), requiresAuth: true },
    { id: 'profile', path: '/profile', icon: User, label: t('profile'), requiresAuth: true },
  ];

  const getActivePage = () => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/explore')) return 'explore';
    if (pathname.startsWith('/ads')) return 'advertisements';
    if (pathname.startsWith('/favorites')) return 'favorites';
    if (pathname.startsWith('/profile')) return 'profile';
    return '';
  };

  const activePage = getActivePage();

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.requiresAuth) {
      requireAuth(
        () => router.push(item.path),
        () => router.push('/auth/login')
      );
    } else {
      router.push(item.path);
    }
  };

  return (
    /* ✅ MOBILE ONLY BOTTOM NAV */
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 shadow-lg md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className="flex flex-1 items-center justify-center h-full"
            >
              <div
                className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
              >
                {/* ICON CIRCLE */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* LABEL */}
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
