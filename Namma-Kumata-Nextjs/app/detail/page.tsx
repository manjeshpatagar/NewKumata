'use client';

import { useEffect, useState } from 'react';
import { DetailPage } from '@/components/DetailPage';

export default function Detail() {
  const [listing, setListing] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('currentListing');
    if (stored) {
      try {
        setListing(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse listing data', e);
      }
    }
  }, []);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return <DetailPage listing={listing} />;
}

