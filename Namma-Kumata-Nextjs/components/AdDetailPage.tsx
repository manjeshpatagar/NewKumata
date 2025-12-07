'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Phone, Share2, Heart, MapPin, ChevronDown, ChevronUp, User, Calendar, Info, Tag as TagIcon, Star, CheckCircle, Clock, MessageCircle, Copy, Facebook, Twitter } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from '../contexts/LanguageContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { adCategories, mockAdvertisements } from '../lib/advertisementData';
import { toast } from 'sonner';
import { useState } from 'react';

interface AdDetailPageProps {
  ad: any;
}

export function AdDetailPage({ ad }: AdDetailPageProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isAuthenticated, isGuest } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productDetailsOpen, setProductDetailsOpen] = useState(true); // Open by default
  const [contactDetailsOpen, setContactDetailsOpen] = useState(true); // Open by default
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleFavoriteClick = () => {
    if (!isAuthenticated && !isGuest) {
      toast.info('Please login to add favorites');
      router.push('/auth/login');
      return;
    }
    toggleFavorite({ id: ad.id, type: 'ad', data: ad });
  };

  // Get category info
  const getCategoryInfo = (categoryId: string) => {
    return adCategories.find(cat => cat.id === categoryId);
  };
  
  const categoryInfo = getCategoryInfo(ad.category);

  // Handle back navigation to advertisements page
  const handleBackClick = () => {
    router.push('/ads');
  };

  const handleCall = () => {
    window.open(`tel:${ad.phone}`);
  };

  const handleWhatsApp = () => {
    const phone = ad.whatsapp || ad.phone;
    if (phone) {
      const message = encodeURIComponent(`Hi, I'm interested in your ad: ${ad.title}`);
      window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`);
    } else {
      toast.error('WhatsApp number not available');
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this ad: ${ad.title}`;

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

  // Get all images
  const allImages = ad.images && ad.images.length > 0 ? ad.images : [];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // Get related ads from the same category
  const relatedAds = mockAdvertisements
    .filter(item => item.category === ad.category && item.id !== ad.id)
    .slice(0, 4);

  return (
    <div className="h-screen flex flex-col w-full bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 relative">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBackClick}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Back to Advertisements"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-gray-900 dark:text-white">Ad Details</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleFavoriteClick}
            className="w-8 h-8 flex items-center justify-center"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite(ad.id)
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            />
          </button>
          <button 
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="w-8 h-8 flex items-center justify-center"
          >
            <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
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
        <div className="pb-32">
          <div className="max-w-7xl mx-auto">
          
          {/* Image Section */}
          <div className="relative bg-gray-100 dark:bg-gray-900 h-64 sm:h-80 md:h-96 lg:h-[400px]">
            {allImages.length > 0 ? (
              <>
                <ImageWithFallback
                  src={allImages[currentImageIndex]}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 shadow-lg flex items-center justify-center transition-all"
                    >
                      <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 shadow-lg flex items-center justify-center transition-all"
                    >
                      <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-black/70 text-white px-3 py-1.5 rounded-full text-xs backdrop-blur-sm">
                        {currentImageIndex + 1} / {allImages.length}
                      </div>
                    </div>

                    {/* Dot Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                      {allImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-6'
                              : 'bg-white/50 w-2 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <svg className="w-20 h-20 text-gray-300 dark:text-gray-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-400 dark:text-gray-600">No image available</p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-4 md:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-4">
            
            {/* Title & Basic Info - Always Visible */}
            <div className="space-y-3">
              {/* Title */}
              <h2 className="text-2xl text-gray-900 dark:text-white">
                {ad.title}
              </h2>
              
              {/* Category Badge */}
              {categoryInfo && (
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500 text-white border-0 px-3 py-1.5">
                    {categoryInfo.emoji} {categoryInfo.name}
                  </Badge>
                  {ad.featured && (
                    <Badge className="bg-yellow-500 text-white border-0 px-3 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {ad.sponsored && (
                    <Badge className="bg-purple-500 text-white border-0 px-3 py-1">
                      Sponsored
                    </Badge>
                  )}
                </div>
              )}

              {/* Price / Salary */}
              {ad.price && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Price</p>
                  <p className="text-3xl text-blue-600 dark:text-blue-400">
                    {ad.price}
                  </p>
                </div>
              )}
              
              {ad.salary && !ad.price && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Salary</p>
                  <p className="text-3xl text-green-600 dark:text-green-400">
                    {ad.salary}
                  </p>
                </div>
              )}

              {/* Description Preview */}
              {ad.description && (
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
                    {ad.description}
                  </p>
                </div>
              )}

              {/* Location */}
              {ad.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <span>{ad.location}</span>
                </div>
              )}

              {/* Posted By */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <User className="w-4 h-4" />
                <span>{ad.postedBy || 'Anonymous'}</span>
                {ad.postedDate && (
                  <>
                    <span>•</span>
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(ad.postedDate)}</span>
                  </>
                )}
              </div>
            </div>

            {/* Product Details - Collapsible */}
            <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
              <button
                onClick={() => setProductDetailsOpen(!productDetailsOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-900 dark:text-white">Product Details</span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform ${productDetailsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {productDetailsOpen && (
                <div className="px-6 pb-6 space-y-5 border-t border-gray-100 dark:border-gray-800 pt-5">
                  
                  {/* Full Description (if longer than preview) */}
                  {ad.description && ad.description.length > 150 && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Full Description</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {ad.description}
                      </p>
                    </div>
                  )}

                  {/* Offer Details */}
                  {ad.offer && (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="text-xs text-gray-900 dark:text-white mb-2">🎉 Special Offer</p>
                      <p className="text-sm text-gray-900 dark:text-white mb-2">
                        {ad.offer}
                      </p>
                      {ad.offerValidTill && (
                        <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Valid till: {ad.offerValidTill}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Detailed Information */}
                  <div className="space-y-3">
                    
                    {/* Jobs */}
                    {ad.category === 'jobs' && (
                      <>
                        {ad.jobType && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Job Type</span>
                            <span className="text-sm text-gray-900 dark:text-white">{ad.jobType}</span>
                          </div>
                        )}
                        {ad.experience && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Experience</span>
                            <span className="text-sm text-gray-900 dark:text-white">{ad.experience}</span>
                          </div>
                        )}
                        {ad.qualification && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Qualification</span>
                            <span className="text-sm text-gray-900 dark:text-white">{ad.qualification}</span>
                          </div>
                        )}
                        {ad.timing && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Timing</span>
                            <span className="text-sm text-gray-900 dark:text-white">{ad.timing}</span>
                          </div>
                        )}
                      </>
                    )}

                    {/* Home Rentals */}
                    {ad.category === 'homeRentals' && (
                      <>
                        {ad.propertyType && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Property Type</span>
                            <span className="text-sm text-gray-900 dark:text-white">{ad.propertyType}</span>
                          </div>
                        )}
                        {ad.bhk && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">BHK</span>
                            <span className="text-sm text-gray-900 dark:text-white">{ad.bhk}</span>
                          </div>
                        )}
                        {ad.furnishing && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Furnishing</span>
                            <span className="text-sm text-gray-900 dark:text-white">{ad.furnishing}</span>
                          </div>
                        )}
                        {ad.deposit && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Deposit</span>
                            <span className="text-sm text-gray-900 dark:text-white">{ad.deposit}</span>
                          </div>
                        )}
                      </>
                    )}

                    {/* Vehicles */}
                    {(ad.category === 'vehicleLaunches' || ad.category === 'vehicles') && (
                      <>
                        {ad.showroomName && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Showroom</span>
                            <span className="text-sm text-gray-900 dark:text-white">{ad.showroomName}</span>
                          </div>
                        )}
                        {ad.year && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Year</span>
                            <span className="text-sm text-gray-900 dark:text-white">{ad.year}</span>
                          </div>
                        )}
                        {ad.kmDriven && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">KM Driven</span>
                            <span className="text-sm text-gray-900 dark:text-white">{ad.kmDriven}</span>
                          </div>
                        )}
                        {ad.fuelType && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Fuel Type</span>
                            <span className="text-sm text-gray-900 dark:text-white">{ad.fuelType}</span>
                          </div>
                        )}
                        {ad.ownerType && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Owner</span>
                            <span className="text-sm text-gray-900 dark:text-white">{ad.ownerType}</span>
                          </div>
                        )}
                      </>
                    )}

                    {/* Electronics */}
                    {ad.category === 'electronics' && (
                      <>
                        {ad.brand && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Brand</span>
                            <span className="text-sm text-gray-900 dark:text-white">{ad.brand}</span>
                          </div>
                        )}
                        {ad.warranty && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Warranty</span>
                            <span className="text-sm text-green-600 dark:text-green-400">{ad.warranty}</span>
                          </div>
                        )}
                      </>
                    )}

                    {/* Furniture */}
                    {ad.category === 'furniture' && ad.material && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Material</span>
                        <span className="text-sm text-gray-900 dark:text-white">{ad.material}</span>
                      </div>
                    )}

                    {/* Condition */}
                    {ad.condition && (
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Condition</span>
                        <span className="text-sm text-gray-900 dark:text-white">{ad.condition}</span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  {ad.features && ad.features.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Key Features</p>
                      <div className="space-y-2">
                        {ad.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Specifications */}
                  {ad.specifications && ad.specifications.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Specifications</p>
                      <div className="space-y-2">
                        {ad.specifications.map((spec: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {ad.tags && ad.tags.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {ad.tags.map((tag: string, index: number) => (
                          <span 
                            key={index}
                            className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Contact Details - Collapsible */}
            <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
              <button
                onClick={() => setContactDetailsOpen(!contactDetailsOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-900 dark:text-white">Contact Details</span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform ${contactDetailsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {contactDetailsOpen && (
                <div className="px-6 pb-6 space-y-3 border-t border-gray-100 dark:border-gray-800 pt-5">
                  
                  {/* Phone */}
                  {ad.phone && (
                    <a
                      href={`tel:${ad.phone}`}
                      className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Primary Phone</p>
                        <p className="text-sm text-gray-900 dark:text-white">{ad.phone}</p>
                      </div>
                    </a>
                  )}

                  {/* Phone 2 */}
                  {ad.phone2 && (
                    <a
                      href={`tel:${ad.phone2}`}
                      className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Secondary Phone</p>
                        <p className="text-sm text-gray-900 dark:text-white">{ad.phone2}</p>
                      </div>
                    </a>
                  )}

                  {/* Email */}
                  {ad.email && (
                    <a
                      href={`mailto:${ad.email}`}
                      className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-sm text-gray-900 dark:text-white">{ad.email}</p>
                      </div>
                    </a>
                  )}

                  {/* WhatsApp */}
                  {(ad.whatsapp || ad.phone) && (
                    <a
                      href={`https://wa.me/${(ad.whatsapp || ad.phone).replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                    >
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">WhatsApp</p>
                        <p className="text-sm text-green-600 dark:text-green-400">{ad.whatsapp || ad.phone}</p>
                      </div>
                    </a>
                  )}

                </div>
              )}
            </div>

            </div> {/* End of main content column */}

            {/* Related Ads Section - Desktop Sidebar */}
            {relatedAds.length > 0 && (
              <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-4">
                  <h3 className="text-lg text-gray-900 dark:text-white mb-4 px-4">Related Ads</h3>
                  <div className="space-y-3">
                    {relatedAds.map((relatedAd) => (
                      <button
                        key={relatedAd.id}
                        onClick={() => {
                          sessionStorage.setItem('currentAd', JSON.stringify(relatedAd));
                          router.push('/ad-detail');
                        }}
                        className="w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 text-left"
                      >
                        <div className="flex gap-3 p-3">
                          <div className="w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                            {relatedAd.images && relatedAd.images[0] ? (
                              <ImageWithFallback
                                src={relatedAd.images[0]}
                                alt={relatedAd.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm text-gray-900 dark:text-white line-clamp-2 mb-1">
                              {relatedAd.title}
                            </h4>
                            <p className="text-base text-blue-600 dark:text-blue-400 mb-1">
                              {relatedAd.price || relatedAd.salary}
                            </p>
                            {relatedAd.location && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {relatedAd.location}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            </div> {/* End of grid */}

            {/* Related Ads Section - Mobile */}
            {relatedAds.length > 0 && (
              <div className="lg:hidden px-4 md:px-6 mt-8 mb-6">
                <h3 className="text-lg text-gray-900 dark:text-white mb-4">Related Ads</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedAds.map((relatedAd) => (
                    <button
                      key={relatedAd.id}
                      onClick={() => onNavigate?.('ad-detail', relatedAd)}
                      className="w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800 text-left"
                    >
                      <div className="flex gap-3 p-3">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                          {relatedAd.images && relatedAd.images[0] ? (
                            <ImageWithFallback
                              src={relatedAd.images[0]}
                              alt={relatedAd.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm text-gray-900 dark:text-white line-clamp-2 mb-1">
                            {relatedAd.title}
                          </h4>
                          <p className="text-base text-blue-600 dark:text-blue-400 mb-1">
                            {relatedAd.price || relatedAd.salary}
                          </p>
                          {relatedAd.location && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {relatedAd.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div> {/* End of Content (px-4...) */}
          </div> {/* End of max-w-7xl container */}
        </div>
      </ScrollArea>

      {/* Fixed Bottom Buttons - Sticky */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-50">
        <div className="px-4 py-3 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto w-full">
            <button
              onClick={handleCall}
              className="flex items-center justify-center gap-2 px-4 md:px-6 py-3.5 md:py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">Call Now</span>
            </button>
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 px-4 md:px-6 py-3.5 md:py-4 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="font-medium">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
