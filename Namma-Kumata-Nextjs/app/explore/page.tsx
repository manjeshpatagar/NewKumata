// app/explore/page.tsx
import type { Metadata } from 'next';
import { ExplorePage } from '@/components/ExplorePage';
import { categoryServerApi } from '@/lib/api-ssr/categoryServerApi';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Explore - Namma Kumta',
  description: 'Explore local places, shops, temples, and services in Kumta.',
};

async function getSSRData() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || null;

    const categoriesRes = await categoryServerApi.getAll(token);
    const categoriesData = categoriesRes?.data || [];

    // Filter only business categories (as you requested)
    const businessCats = Array.isArray(categoriesData)
      ? categoriesData.filter((cat: any) => cat.type === 'business')
      : [];

    return { categories: businessCats };
  } catch (error) {
    console.error('❌ SSR load failed (Explore):', error);
    return { categories: [] };
  }
}

export default async function ExploreSSRPage() {
  const { categories } = await getSSRData();

  return (
    <>
      <ExplorePage initialCategories={categories} />
    </>
  );
}
