import { advertisementServerApi } from "@/lib/api-ssr/advertisementServerApi";
import { cookies } from "next/headers";
import { AdDetailPage } from "@/components/AdDetailPage";

export async function generateMetadata({ params }: any) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || null;

    const res = await advertisementServerApi.getById(params.id, token);
    const ad = res.data;

    return {
      title: `${ad.title} - Advertisement`,
      description: ad.description || "Advertisement details",
    };
  } catch {
    return {
      title: "Advertisement Details",
    };
  }
}

export default async function AdDetail({ params }: any) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value || null;

    const res = await advertisementServerApi.getById(params.id, token);
    const ad = res.data;

    return <AdDetailPage ad={ad} />;
  } catch (error) {
    console.error("❌ Failed to load Ad:", error);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Failed to load advertisement
          </p>
        </div>
      </div>
    );
  }
}
