import type { Metadata } from 'next';
import { LoginScreen } from '@/components/auth/LoginScreen';

export const metadata: Metadata = {
  title: 'Login - Namma Kumta',
  description: 'Login to your Namma Kumta account to access all features.',
};

export default function LoginPage() {
  return <LoginScreen />;
}

