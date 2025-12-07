import type { Metadata } from 'next';
import { EditProfilePage } from '@/components/EditProfilePage';

export const metadata: Metadata = {
  title: 'Edit Profile - Namma Kumta',
  description: 'Edit your profile information on Namma Kumta.',
};

export default function EditProfile() {
  return <EditProfilePage />;
}

