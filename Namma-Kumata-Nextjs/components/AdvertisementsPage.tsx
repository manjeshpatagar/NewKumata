'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, SlidersHorizontal, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { adCategories, mockAdvertisements } from '../lib/advertisementData';
import { BrandingBanners } from './BrandingBanners';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Calendar, Heart, Phone } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { toast } from 'sonner';

export function AdvertisementsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated, isGuest } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFavoriteToggle = (ad: any) => {
    if (!isAuthenticated && !isGuest) {
      toast.info('Please login to add favorites');
      router.push('/auth/login');
      return;
    }
    toggleFavorite({ id: ad.id, type: 'ad', data: ad });
  };

  const categories = [
    { id: 'all', label: t('all') },
    ...adCategories.map(cat => ({ id: cat.id, label: cat.name }))
  ];

  // Filter ads
  const filteredAds = mockAdvertisements.filter(ad => {
    const matchesCategory = selectedCategory === 'all' || ad.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchQuery.toLowerCase());
    const isApproved = ad.approved;
    return matchesCategory && matchesSearch && isApproved;
  });

  // Featured ads for carousel
  const featuredAds = mockAdvertisements.filter(ad => ad.featured && ad.approved);

  // Get category info
  const getCategoryInfo = (categoryId: string) => {
    return adCategories.find(cat => cat.id === categoryId);
  };

  // Ad Card Component
  const AdCard = ({ ad }: { ad: any }) => {
    const categoryInfo = getCategoryInfo(ad.category);
    const isLiked = isFavorite(ad.id);

    return (
      <Card
        className={`relative group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-transparent transition-all duration-300 hover:-translate-y-1 ${ad.sponsored ? 'ring-2 ring-yellow-500 dark:ring-yellow-600' : ''
          }`}
        onClick={() => {
          sessionStorage.setItem('currentAd', JSON.stringify(ad));
          router.push('/ad-detail');
        }}
      >
        {/* Sponsored Badge */}
        {ad.sponsored && (
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-3 py-1 flex items-center gap-1">
            <span className="text-xs text-white">⭐ {t('sponsored')}</span>
          </div>
        )}

        {/* Image */}
        {ad.images && ad.images.length > 0 && (
          <div className="relative h-40 bg-gray-100 dark:bg-gray-800">
            <ImageWithFallback
              src={ad.images[0]}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
            {ad.featured && !ad.sponsored && (
              <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                {t('featured')}
              </Badge>
            )}
          </div>
        )}

        <div className="p-3">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="secondary"
              className={`text-xs ${categoryInfo?.color} text-white border-0`}
            >
              {categoryInfo?.emoji} {categoryInfo?.name}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="mb-1 line-clamp-1 dark:text-white">{ad.title}</h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {ad.description}
          </p>

          {/* Price */}
          <div className="text-blue-600 dark:text-blue-400 mb-2">
            {ad.price || ad.salary || 'Contact for details'}
          </div>

          {/* Location & Time */}
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="line-clamp-1">{ad.location}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(ad.postedOn).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                sessionStorage.setItem('currentAd', JSON.stringify(ad));
                router.push('/ad-detail');
              }}
            >
              {t('viewDetails')}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteToggle(ad);
              }}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`tel:${ad.phone}`);
              }}
            >
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col w-full max-w-7xl mx-auto bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="p-4 md:p-6 lg:p-8 border-b dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-10">
        <div className="flex items-center gap-3 md:gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/')}
            className="md:h-10 md:w-10"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>

          <div className="flex-1">
            <h1 className="dark:text-white text-lg md:text-xl lg:text-2xl">📢 {t('advertisements')}</h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {filteredAds.length} {t('adsAvailable')}
            </p>
          </div>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 md:px-6"
            onClick={() => router.push('/add-advertisement')}
          >
            <Plus className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">{t('postAd')}</span>
            <span className="sm:hidden">+</span>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder={t('searchAds')}
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={() => {/* Open filters */ }}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="mt-3 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={`cursor-pointer whitespace-nowrap text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 ${selectedCategory === category.id ? 'bg-blue-600 dark:bg-blue-500' : ''
                  }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="pb-24 md:pb-28 lg:pb-32">
          {/* Branding Banners */}
          <div className="mb-4 md:mb-6">
            <BrandingBanners />
          </div>

          {/* Featured Advertisements Carousel */}
          {featuredAds.length > 0 && (
            <div className="px-4 md:px-6 lg:px-8 mb-4 md:mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🔥</span>
                <h2 className="dark:text-white">{t('featuredAds')}</h2>
              </div>

              <Carousel className="w-full">
                <CarouselContent>
                  {featuredAds.map((ad) => {
                    const categoryInfo = getCategoryInfo(ad.category);
                    return (
                      <CarouselItem key={ad.id}>
                        <Card
                          className="overflow-hidden cursor-pointer dark:bg-gray-900 dark:border-gray-800"
                          onClick={() => {
          sessionStorage.setItem('currentAd', JSON.stringify(ad));
          router.push('/ad-detail');
        }}
                        >
                          {ad.images && ad.images.length > 0 && (
                            <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                              <ImageWithFallback
                                src={ad.images[0]}
                                alt={ad.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2">
                                <Badge className="bg-yellow-500 text-white">
                                  {t('featured')}
                                </Badge>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                <Badge
                                  className={`${categoryInfo?.color} text-white border-0 mb-2`}
                                >
                                  {categoryInfo?.emoji} {categoryInfo?.name}
                                </Badge>
                                <h3 className="text-white mb-1">{ad.title}</h3>
                                <p className="text-sm text-white/90 line-clamp-2">
                                  {ad.description}
                                </p>
                              </div>
                            </div>
                          )}
                        </Card>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          )}

          {/* Main Feed */}
          <div className="px-4 md:px-6 lg:px-8">
            <h2 className="mb-3 md:mb-4 dark:text-white text-lg md:text-xl">{t('allAdvertisements')}</h2>

            {filteredAds.length === 0 && searchQuery === '' && selectedCategory === 'all' && (
              <Card className="p-6 text-center mb-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-dashed">
                <div className="text-4xl mb-3">📢</div>
                <h3 className="mb-2 dark:text-white">{t('noAdsYet')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {t('beFirstToPost')}
                </p>
                <Button
                  onClick={() => router.push('/add-advertisement')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t('postYourFirstAd')}
                </Button>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
              {filteredAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>

            {filteredAds.length === 0 && (searchQuery !== '' || selectedCategory !== 'all') && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p>{t('noAdsFound')}</p>
                <p className="text-sm mt-2">{t('tryDifferentSearch')}</p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}