'use client';

import { useRouter } from 'next/navigation';
import { AdminShopsPage } from '@/components/admin/AdminShopsPage';

export default function AdminShops() {
  const router = useRouter();

  return (
    <AdminShopsPage 
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
