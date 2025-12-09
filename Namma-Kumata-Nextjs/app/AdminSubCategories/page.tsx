// app/admin/subcategories/page.tsx

import { AdminSubCategoriesPage } from "@/components/admin/AdminSubCategoriesPage";
import { categoryApi } from "@/lib/api/categoryApi";
import { subCategoryApi } from "@/lib/api/subCategoryApi";

export const metadata = {
  title: "Manage Subcategories | Admin Dashboard",
  description: "Manage business subcategories in the admin panel.",
};

async function getDataSSR() {
  try {
    const categoriesRes = await categoryApi.getAll();
    const subCatRes = await subCategoryApi.getAll();

    // Filter only business categories (for subcategories)
    const businessCategories = (categoriesRes.data || []).filter(
      (cat: any) => cat.type === "business"
    );

    return {
      categories: businessCategories,
      subCategories: subCatRes.data || [],
    };
  } catch (error) {
    console.error("SSR fetch error:", error);
    return { categories: [], subCategories: [] };
  }
}

export default async function AdminSubCategoriesPageWrapper() {
  const { categories, subCategories } = await getDataSSR();

  return (
    <AdminSubCategoriesPage
      initialCategories={categories}
      initialSubCategories={subCategories}
    />
  );
}
