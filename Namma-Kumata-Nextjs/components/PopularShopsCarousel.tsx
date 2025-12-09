'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Badge } from './ui/badge';
import { Star, MapPin, Heart, TrendingUp, Award, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useFavorites } from '../contexts/FavoritesContext';

interface PopularShopsCarouselProps {
  shops: Array<{
    id: string;
    name: string;
    category: string;
    image: string;
    rating: number;
    reviewCount: number;
    distance?: string;
    isNew?: boolean;
  }>;
  onNavigate: (page: string, data?: any) => void;
}

export function PopularShopsCarousel({ shops, onNavigate }: PopularShopsCarouselProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const categoryColors: Record<string, { bg: string; text: string; gradient: string }> = {
    Grocery: { 
      bg: 'bg-emerald-100 dark:bg-emerald-900/30', 
      text: 'text-emerald-700 dark:text-emerald-400',
      gradient: 'from-emerald-500 to-teal-600'
    },
    Medical: { 
      bg: 'bg-red-100 dark:bg-red-900/30', 
      text: 'text-red-700 dark:text-red-400',
      gradient: 'from-red-500 to-rose-600'
    },
    Temple: { 
      bg: 'bg-amber-100 dark:bg-amber-900/30', 
      text: 'text-amber-700 dark:text-amber-400',
      gradient: 'from-amber-500 to-orange-600'
    },
    Tourism: { 
      bg: 'bg-blue-100 dark:bg-blue-900/30', 
      text: 'text-blue-700 dark:text-blue-400',
      gradient: 'from-blue-500 to-indigo-600'
    },
    Furniture: { 
      bg: 'bg-purple-100 dark:bg-purple-900/30', 
      text: 'text-purple-700 dark:text-purple-400',
      gradient: 'from-purple-500 to-pink-600'
    },
    Services: { 
      bg: 'bg-indigo-100 dark:bg-indigo-900/30', 
      text: 'text-indigo-700 dark:text-indigo-400',
      gradient: 'from-indigo-500 to-blue-600'
    },
  };

  const handleFavoriteClick = (e: React.MouseEvent, shop: any) => {
    e.stopPropagation();
    toggleFavorite({
      id: shop.id,
      type: 'listing',
      data: shop,
    });
  };

  return (
    <div className="relative">
      <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
        <CarouselContent className="-ml-2 md:-ml-3">
          {shops.map((shop, index) => {
            const favorited = isFavorite(shop.id);
            const colors = categoryColors[shop.category] || { 
              bg: 'bg-gray-100 dark:bg-gray-900/30', 
              text: 'text-gray-700 dark:text-gray-400',
              gradient: 'from-gray-500 to-gray-600'
            };
            
            return (
              <CarouselItem 
                key={shop.id} 
                className="pl-2 md:pl-3 basis-[85%] xs:basis-[75%] sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div
                  className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 dark:border-gray-800 hover:scale-[1.03] active:scale-[0.98]"
                  onClick={() => onNavigate('detail', { listing: shop })}
                >
                  {/* Image Section */}
                  <div className="relative h-44 md:h-48 overflow-hidden">
                    <ImageWithFallback
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Shine Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                      <div className="flex flex-col gap-2">
                        {/* Category Badge */}
                        <Badge className={`${colors.bg} ${colors.text} border-0 shadow-lg backdrop-blur-sm`}>
                          {shop.category}
                        </Badge>
                        
                        {/* New Badge */}
                        {shop.isNew && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg animate-in fade-in slide-in-from-left duration-300 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            New
                          </Badge>
                        )}
                      </div>
                      
                      {/* Favorite Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm rounded-full h-9 w-9 transition-all hover:scale-110 shadow-lg"
                        onClick={(e) => handleFavoriteClick(e, shop)}
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

                    {/* Rating Badge (Bottom of Image) */}
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-sm">{shop.rating}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">({shop.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 space-y-3">
                    {/* Shop Name */}
                    <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {shop.name}
                    </h3>

                    {/* Distance */}
                    {shop.distance && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-500" />
                          <span className="font-medium">{shop.distance}</span>
                        </div>
                        
                        {/* Top Rated Indicator */}
                        {shop.rating >= 4.5 && (
                          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg px-2.5 py-1.5 border border-yellow-200 dark:border-yellow-800/30">
                            <Award className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-500" />
                            <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-500">Top</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Border Glow on Hover */}
                  <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/30 transition-colors duration-300`} />
                  
                  {/* Rank Number for Top 3 */}
                  {index < 3 && (
                    <div className="absolute top-3 right-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
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
