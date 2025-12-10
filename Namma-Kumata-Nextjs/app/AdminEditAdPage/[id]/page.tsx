'use client';

import { useState, useEffect } from 'react';
import { AdminEditAdPage } from "@/components/admin/AdminEditAdPage";
import { useRouter } from "next/navigation";
import { advertisementApi } from "@/lib/api/advertisementApi";
import { categoryApi } from "@/lib/api/categoryApi";
import { Ad } from "@/contexts/AdminContext";

interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  type: string;
  isActive: boolean;
  emoji?: string;
}

export default function EditAdPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [ad, setAd] = useState<Ad | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch advertisement and categories in parallel
        const [adRes, categoriesRes] = await Promise.all([
          advertisementApi.getById(params.id),
          categoryApi.getAll()
        ]);
        
        const adData = adRes.data || adRes;
        const categoriesData = categoriesRes.data || categoriesRes;
        
        // Filter for advertisement categories that are active
        const filteredCategories = (Array.isArray(categoriesData) ? categoriesData : []).filter(
          (cat: any) => cat.type === "advertisement" && cat.isActive
        );
        setCategories(filteredCategories);
        
        // Transform API response to match Ad interface
        const transformedAd: Ad = {
          id: adData._id || adData.id,
          title: adData.title || '',
          category: typeof adData.category === 'string' ? adData.category : (adData.category?._id || adData.category?.id || ''),
          status: adData.status || 'pending',
          owner: adData.contactinfo?.owner || adData.owner || '',
          submittedDate: adData.createdAt || adData.submittedDate || new Date().toISOString(),
          description: adData.description || '',
          price: adData.price?.toString() || '',
          phone: adData.contactinfo?.phone || adData.phone || '',
          location: adData.location || '',
          image: adData.images?.[0] || adData.image || '',
          featured: adData.featured || false,
          sponsored: adData.sponsored || false,
          duration: adData.duration,
          expiryDate: adData.expiryDate,
          approvedDate: adData.approvedDate,
        };
        
        setAd(transformedAd);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err?.response?.data?.message || 'Failed to load advertisement');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading advertisement...</p>
        </div>
      </div>
    );
  }

  if (error || !ad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-lg font-semibold mb-2">Advertisement not found</p>
          <p className="text-sm text-gray-600">{error || 'The advertisement you are looking for does not exist.'}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <AdminEditAdPage 
      ad={ad}
      categories={categories}
      onBack={() => router.back()}
    />
  );
}
