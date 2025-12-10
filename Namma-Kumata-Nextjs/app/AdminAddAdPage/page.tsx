import { AdminAddAdPage } from "@/components/admin/AdminAddAdPage";
import { categoryServerApi } from "@/lib/api-ssr/categoryServerApi";
import { cookies } from "next/headers";

async function getBusinessCategoriesSSR() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("adminToken")?.value;

    const res = await categoryServerApi.getAll(token);
    
    // Get categories array from response (same pattern as AdminCategories)
    const categories = res.data || [];
    
    // Filter for advertisement categories that are active
    const filteredCategories = (Array.isArray(categories) ? categories : []).filter(
      (cat: any) => cat.type === "advertisement" && cat.isActive
    );
    
    return filteredCategories;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return [];
  }
}

export default async function AdminDashboardPage() {
  const categories = await getBusinessCategoriesSSR();

  return <AdminAddAdPage categories={categories} />;
}