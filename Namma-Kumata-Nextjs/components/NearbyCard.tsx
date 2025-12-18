'use client';

import { MapPin, Phone, Navigation } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface NearbyCardProps {
  id: string;
  name: string;
  type: string;
  distance: string;
  image: string;
  phone?: string;
  onNavigate: (page: string, data?: any) => void;
}

export function NearbyCard({ name, type, distance, image, phone, onNavigate }: NearbyCardProps) {
  
  const typeColors: Record<string, string> = {
    Beach: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    Historical: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    Nature: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Temple: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  };

  return (
    <Card
      className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 dark:bg-gray-900 dark:border-gray-800 hover:scale-[1.02]"
      onClick={() => onNavigate('detail', { listing: { name, type, distance, image } })}
    >
      {/* Image */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={`${typeColors[type] || 'bg-gray-100'} border-0 shadow-lg backdrop-blur-sm`}>
            {type}
          </Badge>
        </div>

        {/* Distance */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold">{distance}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('detail', { listing: { name, type, distance, image } });
            }}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Get Directions
          </Button>
          
          {phone && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`tel:${phone}`);
              }}
            >
              <Phone className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
