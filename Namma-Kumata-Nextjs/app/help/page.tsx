import type { Metadata } from 'next';
import { HelpPage } from '@/components/HelpPage';

export const metadata: Metadata = {
  title: 'Help & Support - Namma Kumta',
  description: 'Get help and support for using Namma Kumta.',
};

export default function Help() {
  return <HelpPage />;
}

