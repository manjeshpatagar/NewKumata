'use client';

import { useRouter } from 'next/navigation';
import { AdminAdsPage } from '@/components/admin/AdminAdsPage';

export default function AdminAds() {
  const router = useRouter();

  return (
    <AdminAdsPage 
      onBack={() => router.push('/admin')} 
      onNavigate={(page, data) => {
        if (data) {
          sessionStorage.setItem('navData', JSON.stringify(data));
        }
        router.push(`/${page === 'home' ? '' : page}`);
      }} 
    />
  );
}
