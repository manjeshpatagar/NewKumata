import type { Metadata } from 'next';
import { HomePage } from '@/components/HomePage';
import { BottomNav } from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'Home - Namma Kumta',
  description: 'Discover local shops, temples, services, and more in Kumta. Your one-stop guide to everything local.',
};

export default function Home() {
  return (
    <>
      <HomePage />
      <BottomNav />
    </>
  );
}

