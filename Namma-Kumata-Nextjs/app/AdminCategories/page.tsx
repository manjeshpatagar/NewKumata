// app/admin/categories/page.tsx

import { cookies } from "next/headers";
import { AdminCategoriesPage } from "@/components/admin/AdminCategoriesPage";
import { categoryServerApi } from "@/lib/api-ssr/categoryServerApi";

export const metadata = {
  title: "Manage Categories | Admin Dashboard",
  description: "Admin panel to manage business and advertisement categories.",
};

// ⭐ Fetch categories with token from cookies (SSR safe)
async function getCategoriesSSR() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("adminToken")?.value;

    const res = await categoryServerApi.getAll(token);
    return res.data || [];
  } catch (error) {
    console.error("❌ Failed to fetch categories (SSR):", error);
    return [];
  }
}

export default async function AdminCategoriesPageWrapper() {
  const categories = await getCategoriesSSR();

  return <AdminCategoriesPage initialCategories={categories} />;
}
