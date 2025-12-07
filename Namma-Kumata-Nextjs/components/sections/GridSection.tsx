'use client';

import { ReactNode } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ResponsiveGrid } from '../common/ResponsiveGrid';

interface GridSectionProps {
  title: string;
  icon?: ReactNode;
  items: any[];
  renderItem: (item: any) => ReactNode;
  onViewAll?: () => void;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  className?: string;
}

export function GridSection({ 
  title, 
  icon, 
  items, 
  renderItem, 
  onViewAll,
  cols = { default: 1, md: 2, lg: 3 },
  className = '' 
}: GridSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className={className}>
      <SectionHeader
        title={title}
        icon={icon}
        action={
          onViewAll && (
            <button 
              onClick={onViewAll}
              className="text-blue-600 dark:text-blue-400 text-xs md:text-sm hover:underline"
            >
              View All
            </button>
          )
        }
      />
      
      <ResponsiveGrid cols={cols}>
        {items.map((item, index) => (
          <div key={index}>
            {renderItem(item)}
          </div>
        ))}
      </ResponsiveGrid>
    </section>
  );
}
