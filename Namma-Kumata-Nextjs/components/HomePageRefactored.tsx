'use client';

import { Search, ShoppingBag, Church, MapPin, GraduationCap, Wrench, Users, Drama, Building2, Stethoscope, Phone, Hotel, Car, Dumbbell } from 'lucide-react';
import { useState } from 'react';
import { WeatherWidget } from './WeatherWidget';
import { ListingCard } from './ListingCard';
import { AdCard } from './AdCard';
import { EmergencyContactCard } from './EmergencyContactCard';
import { LanguageSelector } from './LanguageSelector';
import { LocationSelector } from './LocationSelector';
import { BannerCarousel } from './BannerCarousel';
import { EventCard } from './EventCard';
import { NearbyCard } from './NearbyCard';
import { FloatingAddButton } from './FloatingAddButton';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { SectionHeader } from './common/SectionHeader';
import { ResponsiveContainer } from './layouts/ResponsiveContainer';
import { ResponsiveGrid } from './common/ResponsiveGrid';
import { FeaturedSection } from './sections/FeaturedSection';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageRefactoredProps {
  onNavigate: (page: string, data?: any) => void;
}

export function HomePageRefactored({ onNavigate }: HomePageRefactoredProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'shops', name: t('shops'), icon: ShoppingBag, color: 'bg-green-500 dark:bg-green-600' },
    { id: 'temples', name: t('temples'), icon: Church, color: 'bg-yellow-500 dark:bg-yellow-600' },
    { id: 'tourism', name: t('tourism'), icon: MapPin, color: 'bg-blue-500 dark:bg-blue-600' },
    { id: 'schoolsColleges', name: t('schoolsColleges'), icon: GraduationCap, color: 'bg-purple-500 dark:bg-purple-600' },
    { id: 'services', name: t('services'), icon: Wrench, color: 'bg-indigo-500 dark:bg-indigo-600' },
    { id: 'associations', name: t('associations'), icon: Users, color: 'bg-pink-500 dark:bg-pink-600' },
    { id: 'culturalPrograms', name: t('culturalPrograms'), icon: Drama, color: 'bg-orange-500 dark:bg-orange-600' },
    { id: 'departments', name: t('departments'), icon: Building2, color: 'bg-gray-500 dark:bg-gray-600' },
    { id: 'doctors', name: t('doctors'), icon: Stethoscope, color: 'bg-red-500 dark:bg-red-600' },
    { id: 'emergencyServices', name: t('emergencyServices'), icon: Phone, color: 'bg-red-600 dark:bg-red-700' },
    { id: 'hotels', name: t('hotels'), icon: Hotel, color: 'bg-cyan-500 dark:bg-cyan-600' },
    { id: 'rentVehicles', name: t('rentVehicles'), icon: Car, color: 'bg-teal-500 dark:bg-teal-600' },
    { id: 'sportsEquipments', name: t('sportsEquipments'), icon: Dumbbell, color: 'bg-lime-500 dark:bg-lime-600' },
  ];

  const popularShops = [
    {
      id: '1',
      name: 'Rajesh General Store',
      category: 'Grocery',
      image: 'https://images.unsplash.com/photo-1754398006556-bedbc3b74bf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA0MjM0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.5,
      reviewCount: 128,
      distance: '0.5 km',
      isNew: false,
    },
    {
      id: '2',
      name: 'Kumta Medical Store',
      category: 'Medical',
      image: 'https://images.unsplash.com/photo-1758573467057-955f803660a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcGhhcm1hY3l8ZW58MXx8fHwxNzYwMzU0OTEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviewCount: 95,
      distance: '1.2 km',
      isNew: true,
    },
    {
      id: '3',
      name: 'Premium Furniture',
      category: 'Furniture',
      image: 'https://images.unsplash.com/photo-1680503397090-0483be73406f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBzdG9yZXxlbnwxfHx8fDE3NjAzNDg1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.3,
      reviewCount: 67,
      distance: '2.0 km',
      isNew: false,
    },
  ];

  const featuredAds = [
    {
      id: '1',
      title: 'Honda Activa 2020',
      category: 'Bikes',
      description: 'Excellent condition, single owner',
      price: '₹45,000',
      image: 'https://images.unsplash.com/photo-1691426830923-d9dd3461a5c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwYmlrZSUyMHZlaGljbGV8ZW58MXx8fHwxNzYwNDIzNzU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Kumta',
      postedDate: '2 days ago',
      status: 'active' as const,
      isFeatured: true,
    },
    {
      id: '2',
      title: '2BHK House for Rent',
      category: 'Home Rentals',
      description: 'Spacious with parking',
      price: '₹8,000/month',
      image: 'https://images.unsplash.com/photo-1693948458360-c05c436177a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGhvbWUlMjByZW50YWx8ZW58MXx8fHwxNzYwNDIzNzU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      location: 'Kumta',
      postedDate: '1 week ago',
      status: 'active' as const,
      isFeatured: true,
    },
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Kumta Food Festival 2024',
      date: 'Dec 15-17, 2024',
      location: 'Town Hall',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZmVzdGl2YWx8ZW58MXx8fHwxNzYwMzU0OTEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      title: 'Beach Cleanup Drive',
      date: 'Dec 20, 2024',
      location: 'Kumta Beach',
      image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGNsZWFudXB8ZW58MXx8fHwxNzYwMzU0OTEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white dark:bg-gray-950">
      <ScrollArea className="flex-1">
        {/* Header Section */}
        <div className="sticky top-0 z-10 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white shadow-lg">
          <ResponsiveContainer className="py-4 md:py-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl lg:text-3xl mb-1">
                  🌴 {t('nammaKumta')}
                </h1>
                <p className="text-xs md:text-sm text-blue-100">
                  {t('yourLocalCommunityGuide')}
                </p>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <LocationSelector />
                <LanguageSelector />
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <Input
                placeholder={t('searchNammaKumta')}
                className="pl-10 md:pl-12 pr-4 h-10 md:h-12 bg-white dark:bg-gray-800 border-0 text-sm md:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => onNavigate('explore')}
              />
            </div>
          </ResponsiveContainer>

          {/* Weather Widget */}
          <div className="px-4 md:px-6 lg:px-8 pb-4">
            <WeatherWidget />
          </div>
        </div>

        <div className="pb-20 md:pb-24 space-y-4 md:space-y-6 lg:space-y-8">
          {/* Banner Carousel */}
          <div className="pt-4 md:pt-6">
            <BannerCarousel onNavigate={onNavigate} />
          </div>

          {/* Quick Access Categories - Responsive Grid */}
          <ResponsiveContainer>
            <SectionHeader 
              title={t('quickAccess')} 
              icon="⚡"
              action={
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onNavigate('explore')}
                  className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
                >
                  {t('viewAll')}
                </Button>
              }
            />
            <ResponsiveGrid 
              cols={{ default: 2, sm: 3, md: 4, lg: 6 }}
              gap="gap-3 md:gap-4"
              className="mt-3"
            >
              {categories.slice(0, 12).map((category) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.id}
                    className="p-3 md:p-4 cursor-pointer hover:shadow-xl transition-all dark:bg-gray-900 dark:border-gray-800 hover:scale-105 active:scale-95"
                    onClick={() => onNavigate('subcategory', { categoryId: category.id, categoryName: category.name })}
                  >
                    <div className="flex flex-col items-center text-center gap-2 md:gap-3">
                      <div className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full ${category.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                      </div>
                      <span className="text-xs md:text-sm lg:text-base dark:text-white line-clamp-2">
                        {category.name}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </ResponsiveGrid>
          </ResponsiveContainer>

          {/* Popular Shops - Carousel on Mobile, Grid on Desktop */}
          <ResponsiveContainer>
            <SectionHeader 
              title={t('popularShops')} 
              icon="⭐"
              action={
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onNavigate('categories')}
                  className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
                >
                  {t('viewAll')}
                </Button>
              }
            />
            
            {/* Mobile: Carousel */}
            <div className="mt-3 lg:hidden">
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {popularShops.map((shop) => (
                    <CarouselItem key={shop.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2">
                      <ListingCard {...shop} onClick={() => onNavigate('detail', { listing: shop })} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 md:left-2" />
                <CarouselNext className="right-0 md:right-2" />
              </Carousel>
            </div>

            {/* Desktop: Grid */}
            <ResponsiveGrid 
              cols={{ lg: 3 }}
              className="mt-3 hidden lg:grid"
            >
              {popularShops.map((shop) => (
                <ListingCard key={shop.id} {...shop} onClick={() => onNavigate('detail', { listing: shop })} />
              ))}
            </ResponsiveGrid>
          </ResponsiveContainer>

          {/* Featured Advertisements */}
          <ResponsiveContainer>
            <SectionHeader 
              title={t('featuredAds')} 
              icon="📢"
              action={
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onNavigate('advertisements')}
                  className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
                >
                  {t('viewAll')}
                </Button>
              }
            />
            
            <ResponsiveGrid 
              cols={{ default: 2, md: 3, lg: 4 }}
              className="mt-3"
            >
              {featuredAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} onNavigate={onNavigate} />
              ))}
            </ResponsiveGrid>
          </ResponsiveContainer>

          {/* Upcoming Events */}
          <ResponsiveContainer>
            <SectionHeader 
              title={t('upcomingEvents')} 
              icon="🎉"
            />
            
            <ResponsiveGrid 
              cols={{ default: 1, md: 2 }}
              className="mt-3"
            >
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </ResponsiveGrid>
          </ResponsiveContainer>

          {/* Emergency Contacts */}
          <ResponsiveContainer>
            <SectionHeader 
              title={t('emergencyContacts')} 
              icon="🚨"
              action={
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onNavigate('emergency')}
                  className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900"
                >
                  {t('viewAll')}
                </Button>
              }
            />
            
            <ResponsiveGrid 
              cols={{ default: 1, sm: 2, lg: 3 }}
              className="mt-3"
            >
              <EmergencyContactCard 
                name={t('police')}
                number="100"
                icon="🚓"
              />
              <EmergencyContactCard 
                name={t('ambulance')}
                number="108"
                icon="🚑"
              />
              <EmergencyContactCard 
                name={t('fireService')}
                number="101"
                icon="🚒"
              />
            </ResponsiveGrid>
          </ResponsiveContainer>

          {/* Nearby Places */}
          <ResponsiveContainer>
            <SectionHeader 
              title={t('nearbyPlaces')} 
              icon="📍"
            />
            
            <ResponsiveGrid 
              cols={{ default: 1, md: 2 }}
              className="mt-3"
            >
              <NearbyCard
                name="Kumta Beach"
                distance="2.5 km"
                category="Tourism"
                image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHNob3JlfGVufDF8fHx8MTc2MDM1NDkxMHww&ixlib=rb-4.1.0&q=80&w=1080"
                onClick={() => onNavigate('detail', { listing: { name: 'Kumta Beach' } })}
              />
              <NearbyCard
                name="Mirjan Fort"
                distance="15 km"
                category="Historical"
                image="https://images.unsplash.com/photo-1564507592333-c60657eea523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3J0JTIwaGlzdG9yaWNhbHxlbnwxfHx8fDE3NjAzNTQ5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                onClick={() => onNavigate('detail', { listing: { name: 'Mirjan Fort' } })}
              />
            </ResponsiveGrid>
          </ResponsiveContainer>
        </div>
      </ScrollArea>

      <FloatingAddButton onClick={() => onNavigate('add')} />
    </div>
  );
}
