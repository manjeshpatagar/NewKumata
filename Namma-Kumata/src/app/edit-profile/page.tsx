'use client';

import { useRouter } from 'next/navigation';
import { EditProfilePage } from '@/components/EditProfilePage';

export default function EditProfile() {
  const router = useRouter();

  return (
    <EditProfilePage onBack={() => router.push('/profile')} />
  );
}
