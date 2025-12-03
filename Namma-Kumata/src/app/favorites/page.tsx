'use client';

import { useRouter } from 'next/navigation';
import { FavoritesPage } from '@/components/FavoritesPage';
import { BottomNav } from '@/components/BottomNav';

export default function Favorites() {
  const router = useRouter();

  return (
    <>
      <FavoritesPage 
        onBack={() => router.push('/')} 
        onNavigate={(page, data) => {
          if (data) {
            sessionStorage.setItem('navData', JSON.stringify(data));
          }
          router.push(`/${page === 'home' ? '' : page}`);
        }} 
      />
      <BottomNav activePage="favorites" onNavigate={(page) => router.push(`/${page === 'home' ? '' : page}`)} />
    </>
  );
}
