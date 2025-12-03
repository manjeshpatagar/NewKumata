'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HomePage } from '@/components/HomePage';
import { BottomNav } from '@/components/BottomNav';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isGuest } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !isGuest) {
      router.push('/login');
    }
  }, [isAuthenticated, isGuest, router]);

  if (!isAuthenticated && !isGuest) {
    return null;
  }

  return (
    <>
      <HomePage onNavigate={(page, data) => {
        if (data) {
          // Store navigation data in sessionStorage for pages that need it
          sessionStorage.setItem('navData', JSON.stringify(data));
        }
        router.push(`/${page === 'home' ? '' : page}`);
      }} />
      <BottomNav activePage="home" onNavigate={(page) => router.push(`/${page === 'home' ? '' : page}`)} />
    </>
  );
}
