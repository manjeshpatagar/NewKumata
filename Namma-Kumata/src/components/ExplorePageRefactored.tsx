import { ShoppingBag, Church, MapPin, GraduationCap, Wrench, Users, Drama, Building2, Stethoscope, Phone, Hotel, Car, Dumbbell } from 'lucide-react';
import { useState } from 'react';
import { PageLayout } from './layouts/PageLayout';
import { PageHeader } from './common/PageHeader';
import { SearchBar } from './common/SearchBar';
import { QuickActions } from './features/QuickActions';
import { FloatingAddButton } from './FloatingAddButton';
import { ResponsiveContainer } from './layouts/ResponsiveContainer';
import { useLanguage } from '../contexts/LanguageContext';

interface ExplorePageRefactoredProps {
  onBack: () => void;
  onNavigate: (page: string, data?: any) => void;
}

export function ExplorePageRefactored({ onBack, onNavigate }: ExplorePageRefactoredProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'shops', label: t('shops'), icon: ShoppingBag, color: 'bg-green-500 dark:bg-green-600', emoji: '🛍️' },
    { id: 'temples', label: t('temples'), icon: Church, color: 'bg-yellow-500 dark:bg-yellow-600', emoji: '🕌' },
    { id: 'tourism', label: t('tourism'), icon: MapPin, color: 'bg-blue-500 dark:bg-blue-600', emoji: '🗺️' },
    { id: 'schoolsColleges', label: t('schoolsColleges'), icon: GraduationCap, color: 'bg-purple-500 dark:bg-purple-600', emoji: '🎓' },
    { id: 'services', label: t('services'), icon: Wrench, color: 'bg-indigo-500 dark:bg-indigo-600', emoji: '🔧' },
    { id: 'associations', label: t('associations'), icon: Users, color: 'bg-pink-500 dark:bg-pink-600', emoji: '👥' },
    { id: 'culturalPrograms', label: t('culturalPrograms'), icon: Drama, color: 'bg-orange-500 dark:bg-orange-600', emoji: '🎭' },
    { id: 'departments', label: t('departments'), icon: Building2, color: 'bg-gray-500 dark:bg-gray-600', emoji: '🏢' },
    { id: 'doctors', label: t('doctors'), icon: Stethoscope, color: 'bg-red-500 dark:bg-red-600', emoji: '🩺' },
    { id: 'emergencyServices', label: t('emergencyServices'), icon: Phone, color: 'bg-red-600 dark:bg-red-700', emoji: '📞' },
    { id: 'hotels', label: t('hotels'), icon: Hotel, color: 'bg-cyan-500 dark:bg-cyan-600', emoji: '🏨' },
    { id: 'rentVehicles', label: t('rentVehicles'), icon: Car, color: 'bg-teal-500 dark:bg-teal-600', emoji: '🚗' },
    { id: 'sportsEquipments', label: t('sportsEquipments'), icon: Dumbbell, color: 'bg-lime-500 dark:bg-lime-600', emoji: '💪' },
  ];

  // Filter categories based on search
  const filteredCategories = categories.filter(cat =>
    cat.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const actions = filteredCategories.map(cat => ({
    id: cat.id,
    label: cat.label,
    icon: cat.icon,
    color: cat.color,
    onClick: () => onNavigate('subcategory', { 
      categoryId: cat.id, 
      categoryName: cat.label 
    }),
  }));

  return (
    <PageLayout
      maxWidth="md"
      header={
        <div className="space-y-4">
          <PageHeader
            title={t('exploreNammaKumta')}
            subtitle={t('discoverLocalPlaces')}
            onBack={onBack}
          />
          <ResponsiveContainer>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t('searchCategories')}
            />
          </ResponsiveContainer>
        </div>
      }
    >
      <ResponsiveContainer className="py-6">
        <QuickActions actions={actions} />
        
        {filteredCategories.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>{t('noCategoriesFound')}</p>
          </div>
        )}
      </ResponsiveContainer>

      <FloatingAddButton onNavigate={onNavigate} />
    </PageLayout>
  );
}