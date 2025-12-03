'use client';

import { useRouter } from 'next/navigation';
import { DetailPage } from '@/components/DetailPage';
import { useEffect, useState } from 'react';

export default function Detail() {
  const router = useRouter();
  const [listing, setListing] = useState<any>(null);

  useEffect(() => {
    const navData = sessionStorage.getItem('navData');
    if (navData) {
      const data = JSON.parse(navData);
      if (data.listing) {
        setListing(data.listing);
      }
    }
  }, []);

  if (!listing) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <DetailPage 
      listing={listing}
      onBack={() => router.back()} 
    />
  );
}
