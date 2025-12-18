// app/page.tsx
import { HomePage } from "@/components/HomePage";
import { BottomNav } from "@/components/BottomNav";
import { advertisementApi } from "@/lib/api/advertisementApi";
import { productApi } from "@/lib/api/productApi";
import { AppHeader } from "@/components/AppHeader";

export default async function Home() {
  let ads: any[] = [];
  let shops: any[] = [];

  try {
    const adsRes = await advertisementApi.getAll();
    const shopsRes = await productApi.getAll();

    ads = adsRes?.data || [];
    shops = shopsRes?.data || [];
  } catch (err) {
    console.error("❌ Home fetch failed", err);
  }

  return (
    <>
      <AppHeader />
      <HomePage advertisements={ads} shops={shops} />

      <BottomNav />
    </>
  );
}
