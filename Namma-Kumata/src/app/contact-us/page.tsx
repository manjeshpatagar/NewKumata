'use client';

import { useRouter } from 'next/navigation';
import { ContactUsPage } from '@/components/ContactUsPage';

export default function ContactUs() {
  const router = useRouter();

  return (
    <ContactUsPage onBack={() => router.push('/profile')} />
  );
}
