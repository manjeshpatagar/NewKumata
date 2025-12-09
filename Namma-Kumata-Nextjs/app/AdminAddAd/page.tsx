// app/admin/ads/page.tsx
import { AdminAdsPage } from "@/components/admin/AdminAdsPage";
import { advertisementApi } from "@/lib/api/advertisementApi";

async function getAdvertisementsSSR() {
  try {
    const response = await advertisementApi.getAll();
    return response.data || [];
  } catch (error) {
    console.error("Failed to fetch advertisements", error);
    return [];
  }
}

export default async function AdminAdsPageWrapper() {
  const initialAds = await getAdvertisementsSSR();
  
  return <AdminAdsPage initialAds={initialAds} />;
}