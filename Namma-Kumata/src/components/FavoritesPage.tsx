import { useState } from 'react';
import { ArrowLeft, Heart, ShoppingBag, Megaphone } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { ListingCard } from './ListingCard';
import { AdCard } from './AdCard';
import { FloatingAddButton } from './FloatingAddButton';
import { useFavorites } from '../contexts/FavoritesContext';
import { useLanguage } from '../contexts/LanguageContext';

interface FavoritesPageProps {
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
}

export function FavoritesPage({ onBack, onNavigate }: FavoritesPageProps) {
  const { favorites } = useFavorites();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'listings' | 'ads'>('listings');

  const listingFavorites = favorites.filter((fav) => fav.type === 'listing');
  const adFavorites = favorites.filter((fav) => fav.type === 'ad');

  return (
    <div className="h-screen flex flex-col w-full max-w-7xl mx-auto bg-white dark:bg-gray-950">
      {/* Simple Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl text-gray-900 dark:text-white">
                {t('favorites')}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>

          {/* Simple Tabs */}
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md transition-all ${
                activeTab === 'listings'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm">
                {t('shops')} ({listingFavorites.length})
              </span>
            </button>

            <button
              onClick={() => setActiveTab('ads')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md transition-all ${
                activeTab === 'ads'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span className="text-sm">
                {t('advertisements')} ({adFavorites.length})
              </span>
            </button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-gray-50 dark:bg-gray-950">
        <div className="px-4 py-4 pb-24">
          
          {/* Listings Tab Content */}
          {activeTab === 'listings' && (
            <div>
              {listingFavorites.length === 0 ? (
                <EmptyStateListings onNavigate={onNavigate} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {listingFavorites.map((fav) => (
                    <ListingCard
                      key={fav.id}
                      {...fav.data}
                      onClick={() => onNavigate('detail', { listing: fav.data })}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Ads Tab Content */}
          {activeTab === 'ads' && (
            <div>
              {adFavorites.length === 0 ? (
                <EmptyStateAds onNavigate={onNavigate} />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {adFavorites.map((fav) => (
                    <AdCard
                      key={fav.id}
                      {...fav.data}
                      onClick={() => onNavigate('ad-detail', { ad: fav.data })}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </ScrollArea>

      {/* Floating Add Button */}
      <FloatingAddButton onNavigate={onNavigate} />
    </div>
  );
}

// Simple Empty State for Listings
function EmptyStateListings({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-sm mx-auto p-8 text-center bg-white dark:bg-gray-900">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <Heart className="w-8 h-8 text-red-500" />
        </div>
        
        <h3 className="text-xl text-gray-900 dark:text-white mb-2">
          No favorites yet
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Start exploring shops and temples. Tap the heart icon to save your favorites.
        </p>

        <Button
          onClick={() => onNavigate('home')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Explore Now
        </Button>
      </Card>
    </div>
  );
}

// Simple Empty State for Ads
function EmptyStateAds({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-sm mx-auto p-8 text-center bg-white dark:bg-gray-900">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
          <Megaphone className="w-8 h-8 text-blue-500" />
        </div>
        
        <h3 className="text-xl text-gray-900 dark:text-white mb-2">
          No saved ads yet
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Browse deals on bikes, cars, jobs and more. Save ads to find them easily later.
        </p>

        <Button
          onClick={() => onNavigate('advertisements')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Browse Ads
        </Button>
      </Card>
    </div>
  );
}
