'use client';

import { useRouter } from 'next/navigation';
import { ExplorePage } from '@/components/ExplorePage';
import { BottomNav } from '@/components/BottomNav';

export default function Explore() {
  const router = useRouter();

  return (
    <>
      <ExplorePage 
        onBack={() => router.push('/')} 
        onNavigate={(page, data) => {
          if (data) {
            sessionStorage.setItem('navData', JSON.stringify(data));
          }
          router.push(`/${page === 'home' ? '' : page}`);
        }} 
      />
      <BottomNav activePage="explore" onNavigate={(page) => router.push(`/${page === 'home' ? '' : page}`)} />
    </>
  );
}
