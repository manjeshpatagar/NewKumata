import { subCategoryServerApi } from "@/lib/api-ssr/subCategoryServerApi";
import { cookies } from "next/headers";
import SubcategoryPageComponent from "@/components/SubcategoryPage"; // ⬅ rename import

export default async function SubcategoryPageServer({ searchParams }: any) { // ⬅ rename function
  const { categoryId, categoryName } = searchParams;

  const token = cookies().get("token")?.value;

  const result = await subCategoryServerApi.getAll(token);
  const list = Array.isArray(result) ? result : result?.data || [];

  const subcategories = list.filter((s: any) => s.categoryId === categoryId);

  return (
    <SubcategoryPageComponent
      categoryId={categoryId}
      categoryName={categoryName}
      subcategories={subcategories}
    />
  );
}
