'use client';

import { useRouter } from 'next/navigation';
import { TermsConditionsPage } from '@/components/TermsConditionsPage';

export default function TermsConditions() {
  const router = useRouter();

  return (
    <TermsConditionsPage 
      onBack={() => router.push('/profile')} 
      onNavigate={(page) => router.push(`/${page === 'home' ? '' : page}`)}
    />
  );
}
