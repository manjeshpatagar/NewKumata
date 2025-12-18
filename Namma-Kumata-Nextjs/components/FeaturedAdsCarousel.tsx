'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Badge } from './ui/badge';
import { Heart, MapPin, Calendar, Tag, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useFavorites } from '../contexts/FavoritesContext';

interface FeaturedAdsCarouselProps {
  ads: Array<{
    id: string;
    title: string;
    category: string;
    price: string;
    image: string;
    location?: string;
    postedDate?: string;
    isFeatured?: boolean;
    isSponsored?: boolean;
  }>;
  onNavigate: (page: string, data?: any) => void;
}

export function FeaturedAdsCarousel({ ads, onNavigate }: FeaturedAdsCarouselProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const categoryColors: Record<string, { gradient: string; icon: any }> = {
    Bikes: { gradient: 'from-blue-500 to-cyan-600', icon: TrendingUp },
    Cars: { gradient: 'from-purple-500 to-pink-600', icon: Sparkles },
    Electronics: { gradient: 'from-indigo-500 to-blue-600', icon: Zap },
    Furniture: { gradient: 'from-amber-500 to-orange-600', icon: TrendingUp },
    'Home Rentals': { gradient: 'from-emerald-500 to-teal-600', icon: Sparkles },
    Jobs: { gradient: 'from-rose-500 to-red-600', icon: TrendingUp },
    Services: { gradient: 'from-violet-500 to-purple-600', icon: Zap },
  };

  const handleFavoriteClick = (e: React.MouseEvent, ad: any) => {
    e.stopPropagation();
    toggleFavorite({
      id: ad.id,
      type: 'ad',
      data: ad,
    });
  };

  return (
    <div className="relative">
      <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
        <CarouselContent className="-ml-2 md:-ml-3">
          {ads.map((ad, index) => {
            const favorited = isFavorite(ad.id);
            const categoryConfig = categoryColors[ad.category] || { 
              gradient: 'from-gray-500 to-gray-600',
              icon: Tag 
            };
            const IconComponent = categoryConfig.icon;
            
            return (
              <CarouselItem 
                key={ad.id} 
                className="pl-2 md:pl-3 basis-[85%] xs:basis-[75%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div
                  className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 dark:border-gray-800 hover:scale-[1.03] active:scale-[0.98]"
                  onClick={() => onNavigate('ad-detail', { ad })}
                >
                  {/* Image Section */}
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <ImageWithFallback
                      src={ad.image}
                      alt={ad.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* Shine Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                      <div className="flex flex-col gap-2">
                        {/* Featured Badge */}
                        {ad.isFeatured && (
                          <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 shadow-lg backdrop-blur-sm flex items-center gap-1 animate-pulse">
                            <Sparkles className="w-3 h-3" />
                            Featured
                          </Badge>
                        )}
                        
                        {/* Sponsored Badge */}
                        {ad.isSponsored && (
                          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg backdrop-blur-sm flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Sponsored
                          </Badge>
                        )}
                      </div>
                      
                      {/* Favorite Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm rounded-full h-9 w-9 transition-all hover:scale-110 shadow-lg"
                        onClick={(e) => handleFavoriteClick(e, ad)}
                      >
                        <Heart
                          className={`w-4 h-4 transition-all duration-300 ${
                            favorited 
                              ? 'fill-red-500 text-red-500 scale-110' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        />
                      </Button>
                    </div>

                    {/* Price Badge (Bottom of Image) */}
                    <div className="absolute bottom-3 left-3">
                      <div className={`bg-gradient-to-r ${categoryConfig.gradient} rounded-full px-4 py-2 shadow-lg`}>
                        <span className="text-white font-bold text-base md:text-lg">{ad.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 space-y-3">
                    {/* Category Badge */}
                    <Badge className={`bg-gradient-to-r ${categoryConfig.gradient} text-white border-0 shadow-sm`}>
                      <IconComponent className="w-3 h-3 mr-1" />
                      {ad.category}
                    </Badge>

                    {/* Title */}
                    <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 min-h-[3rem]">
                      {ad.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 flex-wrap">
                      {ad.location && (
                        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-lg px-2.5 py-1.5">
                          <MapPin className="w-3 h-3 text-purple-500" />
                          <span className="font-medium">{ad.location}</span>
                        </div>
                      )}
                      
                      {ad.postedDate && (
                        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-lg px-2.5 py-1.5">
                          <Calendar className="w-3 h-3 text-blue-500" />
                          <span className="font-medium">{ad.postedDate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Border Glow on Hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-500/30 transition-colors duration-300" />
                  
                  {/* Hot Deal Corner Ribbon for First 3 */}
                  {index < 3 && (
                    <div className="absolute -top-1 -right-1">
                      <div className="relative">
                        <div className={`bg-gradient-to-br ${categoryConfig.gradient} text-white text-[10px] font-bold px-3 py-1 shadow-lg`} 
                             style={{ 
                               clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)'
                             }}>
                          HOT
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        
        {/* Styled Navigation Buttons */}
        <CarouselPrevious className="left-1 md:left-2 bg-white/95 dark:bg-gray-900/95 border-0 shadow-xl hover:bg-white dark:hover:bg-gray-800 transition-all hover:scale-110 backdrop-blur-sm" />
        <CarouselNext className="right-1 md:right-2 bg-white/95 dark:bg-gray-900/95 border-0 shadow-xl hover:bg-white dark:hover:bg-gray-800 transition-all hover:scale-110 backdrop-blur-sm" />
      </Carousel>
    </div>
  );
}