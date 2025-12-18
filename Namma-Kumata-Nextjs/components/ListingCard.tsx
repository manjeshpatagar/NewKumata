'use client';

import { Star, MapPin, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useFavorites } from '../contexts/FavoritesContext';

interface ListingCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance?: string;
  isNew?: boolean;
  onClick?: () => void;
}

export function ListingCard({
  id,
  name,
  category,
  image,
  rating,
  reviewCount,
  distance,
  isNew,
  onClick,
}: ListingCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(id);

  const categoryColors: Record<string, string> = {
    Grocery: 'bg-green-100 text-green-700',
    Medical: 'bg-red-100 text-red-700',
    Temple: 'bg-yellow-100 text-yellow-700',
    Tourism: 'bg-blue-100 text-blue-700',
    Furniture: 'bg-purple-100 text-purple-700',
    Services: 'bg-indigo-100 text-indigo-700',
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({
      id,
      type: 'listing',
      data: { id, name, category, image, rating, reviewCount, distance, isNew },
    });
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="relative">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-40 object-cover"
        />
        {isNew && (
          <Badge className="absolute top-2 left-2 bg-orange-500">New</Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white"
          onClick={handleFavoriteClick}
        >
          <Heart
            className={`w-5 h-5 ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </Button>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="flex-1">{name} hhuhhu</h3>
          <Badge className={categoryColors[category] || 'bg-gray-100'} variant="secondary">
            {category}
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-gray-600 text-sm mt-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
            <span className="text-xs">({reviewCount})</span>
          </div>
          {distance && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{distance}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
