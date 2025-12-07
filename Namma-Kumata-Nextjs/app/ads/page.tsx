import type { Metadata } from 'next';
import { AdvertisementsPage } from '@/components/AdvertisementsPage';
import { BottomNav } from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'Advertisements - Namma Kumta',
  description: 'Browse and post advertisements for bikes, cars, rentals, jobs, and more in Kumta.',
};

export default function Advertisements() {
  return (
    <>
      <AdvertisementsPage />
      <BottomNav />
    </>
  );
}

