'use client';

import { useRouter } from 'next/navigation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

export function BrandingBanners({ latestAds = [] }: { latestAds: any[] }) {
  const router = useRouter();
  const { t } = useLanguage();

  if (!latestAds || latestAds.length === 0) return null; // No ads → hide section

  return (
    <div className="p-4 pt-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="dark:text-white text-2xl">{t("latestAds")}</h3>
        <Badge variant="secondary" className="text-xs">
          {t("new")}
        </Badge>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {latestAds.map((ad) => (
            <CarouselItem key={ad._id}>
              <Card
                className="overflow-hidden cursor-pointer border-2 border-blue-400 dark:border-blue-600 hover:shadow-lg transition-shadow"
                onClick={() => {
                  sessionStorage.setItem("currentAd", JSON.stringify(ad));
                  router.push(`/ads/${ad._id}`);
                }}
              >
                {/* Image Section */}
                <div className="relative h-40 bg-gray-200 dark:bg-gray-800">
                  {ad.images?.[0] && (
                    <>
                      <ImageWithFallback
                        src={ad.images[0]}
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    </>
                  )}

                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-center p-4 text-white">
                    <Badge className="mb-2 bg-blue-600 text-white w-fit">
                      {ad.badges}
                    </Badge>

                    <h3 className="text-lg mb-1 line-clamp-1">{ad.title}</h3>
                    <p className="text-sm opacity-90 line-clamp-2">{ad.description}</p>

                    <p className="text-xs mt-2 opacity-75">
                      {ad.category?.name || t("unknownCategory")}
                    </p>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}
