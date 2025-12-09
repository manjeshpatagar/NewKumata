'use client';

import { MapPin, Palmtree } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NammaKumtaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export function NammaKumtaLogo({ size = 'md', showTagline = false, className = '' }: NammaKumtaLogoProps) {
  const { t } = useLanguage();

  const sizeClasses = {
    sm: {
      container: 'gap-2',
      icon: 'w-6 h-6',
      text: 'text-lg',
      tagline: 'text-xs',
    },
    md: {
      container: 'gap-2 md:gap-3',
      icon: 'w-8 h-8 md:w-9 md:h-9',
      text: 'text-xl md:text-2xl',
      tagline: 'text-xs md:text-sm',
    },
    lg: {
      container: 'gap-3 md:gap-4',
      icon: 'w-10 h-10 md:w-12 md:h-12',
      text: 'text-2xl md:text-3xl lg:text-4xl',
      tagline: 'text-sm md:text-base',
    },
    xl: {
      container: 'gap-4',
      icon: 'w-14 h-14 md:w-16 md:h-16',
      text: 'text-3xl md:text-4xl lg:text-5xl',
      tagline: 'text-base md:text-lg',
    },
  };

  const sizes = sizeClasses[size];

  return (
    <div className={`flex items-center ${sizes.container} ${className}`}>
      {/* Logo Icon with Animation */}
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300 animate-pulse"></div>
        
        {/* Icon Container */}
        <div className="relative bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-2xl p-2 shadow-xl group-hover:scale-110 transition-transform duration-300">
          {/* Palm Tree Icon */}
          <Palmtree className={`${sizes.icon} text-white drop-shadow-lg`} strokeWidth={2.5} />
          
          {/* Small Location Pin Accent */}
          <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full p-1 shadow-lg">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 text-white" fill="white" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col">
        {/* Main Title */}
        <h1 className={`${sizes.text} leading-none tracking-tight`}>
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm animate-in fade-in slide-in-from-left duration-500">
            {t('nammaKumta')}
          </span>
        </h1>
        
        {/* Tagline (Optional) */}
        {showTagline && (
          <p className={`${sizes.tagline} text-gray-600 dark:text-gray-400 leading-tight mt-0.5 animate-in fade-in slide-in-from-left duration-700`}>
            {t('yourLocalCommunityGuide')}
          </p>
        )}
      </div>
    </div>
  );
}
