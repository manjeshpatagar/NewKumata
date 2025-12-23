import { advertisementServerApi } from "@/lib/api-ssr/advertisementServerApi";
import { cookies } from "next/headers";
import { AdDetailPage } from "@/components/AdDetailPage";
import { BottomNav } from "@/components/BottomNav";

export async function generateMetadata({ params }: any) {
  try {
    const token = cookies().get("token")?.value || null;
    const res = await advertisementServerApi.getById(params.id, token);
    const ad = res.data;

    return {
      title: `${ad.title} - Advertisement`,
      description: ad.description || "Advertisement details",
    };
  } catch {
    return { title: "Advertisement Details" };
  }
}

export default async function AdDetail({ params }: any) {
  try {
    const token = cookies().get("token")?.value || null;

// 1️⃣ Get current ad
const adRes = await advertisementServerApi.getById(params.id, token);
const ad = adRes.data;

// 2️⃣ Get all ads
const adsRes = await advertisementServerApi.getAll(token);
const allAds = adsRes.data || [];

// 3️⃣ First: same category ads (BEST MATCH)
const sameCategoryAds = allAds.filter(
  (item: any) =>
    item._id !== ad._id &&
    String(item.category?._id || item.category) ===
      String(ad.category?._id || ad.category)
);

// 4️⃣ Fallback: any other ads
const otherAds = allAds.filter(
  (item: any) => item._id !== ad._id
);

// 5️⃣ Merge & limit
const moreAds =
  sameCategoryAds.length > 0
    ? sameCategoryAds.slice(0, 8)
    : otherAds.slice(0, 8);

    console.log("➡️ moreAds:", ad);
return (
  <>
<AdDetailPage ad={ad} moreAds={moreAds} />
  <BottomNav/>
  </>
);


  } catch (error) {
    console.error("❌ Failed to load Ad:", error);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Failed to load advertisement</p>
      </div>
    );
  }
}
