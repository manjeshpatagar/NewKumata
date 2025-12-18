// app/admin/subcategories/page.tsx
import { cookies } from "next/headers";
import { AdminSubCategoriesPage } from "@/components/admin/AdminSubCategoriesPage";
import { categoryServerApi } from "@/lib/api-ssr/categoryServerApi";
import { subCategoryServerApi } from "@/lib/api-ssr/subCategoryServerApi";

export const metadata = {
  title: "Manage Subcategories | Admin Dashboard",
  description: "Manage business subcategories in the admin panel.",
};

async function getDataSSR() {
  try {
    const cookieStore = cookies();
    const token =
      cookieStore.get("adminToken")?.value ||
      cookieStore.get("token")?.value ||
      "";
    const categoriesRes = await categoryServerApi.getAll(token);
    const subCatRes = await subCategoryServerApi.getAll(token);

    // Filter only business categories (for subcategories)
    const businessCategories = (categoriesRes.data || categoriesRes || []).filter(
      (cat: any) => cat.type === "business"
    );

    return {
      categories: businessCategories,
      subCategories: subCatRes.data || subCatRes || [],
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
