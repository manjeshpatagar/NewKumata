'use client';

import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, Church, MapPin, GraduationCap, Wrench, Users, Drama, Building2, Stethoscope, Phone, Hotel, Car, Dumbbell, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { FloatingAddButton } from './FloatingAddButton';
import { useLanguage } from '../contexts/LanguageContext';

export function ExplorePage() {
  const router = useRouter();
  const { t } = useLanguage();

  const categories = [
    { id: 'shops', name: t('shops'), icon: ShoppingBag, color: 'bg-green-500 dark:bg-green-600', emoji: '🛍️' },
    { id: 'temples', name: t('temples'), icon: Church, color: 'bg-yellow-500 dark:bg-yellow-600', emoji: '🕌' },
    { id: 'tourism', name: t('tourism'), icon: MapPin, color: 'bg-blue-500 dark:bg-blue-600', emoji: '🗺️' },
    { id: 'schoolsColleges', name: t('schoolsColleges'), icon: GraduationCap, color: 'bg-purple-500 dark:bg-purple-600', emoji: '🎓' },
    { id: 'services', name: t('services'), icon: Wrench, color: 'bg-indigo-500 dark:bg-indigo-600', emoji: '🔧' },
    { id: 'associations', name: t('associations'), icon: Users, color: 'bg-pink-500 dark:bg-pink-600', emoji: '👥' },
    { id: 'culturalPrograms', name: t('culturalPrograms'), icon: Drama, color: 'bg-orange-500 dark:bg-orange-600', emoji: '🎭' },
    { id: 'departments', name: t('departments'), icon: Building2, color: 'bg-gray-500 dark:bg-gray-600', emoji: '🏢' },
    { id: 'doctors', name: t('doctors'), icon: Stethoscope, color: 'bg-red-500 dark:bg-red-600', emoji: '🩺' },
    { id: 'emergencyServices', name: t('emergencyServices'), icon: Phone, color: 'bg-red-600 dark:bg-red-700', emoji: '📞' },
    { id: 'hotels', name: t('hotels'), icon: Hotel, color: 'bg-cyan-500 dark:bg-cyan-600', emoji: '🏨' },
    { id: 'rentVehicles', name: t('rentVehicles'), icon: Car, color: 'bg-teal-500 dark:bg-teal-600', emoji: '🚗' },
    { id: 'sportsEquipments', name: t('sportsEquipments'), icon: Dumbbell, color: 'bg-lime-500 dark:bg-lime-600', emoji: '💪' },
  ];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col w-full max-w-7xl mx-auto bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="p-4 md:p-6 lg:p-8 border-b dark:border-gray-800 sticky top-0 z-10 bg-white dark:bg-gray-950">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="md:h-10 md:w-10"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
          <div>
            <h1 className="dark:text-white text-lg md:text-xl lg:text-2xl">{t('exploreNammaKumta')}</h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{t('discoverLocalPlaces')}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
          <Input
            placeholder={t('searchPlaceholder')}
            className="pl-10 md:pl-12 md:h-12 md:text-base"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 md:p-6 lg:p-8 pb-24 md:pb-28 lg:pb-32">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.id}
                  className={`${category.color} text-white p-4 md:p-5 lg:p-6 cursor-pointer hover:opacity-90 transition-opacity border-0 shadow-md`}
                  onClick={() => router.push(`/subcategory?categoryId=${category.id}&categoryName=${encodeURIComponent(category.name)}`)}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="text-3xl md:text-4xl lg:text-5xl mb-1">{category.emoji}</div>
                    <span className="text-xs md:text-sm lg:text-base leading-tight line-clamp-2">
                      {category.name}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </ScrollArea>

      {/* Floating Add Button */}
      <FloatingAddButton />
    </div>
  );
}