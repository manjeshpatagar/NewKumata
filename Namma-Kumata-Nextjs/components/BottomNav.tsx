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
    { id: 'advertisements', path: '/ads', icon: Megaphone, label: t('advertise') || 'Advertise', requiresAuth: false },
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

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.requiresAuth) {
      requireAuth(() => router.push(item.path), () => router.push('/auth/login'));
    } else {
      router.push(item.path);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 z-50 shadow-lg">
      <div className="w-full flex justify-around items-center h-16 md:h-18 lg:h-20 px-2 md:px-4 lg:px-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg min-w-[60px] md:min-w-[80px] ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Icon className={`w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 ${isActive ? 'fill-blue-600 dark:fill-blue-400' : ''}`} />
              <span className="text-[10px] md:text-xs lg:text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}