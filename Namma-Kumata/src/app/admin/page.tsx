'use client';

import { useRouter } from 'next/navigation';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default function Admin() {
  const router = useRouter();

  return (
    <AdminDashboard 
      onBack={() => router.push('/')} 
      onNavigate={(page, data) => {
        if (data) {
          sessionStorage.setItem('navData', JSON.stringify(data));
        }
        router.push(`/${page === 'home' ? '' : page}`);
      }} 
    />
  );
}
