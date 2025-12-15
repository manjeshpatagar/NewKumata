import { DetailPage } from "@/components/DetailPage";
import { productServerApi } from "@/lib/api-ssr/productServerApi";
import { cookies } from "next/headers";

interface Props {
  params: { id: string };
}

export default async function ListingDetailPage({ params }: Props) {
  const token = cookies().get("token")?.value || null;
  const id = params.id;

  try {
    // 1️⃣ Get current shop
    const res = await productServerApi.getById(id, token);
    const listing = res?.data?.data || res?.data || null;

    if (!listing) {
      return <DetailPage listing={null} moreShops={[]} />;
    }

    // 2️⃣ Get ALL shops (IMPORTANT FIX HERE)
    const allRes = await productServerApi.getAll(token);

    // ✅ YOUR API RETURNS ARRAY DIRECTLY
    const allShops = Array.isArray(allRes.data)
      ? allRes.data
      : allRes.data?.data || [];

    // 3️⃣ Current subCategoryId
    const currentSubCatId = String(listing.subCategoryId?._id);

    // 4️⃣ Same sub-category shops
    const sameSubCategoryShops = allShops.filter((item: any) => {
      return (
        item._id !== listing._id &&
        String(item.subCategoryId?._id) === currentSubCatId
      );
    });

    // 5️⃣ Fallback (any other shops)
    const fallbackShops = allShops.filter(
      (item: any) => item._id !== listing._id
    );

    // 6️⃣ Final moreShops (GUARANTEED)
    const moreShops =
      sameSubCategoryShops.length > 0
        ? sameSubCategoryShops.slice(0, 8)
        : fallbackShops.slice(0, 8);

        console.log(moreShops)

    return (
      <DetailPage
        listing={listing}
        moreShops={moreShops}
      />
    );
  } catch (err) {
    console.error("Failed to load listing", err);
    return <DetailPage listing={null} moreShops={[]} />;
  }
}