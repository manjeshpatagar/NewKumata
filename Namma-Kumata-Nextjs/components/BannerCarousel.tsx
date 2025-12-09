'use client';

import { useRouter } from 'next/navigation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, MapPin, Tag, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

export function BannerCarousel() {
  const router = useRouter();
  const { t } = useLanguage();

  const banners = [
    {
      id: 1,
      title: 'Sri Mahaganapathi Temple Festival',
      description: 'Annual festival celebration starting next week',
      image: 'https://images.unsplash.com/photo-1668770109988-24fe041e6b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjA0MjM0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'event',
      badge: 'Upcoming',
      icon: Calendar,
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 2,
      title: 'Featured: Rajesh General Store',
      description: 'Special discount on grocery items - 20% off',
      image: 'https://images.unsplash.com/photo-1754398006556-bedbc3b74bf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA0MjM0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'shop',
      badge: 'Featured',
      icon: Sparkles,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 3,
      title: 'Explore Kumta Tourism',
      description: 'Discover beautiful beaches and heritage sites',
      image: 'https://images.unsplash.com/photo-1691348293238-a5974ac44619?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0b3VyaXNtJTIwbGFuZG1hcmt8ZW58MXx8fHwxNzYwNDIzNDY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'tourism',
      badge: 'Trending',
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-600',
    },
  ];

  return (
    <div className="relative px-4 md:px-6 lg:px-8">
      <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
        <CarouselContent className="-ml-2 md:-ml-3">
          {banners.map((banner) => {
            const IconComponent = banner.icon;
            return (
              <CarouselItem key={banner.id} className="pl-2 md:pl-3 basis-full md:basis-1/2 lg:basis-1/3">
                <div 
                  className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => router.push('/categories')}
                >
                  {/* Image */}
                  <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden">
                    <ImageWithFallback
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                    
                    {/* Shine Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
                    {/* Badge */}
                    <div className="flex items-start">
                      <Badge className={`bg-gradient-to-r ${banner.color} text-white border-0 shadow-lg backdrop-blur-sm flex items-center gap-1.5 animate-in fade-in slide-in-from-top duration-300`}>
                        <IconComponent className="w-3 h-3" />
                        {banner.badge}
                      </Badge>
                    </div>

                    {/* Bottom Content */}
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <h3 className="text-white font-extrabold text-lg md:text-xl lg:text-2xl leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] line-clamp-2 transition-transform duration-300 group-hover:translate-x-1">
                          {banner.title}
                        </h3>
                        <p className="text-white/90 text-sm md:text-base drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] line-clamp-2 transition-transform duration-300 group-hover:translate-x-1">
                          {banner.description}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center gap-2 text-white transition-all duration-300 group-hover:gap-3">
                        <span className="text-sm md:text-base font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                          {t('viewAll')}
                        </span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>

                  {/* Border Glow on Hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-colors duration-300" />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        
        {/* Custom Navigation Buttons */}
        <CarouselPrevious className="left-2 md:left-4 bg-white/90 dark:bg-gray-900/90 border-0 shadow-xl hover:bg-white dark:hover:bg-gray-800 transition-all hover:scale-110" />
        <CarouselNext className="right-2 md:right-4 bg-white/90 dark:bg-gray-900/90 border-0 shadow-xl hover:bg-white dark:hover:bg-gray-800 transition-all hover:scale-110" />
      </Carousel>
    </div>
  );
}
