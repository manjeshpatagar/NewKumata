'use client';

import { useAdmin } from "@/contexts/AdminContext";
import { AdminEditShopPage } from "@/components/admin/AdminEditShopPage";
import { useRouter } from "next/navigation";

export default function EditShopPage({ params }: { params: { id: string } }) {
  const { shops } = useAdmin();
  const router = useRouter();

  // Find the shop by URL id
  const shop = shops.find(s => s.id === params.id);

  if (!shop) {
    return <p>Shop not found.</p>;
  }

  return (
    <AdminEditShopPage 
      shop={shop}
      onBack={() => router.back()}
    />
  );
}
