import type { Metadata } from 'next';
import { AddAdvertisementPage } from '@/components/AddAdvertisementPage';

export const metadata: Metadata = {
  title: 'Add Advertisement - Namma Kumta',
  description: 'Post your advertisement on Namma Kumta.',
};

export default function AddAdvertisement() {
  return <AddAdvertisementPage />;
}

