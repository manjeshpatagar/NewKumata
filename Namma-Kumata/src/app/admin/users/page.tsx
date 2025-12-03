'use client';

import { useRouter } from 'next/navigation';
import { AdminUsersPage } from '@/components/admin/AdminUsersPage';

export default function AdminUsers() {
  const router = useRouter();

  return (
    <AdminUsersPage onBack={() => router.push('/admin')} />
  );
}
