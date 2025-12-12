'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Search,
  Map,
  List as ListIcon,
  Star,
  Phone,
  MapPin,
  Flame,
  Star as StarIcon,
  Sparkles,
  Crown,
  TrendingUp,
  Zap,
} from 'lucide-react';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { FloatingAddButton } from './FloatingAddButton';
import { useLanguage } from '../contexts/LanguageContext';
import { productApi } from '@/lib/api/productApi';

interface CategoryListingsPageProps {
  categoryId: string;
  categoryName: string;
  subcategory: string;
}

// 🔥 Badge UI styles & icons
const badgeStyles: Record<string, { gradient: string; icon: any; label: string }> = {
  trending: {
    gradient: "bg-gradient-to-r from-red-500 to-orange-500 text-white",
    icon: TrendingUp,
    label: "Trending",
  },
  new: {
    gradient: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
    icon: Sparkles,
    label: "New",
  },
  featured: {
    gradient: "bg-gradient-to-r from-orange-400 to-amber-500 text-white",
    icon: Crown,
    label: "Featured",
  },
  popular: {
    gradient: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
    icon: StarIcon,
    label: "Popular",
  },
  exclusive: {
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    icon: Zap,
    label: "Exclusive",
  },
  upcoming: {
    gradient: "bg-gradient-to-r from-amber-500 to-yellow-500 text-white",
    icon: Flame,
    label: "Upcoming",
  },
};

export function CategoryListingsPage({
  categoryId,
  categoryName,
  subcategory,
}: CategoryListingsPageProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // 🔥 Load Products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await productApi.getAll();
        const allProducts = res?.data?.data || res?.data || res;

        const filtered = allProducts.filter((p: any) => {
          return (
            p.subCategoryId?.name?.toLowerCase() === subcategory.toLowerCase()
          );
        });

        setProducts(filtered);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [subcategory]);

  // Convert API → List Card UI data
  const listings = products.map((p: any) => ({
    id: p._id,
    name: p.shopName,
    businessName: p.description || p.about || "",
    image: p.images?.[0] || "",
    rating: p.rating || 0,
    reviewCount: p.reviewCount || 0,
    distance: p.distance || "",
    phone: p.contact?.phone,
    address: p.address,
    badge: p.badges || "",
  }));

  // 🔥 LIST CARD UI
  const ListingCard = ({ listing }: { listing: any }) => {
    const badgeData = badgeStyles[listing.badge?.toLowerCase()] || null;

    return (
      <Card
        className="p-0 overflow-hidden rounded-xl cursor-pointer hover:shadow-lg transition-all dark:bg-gray-900 dark:border-gray-800"
        onClick={() => {
          sessionStorage.setItem('currentListing', JSON.stringify(listing));
          router.push('/detail');
        }}
      >
        {/* IMAGE + BADGE */}
        <div className="relative w-full h-40 md:h-48 lg:h-52 overflow-hidden">
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-full object-cover"
          />

          {/* 🔥 BADGE ON IMAGE (top-left) */}
          {badgeData && (
            <div
              className={`absolute top-3 left-3 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium shadow-md ${badgeData.gradient}`}
            >
              <badgeData.icon className="w-3 h-3" />
              {badgeData.label}
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <h3 className="dark:text-white text-base md:text-lg">{listing.name}</h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {listing.businessName}
          </p>

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {listing.rating} ({listing.reviewCount})
            </div>

            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {listing.distance}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 text-xs text-gray-600 dark:text-gray-400">
            <MapPin className="w-3 h-3" />
            {listing.address}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col w-full max-w-7xl mx-auto bg-white dark:bg-gray-950">
      
      {/* HEADER */}
      <div className="p-4 md:p-6 lg:p-8 border-b dark:border-gray-800 sticky top-0 z-10 bg-white dark:bg-gray-950">
        <div className="flex items-center gap-4">

          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex-1">
            <h1 className="dark:text-white text-lg md:text-xl lg:text-2xl">
              {subcategory}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {products.length} {t('results')} in {categoryName}
            </p>
          </div>

          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'list' | 'map')}>
            <TabsList className="grid grid-cols-2 w-24 md:w-28">
              <TabsTrigger value="list">
                <ListIcon className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="map">
                <Map className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder={`Search ${subcategory}...`} className="pl-10" />
        </div>
      </div>

      {/* LISTING GRID */}
      <ScrollArea className="flex-1">
        <div className="p-4 md:p-6 lg:p-8 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {loading ? (
            <div className="col-span-full text-center py-10">{t('loading')}...</div>
          ) : listings.length > 0 ? (
            listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-12">
              {t('noResultsFound')}
            </div>
          )}

        </div>
      </ScrollArea>

      <FloatingAddButton />
    </div>
  );
}
