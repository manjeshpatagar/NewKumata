'use client';

import { useRouter } from 'next/navigation';
import { RegisterScreen } from '@/components/auth/RegisterScreen';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <RegisterScreen onNavigate={(page) => router.push(`/${page === 'home' ? '' : page}`)} />
  );
}
