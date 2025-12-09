// app/admin/categories/page.tsx

import { AdminCategoriesPage } from "@/components/admin/AdminCategoriesPage";
import { categoryApi } from "@/lib/api/categoryApi";

// ✅ SEO Metadata
export const metadata = {
  title: "Manage Categories | Admin Dashboard",
  description: "Admin panel to manage business and advertisement categories.",
};

// ✅ SSR Fetch using your categoryApi
async function getCategoriesSSR() {
  try {
    const res = await categoryApi.getAll();
    // assuming backend returns: { success, count, data: [...] }
    return res.data || [];
  } catch (error) {
    console.error("Failed to fetch categories (SSR):", error);
    return [];
  }
}

export default async function AdminCategoriesPageWrapper() {
  const categories = await getCategoriesSSR();

  return <AdminCategoriesPage initialCategories={categories} />;
}
