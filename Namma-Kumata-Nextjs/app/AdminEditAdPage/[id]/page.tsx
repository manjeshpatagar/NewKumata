'use client';

import { useAdmin } from "@/contexts/AdminContext";
import { AdminEditAdPage } from "@/components/admin/AdminEditAdPage";
import { useRouter } from "next/navigation";

export default function EditAdPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { ads } = useAdmin();

  const ad = ads.find(a => a.id === params.id);

  if (!ad) {
    return (
      <div className="p-6 text-center text-red-500">
        Advertisement not found.
      </div>
    );
  }

  return (
    <AdminEditAdPage 
      ad={ad}
      onBack={() => router.back()}
    />
  );
}
