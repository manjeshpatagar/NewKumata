import type { Metadata } from 'next';
import { ContactUsPage } from '@/components/ContactUsPage';

export const metadata: Metadata = {
  title: 'Contact Us - Namma Kumta',
  description: 'Get in touch with the Namma Kumta team.',
};

export default function ContactUs() {
  return <ContactUsPage />;
}

