// app/page.tsx
import { HomePage } from "@/components/HomePage";
import { BottomNav } from "@/components/BottomNav";
import { advertisementApi } from "@/lib/api/advertisementApi";
import { productApi } from "@/lib/api/productApi";

export default async function Home() {
  let ads: any[] = [];
  let shops: any[] = [];

  try {
    const adsRes = await advertisementApi.getAll();
    const shopsRes = await productApi.getAll();

    console.log("SERVER ADS RESPONSE 👉", adsRes);
    console.log("SERVER SHOPS RESPONSE 👉", shopsRes);

    ads = adsRes?.data || [];
    shops = shopsRes?.data || [];
  } catch (err) {
    console.error("❌ Home fetch failed", err);
  }

  console.log("SERVER FINAL ADS 👉", ads.length);
  console.log("SERVER FINAL SHOPS 👉", shops.length);

  return (
    <>
      <HomePage advertisements={ads} shops={shops} />
      <BottomNav />
    </>
  );
}
