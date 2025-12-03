import { useState } from 'react';
import { Search, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { ListingCard } from './ListingCard';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { FloatingAddButton } from './FloatingAddButton';
import { useLanguage } from '../contexts/LanguageContext';

interface CategoriesPageProps {
  onNavigate: (page: string, data?: any) => void;
  onBack: () => void;
}

export function CategoriesPage({ onNavigate, onBack }: CategoriesPageProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const categories = [
    { id: 'all', label: t('all') },
    { id: 'shops', label: t('shops') },
    { id: 'temples', label: t('temples') },
    { id: 'tourism', label: t('tourism') },
    { id: 'schoolsColleges', label: t('schoolsColleges') },
    { id: 'services', label: t('services') },
    { id: 'associations', label: t('associations') },
    { id: 'culturalPrograms', label: t('culturalPrograms') },
    { id: 'departments', label: t('departments') },
    { id: 'doctors', label: t('doctors') },
    { id: 'emergencyServices', label: t('emergencyServices') },
    { id: 'hotels', label: t('hotels') },
    { id: 'rentVehicles', label: t('rentVehicles') },
    { id: 'sportsEquipments', label: t('sportsEquipments') },
  ];

  const listings = [
    {
      id: '1',
      name: 'Rajesh General Store',
      category: 'Grocery',
      image: 'https://images.unsplash.com/photo-1754398006556-bedbc3b74bf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA0MjM0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.5,
      reviewCount: 128,
      distance: '0.5 km',
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
    },
    {
      id: '4',
      name: 'Sri Mahaganapathi Temple',
      category: 'Temple',
      image: 'https://images.unsplash.com/photo-1668770109988-24fe041e6b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjA0MjM0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviewCount: 203,
      distance: '1.5 km',
    },
    {
      id: '5',
      name: 'Kumta Beach Resort',
      category: 'Tourism',
      image: 'https://images.unsplash.com/photo-1691348293238-a5974ac44619?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0b3VyaXNtJTIwbGFuZG1hcmt8ZW58MXx8fHwxNzYwNDIzNDY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviewCount: 142,
      distance: '3.2 km',
    },
  ];

  const filteredListings = listings.filter(
    (listing) => selectedCategory === 'all' || listing.category.toLowerCase() === selectedCategory
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="p-4 md:p-6 lg:p-8 border-b dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Button variant="ghost" size="icon" onClick={onBack} className="md:w-10 md:h-10">
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            <h1 className="text-2xl md:text-3xl lg:text-4xl dark:text-white">{t('categories')}</h1>
          </div>

          {/* Search Bar & Filter */}
          <div className="flex gap-2 md:gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <Input 
                placeholder={`${t('search')}...`} 
                className="pl-10 md:pl-12 h-10 md:h-12 text-base md:text-lg" 
              />
            </div>

            {/* Filter Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 md:w-48 lg:w-56 h-10 md:h-12 text-sm md:text-base">
                <SelectValue placeholder={t('sortBy')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">{t('highestRated')}</SelectItem>
                <SelectItem value="distance">{t('nearest')}</SelectItem>
                <SelectItem value="reviews">{t('mostReviewed')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="hidden md:flex md:w-12 md:h-12">
              <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Category Pills - Horizontal Scroll */}
      <div className="px-4 md:px-6 lg:px-8 py-3 md:py-4 border-b dark:border-gray-800 bg-white dark:bg-gray-900">
        <ScrollArea className="w-full">
          <div className="max-w-7xl mx-auto flex gap-2 md:gap-3 pb-1">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={`cursor-pointer whitespace-nowrap px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base transition-all hover:scale-105 ${
                  selectedCategory === category.id ? 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Listings - Responsive Grid */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 pb-24 md:pb-28 lg:pb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                {...listing}
                onClick={() => onNavigate('detail', { listing })}
              />
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Floating Add Button */}
      <FloatingAddButton onNavigate={onNavigate} />
    </div>
  );
}