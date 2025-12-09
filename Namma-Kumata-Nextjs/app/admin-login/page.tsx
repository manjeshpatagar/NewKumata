"use client";

import { useRouter } from 'next/navigation';
import { AdminLoginPage } from '@/components/admin/AdminLoginPage';

export default function AdminLogin() {
  const router = useRouter();
  return <AdminLoginPage onNavigate={(path) => router.push(path === 'admin' ? '/admin-dashboard' : '/')} />;
}

