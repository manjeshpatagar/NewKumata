import { cookies } from "next/headers";
import { AdminShopsPage } from "@/components/admin/AdminShopsPage";
import { productServerApi } from "@/lib/api-ssr/productServerApi";

export default async function AdminDashboardPage() {

  // ✔ Read token from cookies (SSR)
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";

  // ✔ Fetch from SSR API
  const res = await productServerApi.getAll(token);

  const items = res.data || [];

  // ✔ Normalize + include full payload
  const normalized = items.map((item: any) => ({
    // ⭐ Normalized fields for UI
    id: item._id,
    name: item.shopName,
    category: item.categoryId?.name || "Uncategorized",
    subCategory: item.subCategoryId?.name || "",
    owner: item.contact?.ownerName || "Unknown",
    phone: item.contact?.phone,
    address: item.address,
    description: item.description,
    submittedDate: item.createdAt
      ? new Intl.DateTimeFormat("en-IN").format(new Date(item.createdAt))
      : "-",
    location: item.address,
    openingHours:
      item.openingHours?.open && item.openingHours?.close
        ? `${item.openingHours.open} - ${item.openingHours.close}`
        : "",
    status: item.status,

    // ⭐ RAW FULL API PAYLOAD (everything included)
  
      contact: item.contact,
      images: item.images,
      thumbnail: item.thumbnail,
      categoryId: item.categoryId,
      subCategoryId: item.subCategoryId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      _v: item.__v,
      fullItem: item, // entire object
  }));

  return <AdminShopsPage ssrShops={normalized} />;
}
