"use client";

import { AdminEditShopPage } from "@/components/admin/AdminEditShopPage";
import { useRouter } from "next/navigation";

export default function EditShopPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <AdminEditShopPage 
      shopId={params.id}
      onBack={() => router.back()}
    />
  );
}

