import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

interface BrandingBannersProps {
  onNavigate: (page: string, data?: any) => void;
}

export function BrandingBanners({ onNavigate }: BrandingBannersProps) {
  const { t } = useLanguage();

  const brandingBanners = [
    {
      id: '1',
      title: 'New Showroom Opening - Electronics Mega Store',
      subtitle: 'Grand Opening - 25% Off on All Items',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      color: 'from-blue-600 to-purple-600',
      brandName: 'Electronics Mega Store',
    },
    {
      id: '2',
      title: 'Diwali Festival Offers',
      subtitle: 'Up to 50% Off - Limited Time Only',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
      color: 'from-orange-600 to-yellow-600',
      brandName: 'Kumta Shopping Festival',
    },
    {
      id: '3',
      title: 'Royal Enfield Showroom',
      subtitle: 'Test Ride Your Dream Bike Today',
      image: 'https://images.unsplash.com/photo-1558980663-3685c1d673c4?w=800',
      color: 'from-red-600 to-pink-600',
      brandName: 'Royal Enfield Kumta',
    },
  ];

  return (
    <div className="p-4 pt-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="dark:text-white">{t('sponsoredBrands')}</h3>
        <Badge variant="secondary" className="text-xs">
          {t('premium')}
        </Badge>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent>
          {brandingBanners.map((banner) => (
            <CarouselItem key={banner.id}>
              <Card 
                className="overflow-hidden cursor-pointer border-2 border-purple-400 dark:border-purple-600 hover:shadow-lg transition-shadow"
                onClick={() => {
                  // Navigate to brand detail page or external link
                  console.log('Brand clicked:', banner.brandName);
                }}
              >
                <div className={`relative h-40 bg-gradient-to-r ${banner.color}`}>
                  {banner.image && (
                    <>
                      <ImageWithFallback
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    </>
                  )}
                  <div className="absolute inset-0 flex flex-col justify-center p-4 text-white">
                    <Badge className="mb-2 bg-purple-600 text-white w-fit">
                      ⭐ {t('premiumBrand')}
                    </Badge>
                    <h3 className="text-lg mb-1">{banner.title}</h3>
                    <p className="text-sm opacity-90">{banner.subtitle}</p>
                    <p className="text-xs mt-2 opacity-75">{banner.brandName}</p>
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
