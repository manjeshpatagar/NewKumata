'use client';
import { Calendar, MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  isNew?: boolean;
  onClick?: () => void;
}

export function EventCard({ title, date, location, image, isNew, onClick }: EventCardProps) {
  return (
    <Card
      className="overflow-hidden min-w-[280px] cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="relative">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-32 object-cover"
        />
        {isNew && (
          <Badge className="absolute top-2 right-2 bg-orange-500">New</Badge>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm mb-2 line-clamp-2 dark:text-white">{title}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 mt-1">
          <MapPin className="w-3 h-3" />
          <span>{location}</span>
        </div>
      </div>
    </Card>
  );
}
