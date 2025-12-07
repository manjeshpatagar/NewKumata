'use client';

import { useState } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, MapPin, Calendar, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { useLanguage } from '../contexts/LanguageContext';
import { mockAdvertisements, adTypes } from '../lib/advertisementData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AdCategoryPageProps {
  categoryId: string;
  categoryName: string;
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
}

export function AdCategoryPage({ categoryId, categoryName, onBack, onNavigate }: AdCategoryPageProps) {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');

  // Filter ads by category
  const categoryAds = mockAdvertisements.filter(ad => ad.category === categoryId && ad.approved);

  const AdCard = ({ ad }: { ad: any }) => (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow dark:bg-gray-900 dark:border-gray-800"
      onClick={() => onNavigate('ad-detail', { ad })}
    >
      {ad.images && ad.images.length > 0 && (
        <div className="relative h-40 bg-gray-100 dark:bg-gray-800">
          <ImageWithFallback
            src={ad.images[0]}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
          {ad.featured && (
            <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
              {t('featured')}
            </Badge>
          )}
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="flex-1 line-clamp-2 dark:text-white">{ad.title}</h3>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {adTypes.find(t => t.id === ad.type)?.label}
          </Badge>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {ad.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-blue-600 dark:text-blue-400">
            {ad.price}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <MapPin className="w-3 h-3" />
            <span className="line-clamp-1">{ad.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 pt-3 border-t dark:border-gray-800">
          <Calendar className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(ad.postedOn).toLocaleDateString()}
          </span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {ad.postedBy}
          </span>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col max-w-md mx-auto bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="dark:text-white">{categoryName}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {categoryAds.length} {t('adsAvailable')}
            </p>
          </div>

          {/* Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{t('filters')}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm mb-2 block">{t('adType')}</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('all')}</SelectItem>
                      {adTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm mb-2 block">{t('priceRange')}</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('all')}</SelectItem>
                      <SelectItem value="low">Under ₹10,000</SelectItem>
                      <SelectItem value="medium">₹10,000 - ₹50,000</SelectItem>
                      <SelectItem value="high">Above ₹50,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder={`${t('search')} ${categoryName.toLowerCase()}...`}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 pb-20 space-y-3">
          {categoryAds.length > 0 ? (
            categoryAds.map((ad) => <AdCard key={ad.id} ad={ad} />)
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Tag className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>{t('noAdsFound')}</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}