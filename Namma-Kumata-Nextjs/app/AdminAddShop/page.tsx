// app/AdminAddShop/page.tsx

import { cookies } from "next/headers";
import { AdminShopsPage } from "@/components/admin/AdminShopsPage";
import { productServerApi } from "@/lib/api-ssr/productServerApi";

export default async function AdminDashboardPage() {

  // ✔ Read admin token from cookies (SSR)
  const cookieStore = cookies();
  const token =
    cookieStore.get("adminToken")?.value ||
    cookieStore.get("token")?.value || null;

    let shops:any[]=[]

  try {
    const res = await productServerApi.getAll(token);

    const items = res.data || [];
    console.log("🛍️ Loaded products (SSR):", items);

    // Normalize for UI
    shops = items.map((item: any) => ({
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
      thumbnail: item.thumbnail,

      // full backend object
      raw: item,
    }));
  } catch (err) {
    console.error("❌ Failed to load products (SSR):", err);
  }

  return <AdminShopsPage ssrShops={shops} />;
}
