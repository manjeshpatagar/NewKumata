'use client'

import { useState } from 'react';
import { 
  ArrowLeft, Star, Phone, Mail, Clock, MapPin, Share2, Heart, 
  MessageCircle, Copy, Facebook, Twitter 
} from 'lucide-react';

import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

import { useFavorites } from '../contexts/FavoritesContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getReviews } from '../lib/mockListingsData';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface DetailPageProps {
  listing: any;
}

export function DetailPage({ listing }: DetailPageProps) {
  const router = useRouter();
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

  const reviews = getReviews(language);

  // ✅ FIXED FUNCTION
  const handleFavoriteClick = () => {
    if (!isAuthenticated && !isGuest) {
      toast.info('Please login to add favorites');
      router.push('/auth/login');
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
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    setShowShareMenu(false);
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    setShowShareMenu(false);
  };

  const handleShareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
    setShowShareMenu(false);
  };

  const handleCopyLink = () => {
    const textArea = document.createElement('textarea');
    textArea.value = shareUrl;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }

    document.body.removeChild(textArea);
    setShowShareMenu(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col max-w-md mx-auto bg-white dark:bg-gray-950">

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-800 relative">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={handleFavoriteClick}>
            <Heart className={`w-5 h-5 ${favorited ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => setShowShareMenu(!showShareMenu)}>
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Share Menu */}
        {showShareMenu && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />

            {/* Dropdown */}
            <div className="absolute top-14 right-4 z-50 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 p-2 min-w-[200px]">

              <button
                onClick={handleShareWhatsApp}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <div className="w-9 h-9 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">WhatsApp</span>
              </button>

              <button
                onClick={handleShareFacebook}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Facebook</span>
              </button>

              <button
                onClick={handleShareTwitter}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <div className="w-9 h-9 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center">
                  <Twitter className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Twitter</span>
              </button>

              <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
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

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="pb-20">

          {/* Carousel */}
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <ImageWithFallback src={image} alt={`${listing.name} - ${index + 1}`} className="w-full h-64 object-cover" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          <div className="p-4">

            {/* Name + Category */}
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
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                ({listing.reviewCount} {t('reviews')})
              </span>
            </div>

            {/* Description */}
            <Card className="p-4 mb-4 dark:bg-gray-900 dark:border-gray-800">
              <h3 className="mb-2 dark:text-white">{t('about')}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {listing.description || 'No description available.'}
              </p>
            </Card>

            {/* Contact */}
            <Card className="p-4 mb-4 dark:bg-gray-900 dark:border-gray-800">
              <h3 className="mb-3 dark:text-white">{t('contactInformation')}</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm dark:text-gray-300">
                  <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>{listing.phone}</span>
                </div>

                <div className="flex items-center gap-3 text-sm dark:text-gray-300">
                  <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>{listing.email || 'No email available'}</span>
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
              <h3 className="mb-3 dark:text-white">
                {t('reviews')} ({listing.reviewCount})
              </h3>

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
