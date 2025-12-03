'use client';

import { useRouter } from 'next/navigation';
import { EmergencyPage } from '@/components/EmergencyPage';

export default function Emergency() {
  const router = useRouter();

  return (
    <EmergencyPage onBack={() => router.back()} />
  );
}
