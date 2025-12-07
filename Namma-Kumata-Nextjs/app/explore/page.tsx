import type { Metadata } from 'next';
import { ExplorePage } from '@/components/ExplorePage';
import { BottomNav } from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'Explore - Namma Kumta',
  description: 'Explore local places, shops, temples, and services in Kumta.',
};

export default function Explore() {
  return (
    <>
      <ExplorePage />
      <BottomNav />
    </>
  );
}

