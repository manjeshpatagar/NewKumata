'use client';

import { useRouter } from 'next/navigation';
import { NotificationsPage } from '@/components/NotificationsPage';

export default function Notifications() {
  const router = useRouter();

  return (
    <NotificationsPage onBack={() => router.back()} />
  );
}
