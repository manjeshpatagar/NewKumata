'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SubcategoryPage } from '@/components/SubcategoryPage';

export default function Subcategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const categoryId = searchParams.get('categoryId') || '';
  const categoryName = searchParams.get('categoryName') || '';

  return (
    <SubcategoryPage 
      categoryId={categoryId}
      categoryName={categoryName}
      onBack={() => router.push('/explore')} 
      onNavigate={(page, data) => {
        if (data) {
          sessionStorage.setItem('navData', JSON.stringify(data));
        }
        if (page === 'categoryListings') {
          router.push(`/category-listings?categoryId=${data?.categoryId}&categoryName=${data?.categoryName}&subcategory=${data?.subcategory}`);
        } else {
          router.push(`/${page}`);
        }
      }} 
    />
  );
}
