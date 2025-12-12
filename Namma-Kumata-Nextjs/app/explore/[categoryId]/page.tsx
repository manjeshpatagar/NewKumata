// -----------------------------
// FILE: app/explore/[categoryId]/page.tsx
// Server component - Category page (shows subcategories)
// -----------------------------
import SubcategoryPage from "@/components/SubcategoryPage";
import { subCategoryServerApi } from "@/lib/api-ssr/subCategoryServerApi";
import { categoryServerApi } from "@/lib/api-ssr/categoryServerApi";
import { cookies } from "next/headers";

interface Props {
  params: { categoryId: string };
}

export default async function CategoryPage({ params }: Props) {
  const { categoryId } = params;
  const token = cookies().get("token")?.value;

  // fetch all subcategories and the category itself
  const [allSubRes, categoryRes] = await Promise.all([
    subCategoryServerApi.getAll(token),
    categoryServerApi.getById(categoryId, token),
  ]);

  const list = Array.isArray(allSubRes) ? allSubRes : allSubRes?.data || [];
  const subcategories = list.filter((s: any) => s.categoryId === categoryId);

  const category = categoryRes?.data || { _id: categoryId, name: "" };

  return (
    <SubcategoryPage
      categoryId={categoryId}
      categoryName={category.name || ""}
      subcategories={subcategories}
    />
  );
}
