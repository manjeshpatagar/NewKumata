import type { Metadata } from 'next';
import { CategoriesPage } from '@/components/CategoriesPage';

export const metadata: Metadata = {
  title: 'Categories - Namma Kumta',
  description: 'Browse all categories of shops, temples, services, and more in Kumta.',
};

export default function Categories() {
  return <CategoriesPage />;
}

