'use client';

import { SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  sortOptions?: FilterOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  onFilterClick?: () => void;
  filterCount?: number;
  className?: string;
}

export function FilterBar({ 
  sortOptions, 
  sortValue, 
  onSortChange, 
  onFilterClick,
  filterCount = 0,
  className = '' 
}: FilterBarProps) {
  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      {sortOptions && sortValue && onSortChange && (
        <Select value={sortValue} onValueChange={onSortChange}>
          <SelectTrigger className="w-32 md:w-40 h-9 md:h-10 text-xs md:text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      
      {onFilterClick && (
        <Button
          variant="outline"
          size="sm"
          onClick={onFilterClick}
          className="h-9 md:h-10 px-3 md:px-4 relative"
        >
          <SlidersHorizontal className="w-4 h-4 mr-1 md:mr-2" />
          <span className="hidden sm:inline text-xs md:text-sm">Filters</span>
          {filterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {filterCount}
            </span>
          )}
        </Button>
      )}
    </div>
  );
}
