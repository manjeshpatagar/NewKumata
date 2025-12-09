'use client';

import { Badge } from '../ui/badge';

interface Category {
  id: string;
  label: string;
  emoji?: string;
}

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
  className?: string;
}

export function CategoryTabs({ categories, selectedCategory, onSelect, className = '' }: CategoryTabsProps) {
  return (
    <div className={`overflow-x-auto scrollbar-hide ${className}`}>
      <div className="flex gap-2 pb-2 px-4 md:px-6">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            className={`cursor-pointer whitespace-nowrap text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 transition-all ${
              selectedCategory === category.id 
                ? 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            onClick={() => onSelect(category.id)}
          >
            {category.emoji && <span className="mr-1">{category.emoji}</span>}
            {category.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
