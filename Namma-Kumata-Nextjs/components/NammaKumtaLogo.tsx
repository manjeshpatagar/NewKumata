'use client';

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
      main: 'text-xl',
      sub: 'text-xs',
      tagline: 'text-[11px]',
      spacing: 'tracking-tight',
    },
    md: {
      main: 'text-3xl',
      sub: 'text-sm',
      tagline: 'text-xs',
      spacing: 'tracking-tight',
    },
    lg: {
      main: 'text-4xl',
      sub: 'text-base',
      tagline: 'text-sm',
      spacing: 'tracking-tight',
    },
  };

  const s = sizeMap[size];

  return (
    <div className={`flex flex-col leading-tight ${className}`}>
      
      {/* MAIN LOGO TEXT */}
      <span
        className={`
          relative inline-block
          ${s.main} ${s.spacing}
          font-extrabold
          bg-gradient-to-r from-blue-700 via-sky-600 to-emerald-600
          bg-clip-text text-transparent
          select-none
        `}
      >
        {/* Kannada + English stylized */}
        <span className="block font-black">
          ನಮ್ಮ ಕುಮಟಾ
        </span>

        {/* subtle underline */}
        <span className="absolute left-0 -bottom-1 w-full h-[3px] overflow-hidden">
          <span className="underline-move absolute w-full h-full bg-gradient-to-r from-blue-500 to-emerald-500" />
        </span>
      </span>

      {/* ENGLISH NAME */}
      <span
        className={`
          ${s.sub}
          font-semibold
          tracking-[0.18em]
          text-gray-600 uppercase
          mt-1
        `}
      >
        Namma Kumta
      </span>

      {/* TAGLINE */}
      {showTagline && (
        <span className={`${s.tagline} text-gray-400 mt-0.5`}>
          {t('yourLocalCommunityGuide')}
        </span>
      )}

      {/* LOCAL CSS ONLY */}
      <style jsx>{`
        .underline-move {
          animation: underlineMove 2.8s linear infinite;
        }

        @keyframes underlineMove {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
