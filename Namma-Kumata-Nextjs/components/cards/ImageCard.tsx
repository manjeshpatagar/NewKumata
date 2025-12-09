'use client';

import { ReactNode } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';

interface ImageCardProps {
  image: string;
  title: string;
  badges?: { label: string; color?: string; icon?: ReactNode }[];
  overlay?: ReactNode;
  aspectRatio?: 'square' | 'video' | 'portrait';
  className?: string;
}

const aspectRatios = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
};

export function ImageCard({ 
  image, 
  title, 
  badges = [], 
  overlay, 
  aspectRatio = 'video',
  className = '' 
}: ImageCardProps) {
  return (
    <div className={`relative ${aspectRatios[aspectRatio]} bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-lg ${className}`}>
      <ImageWithFallback
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      
      {/* Badges */}
      {badges.length > 0 && (
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {badges.map((badge, index) => (
            <Badge 
              key={index}
              className={`${badge.color || 'bg-blue-600'} text-white text-xs`}
            >
              {badge.icon && <span className="mr-1">{badge.icon}</span>}
              {badge.label}
            </Badge>
          ))}
        </div>
      )}
      
      {/* Overlay Content */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-3 md:p-4">
          {overlay}
        </div>
      )}
    </div>
  );
}
