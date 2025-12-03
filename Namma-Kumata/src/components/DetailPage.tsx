import { useState } from 'react';
import { ArrowLeft, Star, Phone, Mail, Clock, MapPin, Share2, Heart, MessageCircle, Copy, Facebook, Twitter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useFavorites } from '../contexts/FavoritesContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getReviews } from '../lib/mockListingsData';
import { toast } from 'sonner@2.0.3';

interface DetailPageProps {
  listing: any;
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export function DetailPage({ listing, onBack, onNavigate }: DetailPageProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t, language } = useLanguage();
  const { isAuthenticated, isGuest } = useAuth();
  const favorited = isFavorite(listing.id);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const images = [
    listing.image,
    listing.image,
    listing.image,
  ];

  // Get reviews based on current language
  const reviews = getReviews(language);

  const handleFavoriteClick = () => {
    if (!isAuthenticated && !isGuest) {
      toast.info('Please login to add favorites');
      if (onNavigate) {
        onNavigate('login');
      }
      return;
    }
    toggleFavorite({
      id: listing.id,
      type: 'listing',
      data: listing,
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out ${listing.name} on Namma Kumta!`;

  const handleShareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
    setShowShareMenu(false);
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
    setShowShareMenu(false);
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
    setShowShareMenu(false);
  };

  const handleCopyLink = () => {
    // Fallback method for copying text
    const textArea = document.createElement('textarea');
    textArea.value = shareUrl;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      toast.success('Link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
    
    document.body.removeChild(textArea);
    setShowShareMenu(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col max-w-md mx-auto bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-800 relative">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteClick}
          >
            <Heart
              className={`w-5 h-5 ${favorited ? 'fill-red-500 text-red-500' : ''}`}
            />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowShareMenu(!showShareMenu)}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Share Menu Dropdown */}
        {showShareMenu && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowShareMenu(false)}
            />
            
            {/* Share Options */}
            <div className="absolute top-14 right-4 z-50 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 p-2 min-w-[200px]">
              <button
                onClick={handleShareWhatsApp}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="w-9 h-9 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">WhatsApp</span>
              </button>

              <button
                onClick={handleShareFacebook}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Facebook</span>
              </button>

              <button
                onClick={handleShareTwitter}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="w-9 h-9 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center">
                  <Twitter className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Twitter</span>
              </button>

              <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Copy Link</span>
              </button>
            </div>
          </>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="pb-20">
          {/* Image Carousel */}
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <ImageWithFallback
                      src={image}
                      alt={`${listing.name} - ${index + 1}`}
                      className="w-full h-64 object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>

          <div className="p-4">
            {/* Name and Category */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h1 className="dark:text-white">{listing.name}</h1>
                {listing.businessName && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{listing.businessName}</p>
                )}
              </div>
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" variant="secondary">
                {listing.category ? t(listing.category) : listing.category}
              </Badge>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="dark:text-gray-300">{listing.rating}</span>
              </div>
              <span className="text-gray-600 dark:text-gray-400 text-sm">({listing.reviewCount} {t('reviews')})</span>
            </div>

            {/* Description */}
            <Card className="p-4 mb-4 dark:bg-gray-900 dark:border-gray-800">
              <h3 className="mb-2 dark:text-white">{t('about')}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {listing.description || (listing.category === 'Temple'
                  ? 'A beautiful temple with rich history and spiritual significance. Open for devotees daily with special puja timings in the morning and evening.'
                  : 'We provide high-quality products and excellent service to our customers. Visit us for all your needs with the best prices in Kumta.')}
              </p>
            </Card>

            {/* Contact Info */}
            <Card className="p-4 mb-4 dark:bg-gray-900 dark:border-gray-800">
              <h3 className="mb-3 dark:text-white">{t('contactInformation')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm dark:text-gray-300">
                  <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>{listing.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm dark:text-gray-300">
                  <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>{listing.email || `contact@${listing.name.toLowerCase().replace(/\s+/g, '')}.com`}</span>
                </div>
                <div className="flex items-center gap-3 text-sm dark:text-gray-300">
                  <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>{listing.hours || 'Mon-Sat: 9:00 AM - 8:00 PM'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm dark:text-gray-300">
                  <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>{listing.distance} {language === 'kn' ? 'ದೂರದಲ್ಲಿ' : 'from you'}</span>
                </div>
              </div>
            </Card>

            {/* Map Placeholder */}
            <Card className="p-4 mb-4 h-48 bg-gray-100 dark:bg-gray-900 dark:border-gray-800 flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">{t('mapView')}</p>
              </div>
            </Card>

            {/* Reviews */}
            <div>
              <h3 className="mb-3 dark:text-white">{t('reviews')} ({listing.reviewCount})</h3>
              <div className="space-y-3">
                {reviews.map((review) => (
                  <Card key={review.id} className="p-4 dark:bg-gray-900 dark:border-gray-800">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="dark:text-white">{review.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
