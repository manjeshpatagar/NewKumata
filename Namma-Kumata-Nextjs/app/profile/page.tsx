import type { Metadata } from 'next';
import { ProfilePage } from '@/components/ProfilePage';
import { BottomNav } from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'Profile - Namma Kumta',
  description: 'View and manage your Namma Kumta profile.',
};

export default function Profile() {
  return (
    <>
      <ProfilePage />
      <BottomNav />
    </>
  );
}

