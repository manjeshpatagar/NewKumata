import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { PageLayout } from './layouts/PageLayout';
import { PageHeader } from './common/PageHeader';
import { SearchBar } from './common/SearchBar';
import { CategoryTabs } from './common/CategoryTabs';
import { FeaturedSection } from './sections/FeaturedSection';
import { ResponsiveGrid } from './common/ResponsiveGrid';
import { ResponsiveContainer } from './layouts/ResponsiveContainer';
import { EmptyState } from './common/EmptyState';
import { FilterBar } from './filters/FilterBar';
import { FloatingAddButton } from './FloatingAddButton';
import { BrandingBanners } from './BrandingBanners';
import { AdCard } from './AdCard';
import { Card } from './ui/card';
import { ImageCard } from './cards/ImageCard';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { adCategories, mockAdvertisements } from '../lib/advertisementData';

interface AdvertisementsPageRefactoredProps {
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
}

export function AdvertisementsPageRefactored({ onBack, onNavigate }: AdvertisementsPageRefactoredProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Categories for tabs
  const categories = [
    { id: 'all', label: t('all') },
    ...adCategories.map(cat => ({ id: cat.id, label: cat.name, emoji: cat.emoji }))
  ];

  // Sort options
  const sortOptions = [
    { value: 'recent', label: t('mostRecent') },
    { value: 'price-low', label: t('priceLowToHigh') },
    { value: 'price-high', label: t('priceHighToLow') },
    { value: 'popular', label: t('mostPopular') },
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

  // Sort ads
  const sortedAds = [...filteredAds].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.postedOn).getTime() - new Date(a.postedOn).getTime();
    }
    // Add more sorting logic as needed
    return 0;
  });

  // Featured ads for carousel
  const featuredAds = mockAdvertisements.filter(ad => ad.featured && ad.approved);

  // Get category info
  const getCategoryInfo = (categoryId: string) => {
    return adCategories.find(cat => cat.id === categoryId);
  };

  // Render featured ad card
  const renderFeaturedAd = (ad: any) => {
    const categoryInfo = getCategoryInfo(ad.category);
    
    return (
      <Card 
        className="overflow-hidden cursor-pointer dark:bg-gray-900 dark:border-gray-800"
        onClick={() => onNavigate('ad-detail', { ad })}
      >
        {ad.images && ad.images.length > 0 && (
          <ImageCard
            image={ad.images[0]}
            title={ad.title}
            aspectRatio="video"
            badges={[{ label: t('featured'), color: 'bg-yellow-500' }]}
            overlay={
              <>
                <Badge className={`${categoryInfo?.color} text-white border-0 mb-2`}>
                  {categoryInfo?.emoji} {categoryInfo?.name}
                </Badge>
                <h3 className="text-white mb-1 line-clamp-1">{ad.title}</h3>
                <p className="text-sm text-white/90 line-clamp-2">
                  {ad.description}
                </p>
              </>
            }
          />
        )}
      </Card>
    );
  };

  return (
    <PageLayout
      maxWidth="full"
      header={
        <div className="space-y-4">
          <PageHeader
            title={`📢 ${t('advertisements')}`}
            subtitle={`${filteredAds.length} ${t('adsAvailable')}`}
            onBack={onBack}
            rightAction={
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => onNavigate('add-advertisement')}
              >
                <Plus className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">{t('postAd')}</span>
                <span className="sm:hidden">+</span>
              </Button>
            }
          />

          <ResponsiveContainer>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t('searchAds')}
            />
          </ResponsiveContainer>

          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      }
    >
      {/* Branding Banners */}
      <div className="mb-4 md:mb-6">
        <BrandingBanners onNavigate={onNavigate} />
      </div>

      {/* Featured Advertisements */}
      {featuredAds.length > 0 && (
        <ResponsiveContainer className="mb-6">
          <FeaturedSection
            title={t('featuredAds')}
            icon="🔥"
            items={featuredAds}
            renderItem={renderFeaturedAd}
          />
        </ResponsiveContainer>
      )}

      {/* Filter Bar */}
      <ResponsiveContainer className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="dark:text-white text-lg md:text-xl">
            {t('allAdvertisements')}
          </h2>
          <FilterBar
            sortOptions={sortOptions}
            sortValue={sortBy}
            onSortChange={setSortBy}
          />
        </div>
      </ResponsiveContainer>

      {/* Empty State - No Ads */}
      {sortedAds.length === 0 && searchQuery === '' && selectedCategory === 'all' && (
        <ResponsiveContainer>
          <EmptyState
            icon={<div className="text-4xl md:text-6xl">📢</div>}
            title={t('noAdsYet')}
            description={t('beFirstToPost')}
            actionLabel={t('postYourFirstAd')}
            onAction={() => onNavigate('add-advertisement')}
          />
        </ResponsiveContainer>
      )}

      {/* Ads Grid */}
      {sortedAds.length > 0 && (
        <ResponsiveContainer>
          <ResponsiveGrid cols={{ default: 1, md: 2, lg: 3, xl: 4 }}>
            {sortedAds.map((ad) => (
              <AdCard 
                key={ad.id} 
                ad={ad} 
                onNavigate={onNavigate}
              />
            ))}
          </ResponsiveGrid>
        </ResponsiveContainer>
      )}

      {/* Empty State - No Results */}
      {sortedAds.length === 0 && (searchQuery !== '' || selectedCategory !== 'all') && (
        <ResponsiveContainer>
          <EmptyState
            icon={<div className="text-4xl md:text-6xl">🔍</div>}
            title={t('noAdsFound')}
            description={t('tryDifferentSearch')}
          />
        </ResponsiveContainer>
      )}

      <FloatingAddButton 
        onClick={() => onNavigate('add-advertisement')} 
        label={t('postAd')}
      />
    </PageLayout>
  );
}