import type { Metadata } from 'next';
import { FavoritesPage } from '@/components/FavoritesPage';
import { BottomNav } from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'Favorites - Namma Kumta',
  description: 'View your favorite shops, temples, and advertisements.',
};

export default function Favorites() {
  return (
    <>
      <FavoritesPage />
      <BottomNav />
    </>
  );
}

