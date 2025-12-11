'use client';

import { useSearchParams } from 'next/navigation';
import { CategoryListingsPage } from '@/components/CategoryListingsPage';

export default function CategoryListings() {
  const searchParams = useSearchParams();
  
  return (
    <CategoryListingsPage
      categoryId={searchParams.get('categoryId') || ''}
      categoryName={searchParams.get('categoryName') || ''}
      subcategory={searchParams.get('subcategory') || ''}
    />
  );
}
