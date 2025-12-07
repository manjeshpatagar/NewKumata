'use client';

import { useSearchParams } from 'next/navigation';
import { SubcategoryPage } from '@/components/SubcategoryPage';

export default function Subcategory() {
  const searchParams = useSearchParams();
  
  return (
    <SubcategoryPage
      categoryId={searchParams.get('categoryId') || ''}
      categoryName={searchParams.get('categoryName') || ''}
    />
  );
}

