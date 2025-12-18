'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import type { CarouselApi } from './ui/carousel';

export function BrandingBanners({ latestAds = [] }: { latestAds: any[] }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [api, setApi] = useState<CarouselApi | null>(null);

  if (!latestAds.length) return null;

  /* --------------------------
      AUTO SCROLL (EMBLA)
  --------------------------- */
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="px-3 sm:px-4">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
          {t('latestAds')}
        </h3>
        <Badge variant="secondary" className="text-xs">
          {t('new')}
        </Badge>
      </div>

      {/* CAROUSEL */}
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {latestAds.map((ad) => (
            <CarouselItem key={ad._id} className="basis-full">
              <Card
                className="overflow-hidden rounded-xl cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => {
                  sessionStorage.setItem('currentAd', JSON.stringify(ad));
                  router.push(`/ads/${ad._id}`);
                }}
              >
                {/* IMAGE */}
                <div className="
                  relative 
                  h-[180px] 
                  sm:h-[240px] 
                  md:h-[300px] 
                  lg:h-[360px]
                  bg-gray-200
                ">
                  <ImageWithFallback
                    src={ad.images?.[0]}
                    alt={ad.title}
                    className="w-full h-full object-cover"
                  />

                  {/* GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                  {/* TEXT */}
                  <div className="absolute bottom-0 p-3 sm:p-5 text-white max-w-[90%]">
                    {ad.badges && (
                      <Badge className="mb-2 bg-blue-600 text-white">
                        {ad.badges}
                      </Badge>
                    )}

                    <h3 className="text-base sm:text-lg md:text-xl font-semibold line-clamp-1">
                      {ad.title}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-base opacity-90 line-clamp-2">
                      {ad.description}
                    </p>

                    <p className="text-[11px] sm:text-xs mt-1 opacity-75">
                      {ad.category?.name || t('unknownCategory')}
                    </p>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* NAV (hidden on mobile, visible desktop) */}
        <CarouselPrevious className="hidden sm:flex left-2" />
        <CarouselNext className="hidden sm:flex right-2" />
      </Carousel>
    </div>
  );
}
