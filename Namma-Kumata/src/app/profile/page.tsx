'use client';

import { useRouter } from 'next/navigation';
import { ProfilePage } from '@/components/ProfilePage';
import { BottomNav } from '@/components/BottomNav';

export default function Profile() {
  const router = useRouter();

  return (
    <>
      <ProfilePage 
        onBack={() => router.push('/')} 
        onNavigate={(page, data) => {
          if (data) {
            sessionStorage.setItem('navData', JSON.stringify(data));
          }
          router.push(`/${page === 'home' ? '' : page}`);
        }} 
      />
      <BottomNav activePage="profile" onNavigate={(page) => router.push(`/${page === 'home' ? '' : page}`)} />
    </>
  );
}
