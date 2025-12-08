import type { Metadata } from 'next';
import { RegisterScreen } from '@/components/auth/RegisterScreen';

export const metadata: Metadata = {
  title: 'Register - Namma Kumta',
  description: 'Create a new account on Namma Kumta to start exploring local businesses and services.',
};

export default function RegisterPage() {
  return <RegisterScreen />;
}

