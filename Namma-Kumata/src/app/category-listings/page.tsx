'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CategoryListingsPage } from '@/components/CategoryListingsPage';

export default function CategoryListings() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const categoryId = searchParams.get('categoryId') || '';
  const categoryName = searchParams.get('categoryName') || '';
  const subcategory = searchParams.get('subcategory') || '';

  return (
    <CategoryListingsPage 
      categoryId={categoryId}
      categoryName={categoryName}
      subcategory={subcategory}
      onBack={() => router.push(`/subcategory?categoryId=${categoryId}&categoryName=${categoryName}`)} 
      onNavigate={(page, data) => {
        if (data) {
          sessionStorage.setItem('navData', JSON.stringify(data));
        }
        router.push(`/${page === 'home' ? '' : page}`);
      }} 
    />
  );
}
