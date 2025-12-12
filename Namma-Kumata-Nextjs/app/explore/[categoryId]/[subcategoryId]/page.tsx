// -----------------------------
// FILE: app/explore/[categoryId]/[subcategoryId]/page.tsx
// Server component - Listing page for a specific subcategory
// -----------------------------

import { CategoryListingsPage } from "@/components/CategoryListingsPage";
import { productServerApi } from "@/lib/api-ssr/productServerApi";
import { subCategoryServerApi } from "@/lib/api-ssr/subCategoryServerApi";
import { cookies } from "next/headers";

interface Props {
  params: { categoryId: string; subcategoryId: string };
}

export default async function SubcategoryListingsPage({ params }: Props) {
  const { categoryId, subcategoryId } = params;
  const token = cookies().get("token")?.value;

  // Fetch all products
  const productsRes = await productServerApi.getAll(token);
  const productsList = productsRes?.data?.data || productsRes?.data || [];

  // Fetch subcategory info
  const subRes = await subCategoryServerApi.getAll(token);
  const allSubs = Array.isArray(subRes) ? subRes : subRes?.data || [];
  const subObj = allSubs.find((s: any) => s._id === subcategoryId) || null;
  const subcategoryName = subObj?.name || "";

  // Filter products by subcategoryId
  const filtered = productsList.filter(
    (p: any) =>
      p.subCategoryId === subcategoryId ||
      p.subCategoryId?._id === subcategoryId
  );

  return (
    <CategoryListingsPage
      categoryId={categoryId}
      categoryName={""}
      subcategory={subcategoryName}
      initialProducts={filtered}
    />
  );
}
