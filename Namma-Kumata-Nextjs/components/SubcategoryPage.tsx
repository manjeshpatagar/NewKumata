'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { FloatingAddButton } from './FloatingAddButton';
import { useLanguage } from '../contexts/LanguageContext';
import { getSubcategoriesWithImages } from '../lib/subcategoryImages';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SubcategoryPageProps {
  categoryId: string;
  categoryName: string;
}

export function SubcategoryPage({ categoryId, categoryName }: SubcategoryPageProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const subcategories = getSubcategoriesWithImages(categoryId);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-gray-950">
      {/* Header - Sticky with full width container */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()}
              className="h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl lg:text-3xl dark:text-white truncate">{categoryName}</h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                {subcategories.length} {t('subcategories')}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            <Input
              placeholder={`${t('searchFor')} ${categoryName.toLowerCase()}...`}
              className="pl-10 md:pl-12 h-11 md:h-12 rounded-xl text-sm md:text-base"
            />
          </div>
        </div>
      </div>

      {/* Content Area with Responsive Grid */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 pb-24 md:pb-32">
          {/* Responsive Grid: 
              - Mobile: 2 columns
              - Small tablets: 3 columns  
              - Tablets: 4 columns
              - Desktop: 4 columns
              - Large Desktop: 5 columns
              - Extra Large: 6 columns
          */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {subcategories.map((subcategory, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 dark:bg-gray-900 dark:border-gray-800 overflow-hidden hover:scale-105 active:scale-95"
                onClick={() => router.push(
                  `/category-listings?categoryId=${categoryId}&categoryName=${encodeURIComponent(categoryName)}&subcategory=${encodeURIComponent(subcategory.name)}`
                )}
              >
                {/* Image Section */}
                {subcategory.image ? (
                  <div className="relative aspect-[4/3] md:aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={subcategory.image}
                      alt={subcategory.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Strong Gradient Overlay for Better Text Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 transition-colors duration-300"></div>
                    
                    {/* Icon Badge - Top Right */}
                    <div className="absolute top-2 md:top-3 right-2 md:right-3 text-xl sm:text-2xl md:text-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-300">
                      {subcategory.icon}
                    </div>
                    
                    {/* Text with Strong Background */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1.5 md:px-3 md:py-2">
                        <h3 
                          className="text-white text-xs sm:text-sm md:text-base line-clamp-2 leading-tight" 
                          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.9)' }}
                        >
                          {t(subcategory.name)}
                        </h3>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                ) : (
                  /* Fallback to Icon-only Card */
                  <div className="aspect-[4/3] md:aspect-video p-4 md:p-6 bg-gradient-to-br from-blue-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-300">
                    <div className="flex flex-col items-center justify-center text-center gap-2 h-full">
                      <div className="text-3xl sm:text-4xl md:text-5xl mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">
                        {subcategory.icon || '📍'}
                      </div>
                      <h3 
                        className="text-xs sm:text-sm md:text-base text-white line-clamp-2 leading-tight px-2" 
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                      >
                        {t(subcategory.name)}
                      </h3>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Floating Add Button */}
      <FloatingAddButton />
    </div>
  );
}