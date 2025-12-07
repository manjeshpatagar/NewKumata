'use client';

import { ReactNode } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

interface FeaturedSectionProps {
  title: string;
  icon?: ReactNode;
  items: any[];
  renderItem: (item: any) => ReactNode;
  onViewAll?: () => void;
  className?: string;
}

export function FeaturedSection({ 
  title, 
  icon, 
  items, 
  renderItem, 
  onViewAll,
  className = '' 
}: FeaturedSectionProps) {
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
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              {renderItem(item)}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 md:left-2" />
        <CarouselNext className="right-0 md:right-2" />
      </Carousel>
    </section>
  );
}
