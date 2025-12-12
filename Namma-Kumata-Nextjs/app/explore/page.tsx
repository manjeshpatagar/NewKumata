import type { Metadata } from "next";
import { cookies } from "next/headers";
import { categoryServerApi } from "@/lib/api-ssr/categoryServerApi";
import ExplorePage from "@/components/ExplorePage"; // <-- MUST BE DEFAULT EXPORT
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Explore - Namma Kumta",
  description: "Explore local places, shops, temples, and services in Kumta.",
};

async function getSSRData() {
  try {
    const token = cookies().get("token")?.value;

    const res = await categoryServerApi.getAll(token);
    const categories = Array.isArray(res?.data) ? res.data : [];

    // only business categories
    const business = categories.filter((c: any) => c.type === "business");

    return business;
  } catch (error) {
    console.error("❌ Explore SSR error:", error);
    return [];
  }
}

export default async function ExploreSSRPage() {
  const categories = await getSSRData();

  return (
    <>
      <ExplorePage initialCategories={categories} />
      <BottomNav />
    </>
  );
}
