import type { Metadata } from 'next';
import { NotificationsPage } from '@/components/NotificationsPage';

export const metadata: Metadata = {
  title: 'Notifications - Namma Kumta',
  description: 'View your notifications and updates.',
};

export default function Notifications() {
  return <NotificationsPage />;
}

