// app/Advertisements/page.tsx
import type { Metadata } from "next";
import { AdvertisementsPage } from "@/components/AdvertisementsPage";
import { BottomNav } from "@/components/BottomNav";
import { categoryServerApi } from "@/lib/api-ssr/categoryServerApi";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Advertisements - Namma Kumta",
  description:
    "Browse and post advertisements for bikes, cars, rentals, jobs, and more in Kumta.",
};

async function getCategoriesSSR() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || null;

    const categoriesRes = await categoryServerApi.getAll(token);

    // Filter only advertisement type categories
    const advertisementCategories = (categoriesRes.data || []).filter(
      (cat: any) => cat.type === "advertisement"
    );

    return advertisementCategories;
  } catch (error) {
    console.error("❌ Failed to load categories SSR:", error);
    return [];
  }
}

export default async function Advertisements() {
  const advertisementCategories = await getCategoriesSSR();

  return (
    <>
      <AdvertisementsPage initialCategories={advertisementCategories} />
      <BottomNav />
    </>
  );
}
