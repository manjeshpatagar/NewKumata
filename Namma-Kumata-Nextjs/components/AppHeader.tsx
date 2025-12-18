'use client';

import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { NammaKumtaLogo } from '@/components/NammaKumtaLogo';
import { LanguageSelector } from '@/components/LanguageSelector';
import { SmartSearchBarWithImages } from '@/components/SmartSearchBarWithImages';
import { WeatherWidget } from '@/components/WeatherWidget';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export function AppHeader() {
  const router = useRouter();
  const { t } = useLanguage();
  const { requireAuth } = useRequireAuth();

  return (
    <header className="bg-white/90 dark:bg-[#111827]/90 backdrop-blur border-b dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          {/* LEFT */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 focus:outline-none"
            aria-label="Go to home"
          >
            <NammaKumtaLogo size="sm" />
          </button>


          {/* CENTER NAV (DESKTOP ONLY) */}
          <nav className="hidden md:flex items-center gap-6 font-medium text-gray-700 dark:text-gray-200">
            <button onClick={() => router.push('/explore')} className="hover:text-blue-600">
              {t('explore')}
            </button>
            <button onClick={() => router.push('/ads')} className="hover:text-blue-600">
              {t('advertise')}
            </button>
            <button
              onClick={() =>
                requireAuth(
                  () => router.push('/favorites'),
                  () => router.push('/auth/login')
                )
              }
              className="hover:text-blue-600"
            >
              {t('favorites')}
            </button>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() =>
                requireAuth(
                  () => router.push('/profile'),
                  () => router.push('/auth/login')
                )
              }
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white"
            >
              <User />
            </button>
          </div>
        </div>


      </div>


    </header>
  );
}
