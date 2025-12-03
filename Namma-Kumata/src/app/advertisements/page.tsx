'use client';

import { useRouter } from 'next/navigation';
import { AdvertisementsPage } from '@/components/AdvertisementsPage';
import { BottomNav } from '@/components/BottomNav';

export default function Advertisements() {
  const router = useRouter();

  return (
    <>
      <AdvertisementsPage 
        onBack={() => router.push('/')} 
        onNavigate={(page, data) => {
          if (data) {
            sessionStorage.setItem('navData', JSON.stringify(data));
          }
          router.push(`/${page === 'home' ? '' : page}`);
        }} 
      />
      <BottomNav activePage="advertisements" onNavigate={(page) => router.push(`/${page === 'home' ? '' : page}`)} />
    </>
  );
}
