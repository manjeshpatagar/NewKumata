// -----------------------------
// FILE: app/listing/[id]/page.tsx
// Server component - Listing detail (product/shop)
// -----------------------------

import { DetailPage } from "@/components/DetailPage";
import { productServerApi } from "@/lib/api-ssr/productServerApi";
import { cookies } from "next/headers";

interface Props {
  params: { id: string };
}

export default async function ListingDetailPage({ params }: Props) {
  const { id } = params;
  const token = cookies().get("token")?.value;

  try {
    const res = await productServerApi.getById(id, token);
    const listing = res?.data?.data || res?.data || null;
    console.log("Listing detail fetched:", listing);

    if (!listing) {
      // next.js will render not-found if you want; for now return a client component with null (it should show fallback)
      return <DetailPage listing={null} />;
    }

    return <DetailPage listing={listing} />;
  } catch (err) {
    console.error("Failed to load listing", err);
    return <DetailPage listing={null} />;
  }
}
