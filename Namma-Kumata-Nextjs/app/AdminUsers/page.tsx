// app/admin/users/page.tsx

import { cookies } from "next/headers";
import { AdminUsersPage } from "@/components/admin/AdminUsersPage";
import { authServerApi } from "@/lib/api-ssr/authServerApi";

async function getUsersSSR() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("adminToken")?.value; // Read admin token

    if (!token) return [];

    const res = await authServerApi.getProfile(token);

    // Backend returns: { success, isAdmin, data: [...] }
    return res.data || [];
  } catch (err) {
    console.error("❌ SSR Fetch Users Error:", err);
    return [];
  }
}

export default async function AdminDashboardPage() {
  const users = await getUsersSSR();

  return <AdminUsersPage initialUsers={users} />;
}
