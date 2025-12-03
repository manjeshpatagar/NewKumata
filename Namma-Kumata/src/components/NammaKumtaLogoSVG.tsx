import { useLanguage } from '../contexts/LanguageContext';

interface NammaKumtaLogoSVGProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export function NammaKumtaLogoSVG({ size = 'md', showTagline = false, className = '' }: NammaKumtaLogoSVGProps) {
  const { t } = useLanguage();

  const sizeClasses = {
    sm: {
      svg: 'w-10 h-10',
      text: 'text-lg',
      tagline: 'text-xs',
    },
    md: {
      svg: 'w-12 h-12 md:w-14 md:h-14',
      text: 'text-xl md:text-2xl',
      tagline: 'text-xs md:text-sm',
    },
    lg: {
      svg: 'w-16 h-16 md:w-20 md:h-20',
      text: 'text-2xl md:text-3xl lg:text-4xl',
      tagline: 'text-sm md:text-base',
    },
    xl: {
      svg: 'w-20 h-20 md:w-24 md:h-24',
      text: 'text-3xl md:text-4xl lg:text-5xl',
      tagline: 'text-base md:text-lg',
    },
  };

  const sizes = sizeClasses[size];

  return (
    <div className={`flex items-center gap-3 md:gap-4 ${className}`}>
      {/* Custom SVG Logo */}
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 animate-pulse"></div>
        
        {/* Logo SVG */}
        <svg 
          className={`${sizes.svg} relative drop-shadow-2xl`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          
          {/* Background Circle */}
          <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" className="drop-shadow-lg" />
          
          {/* Palm Tree Trunk */}
          <rect x="45" y="45" width="10" height="30" rx="2" fill="white" opacity="0.9" />
          
          {/* Palm Leaves */}
          <path 
            d="M50 40 C30 35, 25 25, 20 20 M50 40 C70 35, 75 25, 80 20 M50 40 C45 20, 40 15, 35 10 M50 40 C55 20, 60 15, 65 10 M50 40 C50 18, 48 12, 50 5" 
            stroke="white" 
            strokeWidth="5" 
            strokeLinecap="round"
            opacity="0.95"
            fill="none"
          />
          
          {/* Coconuts */}
          <circle cx="42" cy="42" r="3" fill="white" opacity="0.8" />
          <circle cx="50" cy="40" r="3" fill="white" opacity="0.8" />
          <circle cx="58" cy="42" r="3" fill="white" opacity="0.8" />
          
          {/* Location Pin Accent */}
          <circle cx="72" cy="72" r="12" fill="url(#accentGradient)" className="drop-shadow-md" />
          <path 
            d="M72 66 C69 66, 67 68, 67 71 C67 74, 72 79, 72 79 C72 79, 77 74, 77 71 C77 68, 75 66, 72 66 Z" 
            fill="white"
          />
          <circle cx="72" cy="71" r="2" fill="url(#accentGradient)" />
        </svg>
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
          <p className={`${sizes.tagline} text-gray-600 dark:text-gray-400 leading-tight mt-1 animate-in fade-in slide-in-from-left duration-700`}>
            {t('yourLocalCommunityGuide')}
          </p>
        )}
      </div>
    </div>
  );
}
