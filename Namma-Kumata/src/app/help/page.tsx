'use client';

import { useRouter } from 'next/navigation';
import { HelpPage } from '@/components/HelpPage';

export default function Help() {
  const router = useRouter();

  return (
    <HelpPage 
      onBack={() => router.push('/profile')} 
      onNavigate={(page) => router.push(`/${page === 'home' ? '' : page}`)}
    />
  );
}
