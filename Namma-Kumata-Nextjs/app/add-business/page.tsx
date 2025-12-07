import type { Metadata } from 'next';
import { AddListingPage } from '@/components/AddListingPage';

export const metadata: Metadata = {
  title: 'Add Business - Namma Kumta',
  description: 'List your business on Namma Kumta.',
};

export default function AddBusiness() {
  return <AddListingPage />;
}

