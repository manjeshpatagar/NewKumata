import { AdminAddAdPage } from "@/components/admin/AdminAddAdPage";
import { categoryApi } from "@/lib/api/categoryApi";

async function getBusinessCategoriesSSR() {
  try {
    const res = await categoryApi.getAll();
    
    // Debug: Log the raw response
    console.log("Raw API response:", res);
    
    // Check if response has data property
    const data = res.data || res;
    
    // Filter for advertisement categories that are active
    const filteredCategories = (Array.isArray(data) ? data : []).filter(
      (cat: any) => cat.type === "advertisement" && cat.isActive
    );
    
    // Debug: Log filtered categories
    console.log("Filtered categories:", filteredCategories);
    
    return filteredCategories;
  } catch (error) {
    console.error("Failed to fetch business categories", error);
    return [];
  }
}

export default async function AdminDashboardPage() {
  const categories = await getBusinessCategoriesSSR();

  return <AdminAddAdPage categories={categories} />;
}