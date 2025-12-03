'use client';

import { useRouter } from 'next/navigation';
import { CategoriesPage } from '@/components/CategoriesPage';
import { BottomNav } from '@/components/BottomNav';

export default function Categories() {
  const router = useRouter();

  return (
    <>
      <CategoriesPage 
        onBack={() => router.push('/')} 
        onNavigate={(page, data) => {
          if (data) {
            sessionStorage.setItem('navData', JSON.stringify(data));
          }
          router.push(`/${page === 'home' ? '' : page}`);
        }} 
      />
      <BottomNav activePage="categories" onNavigate={(page) => router.push(`/${page === 'home' ? '' : page}`)} />
    </>
  );
}
