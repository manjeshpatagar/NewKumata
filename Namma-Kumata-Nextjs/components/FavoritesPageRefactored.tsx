'use client';
import { Heart } from 'lucide-react';
import { PageLayout } from './layouts/PageLayout';
import { PageHeader } from './common/PageHeader';
import { EmptyState } from './common/EmptyState';
import { ResponsiveContainer } from './layouts/ResponsiveContainer';
import { ResponsiveGrid } from './common/ResponsiveGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ListingCard } from './ListingCard';
import { AdCard } from './AdCard';
import { FloatingAddButton } from './FloatingAddButton';
import { useFavorites } from '../contexts/FavoritesContext';
import { useLanguage } from '../contexts/LanguageContext';

interface FavoritesPageRefactoredProps {
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
}

export function FavoritesPageRefactored({ onBack, onNavigate }: FavoritesPageRefactoredProps) {
  const { favorites } = useFavorites();
  const { t } = useLanguage();

  const listingFavorites = favorites.filter((fav) => fav.type === 'listing');
  const adFavorites = favorites.filter((fav) => fav.type === 'ad');

  return (
    <PageLayout
      maxWidth="lg"
      header={
        <PageHeader
          title={t('favorites')}
          subtitle={`${favorites.length} ${t('items')}`}
          onBack={onBack}
        />
      }
    >
      <ResponsiveContainer className="py-4">
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="listings">
              {t('shops')} & {t('temples')} ({listingFavorites.length})
            </TabsTrigger>
            <TabsTrigger value="ads">
              {t('advertisements')} ({adFavorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            {listingFavorites.length === 0 ? (
              <EmptyState
                icon={<Heart className="w-12 h-12 md:w-16 md:h-16 text-gray-300 dark:text-gray-700" />}
                title={t('noFavorites')}
                description={t('noFavoritesMessage')}
                actionLabel={t('explorePlaces')}
                onAction={() => onNavigate('explore')}
              />
            ) : (
              <ResponsiveGrid cols={{ default: 1, md: 2, lg: 3 }}>
                {listingFavorites.map((fav) => (
                  <ListingCard
                    key={fav.id}
                    {...fav.data}
                    onClick={() => onNavigate('detail', { listing: fav.data })}
                  />
                ))}
              </ResponsiveGrid>
            )}
          </TabsContent>

          <TabsContent value="ads">
            {adFavorites.length === 0 ? (
              <EmptyState
                icon={<Heart className="w-12 h-12 md:w-16 md:h-16 text-gray-300 dark:text-gray-700" />}
                title={t('noFavorites')}
                description={t('noFavoritesMessage')}
                actionLabel={t('browseAds')}
                onAction={() => onNavigate('advertisements')}
              />
            ) : (
              <ResponsiveGrid cols={{ default: 2, md: 3, lg: 4 }}>
                {adFavorites.map((fav) => (
                  <AdCard
                    key={fav.id}
                    {...fav.data}
                    onClick={() => onNavigate('ad-detail', { ad: fav.data })}
                  />
                ))}
              </ResponsiveGrid>
            )}
          </TabsContent>
        </Tabs>
      </ResponsiveContainer>

      <FloatingAddButton onNavigate={onNavigate} />
    </PageLayout>
  );
}