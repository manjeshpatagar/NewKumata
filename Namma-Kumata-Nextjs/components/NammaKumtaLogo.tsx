'use client';

import { Palmtree } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NammaKumtaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export function NammaKumtaLogo({
  size = 'md',
  showTagline = false,
  className = '',
}: NammaKumtaLogoProps) {
  const { t } = useLanguage();

  const sizeMap = {
    sm: {
      icon: 'w-6 h-6',
      container: 'p-2',
      text: 'text-lg',
      tagline: 'text-xs',
      gap: 'gap-2',
    },
    md: {
      icon: 'w-8 h-8',
      container: 'p-2.5',
      text: 'text-2xl',
      tagline: 'text-sm',
      gap: 'gap-3',
    },
    lg: {
      icon: 'w-11 h-11',
      container: 'p-3',
      text: 'text-3xl',
      tagline: 'text-base',
      gap: 'gap-4',
    },
  };

  const s = sizeMap[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      {/* 🌴 Icon */}
      <div className="relative">
        {/* soft glow */}
        <div className="absolute inset-0 rounded-xl bg-emerald-400/30 blur-md" />
        
        <div
          className={`relative flex items-center justify-center rounded-xl 
          bg-gradient-to-br from-blue-600 to-emerald-500 
          shadow-md ${s.container}`}
        >
          <Palmtree
            className={`${s.icon} text-white`}
            strokeWidth={2.5}
          />
        </div>
      </div>

      {/* 📝 Text */}
      <div className="flex flex-col leading-tight">
        <span
          className={`${s.text} font-bold tracking-tight 
          bg-gradient-to-r from-blue-700 to-emerald-600 
          bg-clip-text text-transparent`}
        >
          {t('nammaKumta')}
        </span>

        {showTagline && (
          <span className={`${s.tagline} text-gray-500`}>
            {t('yourLocalCommunityGuide')}
          </span>
        )}
      </div>
    </div>
  );
}
