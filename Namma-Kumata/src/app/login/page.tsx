'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginScreen } from '@/components/auth/LoginScreen';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isGuest } = useAuth();

  useEffect(() => {
    if (isAuthenticated || isGuest) {
      router.push('/');
    }
  }, [isAuthenticated, isGuest, router]);

  return (
    <LoginScreen onNavigate={(page) => router.push(`/${page === 'home' ? '' : page}`)} />
  );
}
