// app/Advertisements/page.tsx
import type { Metadata } from "next";
import { AdvertisementsPage } from "@/components/AdvertisementsPage";
import { categoryServerApi } from "@/lib/api-ssr/categoryServerApi";
import { advertisementServerApi } from "@/lib/api-ssr/advertisementServerApi";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Advertisements - Namma Kumta",
  description:
    "Browse and post advertisements for bikes, cars, rentals, jobs, and more in Kumta.",
};

async function getSSRData() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || null;

    const categoriesRes = await categoryServerApi.getAll(token);
    const advertisementsRes = await advertisementServerApi.getAll(token);
    console.log("✅ SSR load successful", advertisementsRes.data);

    const advertisementCategories = (categoriesRes.data || []).filter(
      (cat: any) => cat.type === "advertisement"
    );

    return {
      categories: advertisementCategories,
      advertisments: advertisementsRes.data || [],
    };
  } catch (error) {
    console.error("❌ SSR load failed:", error);
    return { categories: [], advertisments: [] };
  }
}

export default async function Advertisements() {
  const { categories, advertisments } = await getSSRData();

  return (
    <>
      <AdvertisementsPage
        initialCategories={categories}
        initialAdvertisment={advertisments}
      />
      {/* <BottomNav /> */}
    </>
  );
}
