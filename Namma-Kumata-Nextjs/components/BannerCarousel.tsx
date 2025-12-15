'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Sparkles,
  TrendingUp,
  Calendar,
  ArrowRight,
} from 'lucide-react';

import { productApi } from '@/lib/api/productApi';

interface BannerItem {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  badge: 'Featured' | 'Trending' | 'Upcoming';
  icon: any;
  color: string;
}

export function BannerCarousel() {
  const router = useRouter();
  const { t } = useLanguage();
  const [banners, setBanners] = useState<BannerItem[]>([]);

  /* =====================================================
     LOAD PRODUCTS → CONVERT TO BANNERS
  ===================================================== */
  useEffect(() => {
    async function loadBanners() {
      try {
        const res = await productApi.getAll();
        const products = res?.data || res || [];

        console.log("🟢 PRODUCT API RAW:", products);

        const now = Date.now();
        const fourteenDays = 14 * 24 * 60 * 60 * 1000;

        const mapped: BannerItem[] = [];

        products.forEach((product: any) => {
          const image =
            product.thumbnail ||
            product.images?.[0] ||
            null;

          if (!image) return; // no image → no banner

          // 🟡 FEATURED
          if (product.featured || product.isFeatured) {
            mapped.push({
              _id: product._id,
              title: product.name,
              description: product.description,
              image,
              badge: 'Featured',
              icon: Sparkles,
              color: 'from-emerald-500 to-teal-600',
            });
            return;
          }

          // 🔥 TRENDING
          if (product.isTrending) {
            mapped.push({
              _id: product._id,
              title: product.name,
              description: product.description,
              image,
              badge: 'Trending',
              icon: TrendingUp,
              color: 'from-blue-500 to-indigo-600',
            });
            return;
          }

          // 🟢 UPCOMING (NEW)
          if (
            product.createdAt &&
            now - new Date(product.createdAt).getTime() < fourteenDays
          ) {
            mapped.push({
              _id: product._id,
              title: product.name,
              description: product.description,
              image,
              badge: 'Upcoming',
              icon: Calendar,
              color: 'from-amber-500 to-orange-600',
            });
          }
        });

        console.log("🎯 FINAL BANNERS:", mapped);
        setBanners(mapped.slice(0, 10)); // limit banners
      } catch (err) {
        console.error("❌ Banner load failed", err);
      }
    }

    loadBanners();
  }, []);

  if (banners.length === 0) return null;

  /* =====================================================
     RENDER
  ===================================================== */
  return (
    <div className="relative px-4 md:px-6 lg:px-8">
      <Carousel className="w-full" opts={{ loop: true, align: 'start' }}>
        <CarouselContent className="-ml-2 md:-ml-3">
          {banners.map((banner) => {
            const Icon = banner.icon;

            return (
              <CarouselItem
                key={banner._id}
                className="pl-2 md:pl-3 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div
                  className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02]"
                  onClick={() => router.push('/detail')}
                >
                  {/* IMAGE */}
                  <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden">
                    <ImageWithFallback
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>

                  {/* CONTENT */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
                    <Badge
                      className={`bg-gradient-to-r ${banner.color} text-white border-0 shadow-lg flex items-center gap-1.5`}
                    >
                      <Icon className="w-3 h-3" />
                      {banner.badge}
                    </Badge>

                    <div>
                      <h3 className="text-white font-extrabold text-lg md:text-xl line-clamp-2">
                        {banner.title}
                      </h3>

                      {banner.description && (
                        <p className="text-white/90 text-sm line-clamp-2">
                          {banner.description}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-white mt-2">
                        <span className="text-sm font-semibold">
                          {t('viewAll')}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="left-2 md:left-4 bg-white/90 shadow-xl" />
        <CarouselNext className="right-2 md:right-4 bg-white/90 shadow-xl" />
      </Carousel>
    </div>
  );
}
