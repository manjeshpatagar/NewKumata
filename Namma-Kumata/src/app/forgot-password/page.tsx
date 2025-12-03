'use client';

import { useRouter } from 'next/navigation';
import { ForgotPasswordScreen } from '@/components/auth/ForgotPasswordScreen';

export default function ForgotPasswordPage() {
  const router = useRouter();

  return (
    <ForgotPasswordScreen onNavigate={(page) => router.push(`/${page === 'home' ? '' : page}`)} />
  );
}
