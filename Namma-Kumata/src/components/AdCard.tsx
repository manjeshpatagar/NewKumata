import { MapPin, Clock, Star, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useFavorites } from '../contexts/FavoritesContext';

interface AdCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  price?: string;
  image: string;
  location: string;
  postedDate: string;
  status: 'active' | 'pending';
  isFeatured?: boolean;
  onClick?: () => void;
}

export function AdCard({
  id,
  title,
  category,
  description,
  price,
  image,
  location,
  postedDate,
  status,
  isFeatured,
  onClick,
}: AdCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(id);

  const categoryColors: Record<string, string> = {
    Bikes: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    Cars: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
    'Home Rentals': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    Electronics: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    Furniture: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Jobs: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
    Services: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({
      id,
      type: 'ad',
      data: { id, title, category, description, price, image, location, postedDate, status, isFeatured },
    });
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow relative"
      onClick={onClick}
    >
      {isFeatured && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-yellow-500">
            <Star className="w-3 h-3 mr-1 fill-white" />
            Featured
          </Badge>
        </div>
      )}
      {status === 'pending' && !favorited && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        </div>
        
      )}
      <div className="relative">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-36 object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white h-8 w-8"
          onClick={handleFavoriteClick}
        >
          <Heart
            className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </Button>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm flex-1 line-clamp-1 dark:text-white">{title}</h3>
        </div>
        <Badge className={`${categoryColors[category] || 'bg-gray-100 dark:bg-gray-700'} mb-2 text-xs`} variant="secondary">
          {category}
        </Badge>
        {price && (
          <p className="text-blue-600 dark:text-blue-400 mb-1">{price}</p>
        )}
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <span>{postedDate}</span>
        </div>
      </div>
    </Card>
  );
}
