import type { Metadata } from 'next';
import { TermsConditionsPage } from '@/components/TermsConditionsPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Namma Kumta',
  description: 'Read the terms and conditions for using Namma Kumta.',
};

export default function TermsConditions() {
  return <TermsConditionsPage />;
}

