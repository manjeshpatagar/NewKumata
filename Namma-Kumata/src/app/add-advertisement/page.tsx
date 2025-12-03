'use client';

import { useRouter } from 'next/navigation';
import { AddAdvertisementPage } from '@/components/AddAdvertisementPage';

export default function AddAdvertisement() {
  const router = useRouter();

  return (
    <AddAdvertisementPage 
      onBack={() => router.back()} 
      onSuccess={() => router.push('/advertisements')}
      onNavigate={(page) => router.push(`/${page === 'home' ? '' : page}`)}
    />
  );
}
