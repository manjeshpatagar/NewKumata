'use client';

import { useEffect, useState } from 'react';
import { AdDetailPage } from '@/components/AdDetailPage';

export default function AdDetail() {
  const [ad, setAd] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('currentAd');
    if (stored) {
      try {
        setAd(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse ad data', e);
      }
    }
  }, []);

  if (!ad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return <AdDetailPage ad={ad} />;
}

