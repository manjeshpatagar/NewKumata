'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Clock, MapPin, Store, Church, Wrench, GraduationCap, Users, Drama } from 'lucide-react';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from '../contexts/LanguageContext';
import { getSubcategoriesWithImages, getSubcategoryIcon } from '../lib/subcategoryImages';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SearchResult {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  subcategory?: string;
  location?: string;
  type: 'shop' | 'temple' | 'service' | 'school' | 'association' | 'subcategory';
  trending?: boolean;
  image?: string;
  icon?: string;
}

interface SmartSearchBarProps {
  onNavigate: (page: string, data?: any) => void;
  placeholder?: string;
  className?: string;
}

export function SmartSearchBar({ onNavigate, placeholder, className = '' }: SmartSearchBarProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Build results from subcategories + mock listings
  const buildAllResults = (): SearchResult[] => {
    const results: SearchResult[] = [];
    
    // Add all subcategories as searchable items
    const categories = [
      { id: 'shops', name: t('shops') },
      { id: 'temples', name: t('temples') },
      { id: 'services', name: t('services') },
      { id: 'schoolsColleges', name: t('schoolsColleges') },
      { id: 'associations', name: t('associations') },
      { id: 'culturalPrograms', name: t('culturalPrograms') },
      { id: 'departments', name: t('departments') },
      { id: 'doctors', name: t('doctors') },
      { id: 'emergencyServices', name: t('emergencyServices') },
      { id: 'hotels', name: t('hotels') },
      { id: 'rentVehicles', name: t('rentVehicles') },
      { id: 'sportsEquipments', name: t('sportsEquipments') },
    ];
    
    categories.forEach(cat => {
      const subcategories = getSubcategoriesWithImages(cat.id);
      subcategories.forEach((subcat, index) => {
        results.push({
          id: `${cat.id}-subcat-${index}`,
          name: subcat.name,
          category: cat.name,
          categoryId: cat.id,
          subcategory: subcat.name,
          type: 'subcategory',
          image: subcat.image,
          icon: subcat.icon,
          trending: index < 2 && cat.id === 'shops', // Mark first 2 shop subcategories as trending
        });
      });
    });
    
    // Add some example listings
    results.push(
      { id: '1', name: 'Sri Krishna Stores', category: t('shops'), categoryId: 'shops', type: 'shop', location: 'Main Road', subcategory: 'Grocery Stores', trending: true },
      { id: '2', name: 'Ganesh Medical', category: t('shops'), categoryId: 'shops', type: 'shop', location: 'Hospital Road', subcategory: 'Medical Stores' },
      { id: '3', name: 'Modern Electronics', category: t('shops'), categoryId: 'shops', type: 'shop', location: 'Market Street', subcategory: 'Electronics', trending: true },
      { id: '6', name: 'Sri Mahaganapathi Temple', category: t('temples'), categoryId: 'temples', type: 'temple', location: 'Temple Street', subcategory: 'Hindu Temples', trending: true },
      { id: '7', name: 'St. Xavier Church', category: t('temples'), categoryId: 'temples', type: 'temple', location: 'Church Road', subcategory: 'Churches' },
      { id: '9', name: 'Quick Plumbing Services', category: t('services'), categoryId: 'services', type: 'service', subcategory: 'Plumbing', location: 'Kumta', trending: true },
      { id: '10', name: 'Expert Electricians', category: t('services'), categoryId: 'services', type: 'service', subcategory: 'Electrical', location: 'Main Road' },
    );
    
    return results;
  };
  
  const allResults = buildAllResults();

  // Filter results based on query
  const filteredResults = query.trim() === '' 
    ? allResults 
    : allResults.filter(result => 
        result.name.toLowerCase().includes(query.toLowerCase()) ||
        result.category.toLowerCase().includes(query.toLowerCase()) ||
        result.subcategory?.toLowerCase().includes(query.toLowerCase()) ||
        result.location?.toLowerCase().includes(query.toLowerCase())
      );

  // Group results by category
  const groupedResults = filteredResults.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  // Get category icon
  const getCategoryIcon = (categoryId: string) => {
    const icons: Record<string, any> = {
      shops: Store,
      temples: Church,
      services: Wrench,
      schoolsColleges: GraduationCap,
      associations: Users,
      culturalPrograms: Drama,
    };
    return icons[categoryId] || Store;
  };

  // Get category color
  const getCategoryColor = (categoryId: string) => {
    const colors: Record<string, string> = {
      shops: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950',
      temples: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950',
      services: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950',
      schoolsColleges: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950',
      associations: 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950',
    };
    return colors[categoryId] || 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950';
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search
  const handleSearch = (result: SearchResult) => {
    setQuery('');
    setIsOpen(false);
    
    // Add to recent searches
    const newRecent = [result.name, ...recentSearches.filter(s => s !== result.name)].slice(0, 5);
    setRecentSearches(newRecent);
    
    // Navigate to detail or category
    onNavigate('subcategory', {
      categoryId: result.categoryId,
      categoryName: result.category
    });
  };

  // Handle recent search click
  const handleRecentClick = (searchTerm: string) => {
    setQuery(searchTerm);
    setIsOpen(true);
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setIsOpen(true);
  };

  const trending = allResults.filter(r => r.trending).slice(0, 5);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 group-focus-within:opacity-30 blur transition-opacity duration-300"></div>
        
        {/* Input Container */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 md:left-4 w-4 h-4 md:w-5 md:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10" />
          <Input
            placeholder={placeholder || t('searchNammaKumta')}
            className="pl-10 md:pl-11 pr-10 md:pr-11 h-11 md:h-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-200 focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 dark:focus:border-blue-400 focus:shadow-lg text-sm md:text-base"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 md:right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 max-h-[70vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30">
            <div>
              <h3 className="text-sm md:text-base dark:text-white">
                {query ? t('searchResults') || 'Search Results' : t('browseAll') || 'Browse All'}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {filteredResults.length} {t('results') || 'results'} {t('found') || 'found'}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2">
              
              {/* Recent Searches */}
              {!query && recentSearches.length > 0 && (
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <h4 className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                      {t('recentSearches') || 'Recent Searches'}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                        onClick={() => handleRecentClick(search)}
                      >
                        {search}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending */}
              {!query && trending.length > 0 && (
                <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <h4 className="text-xs uppercase tracking-wider text-orange-700 dark:text-orange-300">
                      {t('trending') || 'Trending Now'}
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {trending.map((result) => {
                      const Icon = getCategoryIcon(result.categoryId);
                      return (
                        <div
                          key={result.id}
                          onClick={() => handleSearch(result)}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 group"
                        >
                          <div className={`p-2 rounded-lg ${getCategoryColor(result.categoryId)}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {result.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {result.category} {result.location && `• ${result.location}`}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 border-0">
                            🔥
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Grouped Results */}
              {Object.entries(groupedResults).map(([category, results]) => (
                <div key={category} className="mb-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-2 mb-2 px-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 px-2">
                      {category} ({results.length})
                    </h4>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
                  </div>

                  {/* Results */}
                  <div className="space-y-1">
                    {results.slice(0, query ? results.length : 3).map((result) => {
                      const Icon = getCategoryIcon(result.categoryId);
                      return (
                        <div
                          key={result.id}
                          onClick={() => handleSearch(result)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 cursor-pointer transition-all duration-200 group"
                        >
                          <div className={`p-2 rounded-lg ${getCategoryColor(result.categoryId)} group-hover:scale-110 transition-transform`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {result.name}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              {result.subcategory && (
                                <span className="truncate">{result.subcategory}</span>
                              )}
                              {result.location && (
                                <>
                                  {result.subcategory && <span>•</span>}
                                  <span className="flex items-center gap-1 truncate">
                                    <MapPin className="w-3 h-3" />
                                    {result.location}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          {result.trending && (
                            <Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 border-0">
                              🔥
                            </Badge>
                          )}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-blue-600 dark:text-blue-400">→</span>
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Show More */}
                    {!query && results.length > 3 && (
                      <button
                        onClick={() => setQuery(category)}
                        className="w-full p-2 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors"
                      >
                        {t('showMore') || 'Show More'} ({results.length - 3} {t('more') || 'more'})
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* No Results */}
              {filteredResults.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="dark:text-white mb-2">{t('noResults') || 'No results found'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('tryDifferentSearch') || 'Try different keywords'}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <button
              onClick={() => onNavigate('explore')}
              className="w-full p-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors"
            >
              {t('viewAllCategories') || 'View All Categories'} →
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}
