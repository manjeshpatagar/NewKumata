'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Map, List as ListIcon, Star, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FloatingAddButton } from './FloatingAddButton';
import { useLanguage } from '../contexts/LanguageContext';
import { getListings } from '../lib/mockListingsData';
import { getSubcategoriesWithImages } from '../lib/subcategoryImages';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CategoryListingsPageProps {
  categoryId: string;
  categoryName: string;
  subcategory: string;
}

export function CategoryListingsPage({
  categoryId,
  categoryName,
  subcategory,
}: CategoryListingsPageProps) {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Get listings based on current language
  const listings = getListings(language).map(listing => ({
    ...listing,
    specialty: subcategory,
    category: categoryName,
  }));

  // Get subcategory info (image and icon)
  const subcategories = getSubcategoriesWithImages(categoryId);
  const subcategoryInfo = subcategories.find(sub => sub.name === subcategory);

  const ListingCard = ({ listing }: { listing: any }) => (
    <Card
      className="p-4 md:p-5 lg:p-6 cursor-pointer hover:shadow-lg transition-shadow dark:bg-gray-900 dark:border-gray-800"
      onClick={() => {
        sessionStorage.setItem('currentListing', JSON.stringify(listing));
        router.push('/detail');
      }}
    >
      <div className="flex gap-3 md:gap-4">
        <Avatar className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
          <AvatarImage src={listing.image} />
          <AvatarFallback className="bg-blue-600 text-white text-lg md:text-xl lg:text-2xl">
            {listing.name.split(' ').map((n: string) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h3 className="mb-1 dark:text-white text-base md:text-lg lg:text-xl">{listing.name}</h3>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-1 md:mb-2">
            {listing.businessName}
          </p>
          <Badge variant="secondary" className="text-xs md:text-sm mb-2">
            {t(listing.specialty)}
          </Badge>
          
          <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
              <span>{listing.rating}</span>
              <span>({listing.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 md:w-4 md:h-4" />
              <span>{listing.distance}</span>
            </div>
          </div>
        </div>

        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 md:h-10 md:w-10"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`tel:${listing.phone}`);
          }}
        >
          <Phone className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </div>
      
      <div className="mt-3 md:mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
        <MapPin className="w-3 h-3 md:w-4 md:h-4" />
        <span>{listing.address}</span>
      </div>
    </Card>
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col w-full max-w-7xl mx-auto bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="p-4 md:p-6 lg:p-8 border-b dark:border-gray-800 sticky top-0 z-10 bg-white dark:bg-gray-950">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="md:h-10 md:w-10">
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
          
          {/* Subcategory Image/Icon */}
          {subcategoryInfo && (
            subcategoryInfo.image ? (
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                <ImageWithFallback
                  src={subcategoryInfo.image}
                  alt={subcategory}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 right-0 text-2xl p-1 leading-none">{subcategoryInfo.icon}</div>
              </div>
            ) : (
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl shadow-md flex-shrink-0">
                {subcategoryInfo.icon || '📍'}
              </div>
            )
          )}
          
          <div className="flex-1">
            <h1 className="dark:text-white text-lg md:text-xl lg:text-2xl">{t(subcategory)}</h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              {listings.length} {t('results')} {t('inKumta')}
            </p>
          </div>

          {/* View Toggle */}
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'list' | 'map')}>
            <TabsList className="grid w-24 md:w-28 grid-cols-2 md:h-10">
              <TabsTrigger value="list" className="p-1">
                <ListIcon className="w-4 h-4 md:w-5 md:h-5" />
              </TabsTrigger>
              <TabsTrigger value="map" className="p-1">
                <Map className="w-4 h-4 md:w-5 md:h-5" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
          <Input
            placeholder={`${t('search')} ${t(subcategory)}...`}
            className="pl-10 md:pl-12 md:h-12 md:text-base"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {viewMode === 'list' ? (
          <div className="p-4 md:p-6 lg:p-8 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="h-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <Map className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto mb-2 md:mb-4" />
              <p className="md:text-lg">{t('mapView')}</p>
              <p className="text-xs md:text-sm mt-1">{t('showingNearbyLocations')}</p>
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Floating Add Button */}
      <FloatingAddButton />
    </div>
  );
}