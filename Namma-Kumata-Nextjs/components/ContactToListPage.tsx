'use client';

import { ArrowLeft, Phone, Mail, Store, Building2, Users, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactToListPageProps {
  onBack: () => void;
}

export function ContactToListPage({ onBack }: ContactToListPageProps) {
  const { t } = useLanguage();

  const contactInfo = {
    phone: '+91 98765 43210',
    email: 'admin@nammakumta.com',
    whatsapp: '+91 98765 43210'
  };

  const listingTypes = [
    { icon: Store, name: t('shops'), emoji: '🛍️', color: 'text-green-600 dark:text-green-400' },
    { icon: Building2, name: t('temples'), emoji: '🕌', color: 'text-yellow-600 dark:text-yellow-400' },
    { icon: Users, name: t('services'), emoji: '🔧', color: 'text-blue-600 dark:text-blue-400' },
  ];

  const benefits = [
    { icon: CheckCircle2, text: t('verifiedListings') || 'Verified & trusted listings' },
    { icon: CheckCircle2, text: t('freePromotion') || 'Free promotion on homepage' },
    { icon: CheckCircle2, text: t('detailedProfile') || 'Detailed business profile' },
    { icon: CheckCircle2, text: t('directCustomerReach') || 'Direct customer reach' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/30 dark:from-gray-950 dark:via-blue-950/30 dark:to-purple-950/30">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 shadow-lg border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl dark:text-white">{t('addNewListing')}</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">{t('contactToList') || 'Contact us to list your business'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-24">
          
          {/* Main Information Card */}
          <Card className="relative overflow-hidden border-2 border-blue-200 dark:border-blue-800 shadow-xl">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10"></div>
            
            <div className="relative p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl dark:text-white">
                    {t('listYourBusiness')}
                  </h2>
                  <Badge className="mt-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-0">
                    {t('adminApprovalRequired') || 'Admin Approval Required'}
                  </Badge>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {t('listingContactMessage') || 'To add your shop, temple, service, or any other business listing to Namma Kumta, please contact our admin team. We will verify your information and add your listing to the appropriate category.'}
              </p>

              {/* Listing Types */}
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">
                  {t('weAccept') || 'We Accept'}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {listingTypes.map((type, index) => {
                    const Icon = type.icon;
                    return (
                      <div key={index} className="flex flex-col items-center text-center p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <span className="text-3xl mb-2">{type.emoji}</span>
                        <span className={`text-xs ${type.color}`}>{type.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">
                  {t('benefits') || 'Benefits'}
                </h3>
                <div className="space-y-2">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Icon className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span>{benefit.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Processing Time */}
              <div className="flex items-center gap-2 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <p className="text-sm text-amber-900 dark:text-amber-200">
                  {t('processingTime') || 'Approval typically takes 1-2 business days'}
                </p>
              </div>
            </div>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-4">
            <h3 className="text-lg dark:text-white px-2">
              {t('contactOurTeam') || 'Contact Our Team'}
            </h3>

            {/* Phone Contact */}
            <Card className="group p-5 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-500 dark:hover:border-green-400">
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {t('callUs') || 'Call us'}
                  </p>
                  <p className="text-lg dark:text-white">{contactInfo.phone}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-green-600 dark:text-green-400">→</span>
                </div>
              </a>
            </Card>

            {/* Email Contact */}
            <Card className="group p-5 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {t('emailUs') || 'Email us'}
                  </p>
                  <p className="text-base md:text-lg dark:text-white break-all">{contactInfo.email}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-blue-600 dark:text-blue-400">→</span>
                </div>
              </a>
            </Card>

            {/* WhatsApp Contact */}
            <Card className="group p-5 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-emerald-500 dark:hover:border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30">
              <a 
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {t('whatsappUs') || 'WhatsApp us'}
                  </p>
                  <p className="text-lg dark:text-white">{contactInfo.whatsapp}</p>
                  <Badge className="mt-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 border-0 text-xs">
                    {t('fastestResponse') || 'Fastest Response'}
                  </Badge>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-emerald-600 dark:text-emerald-400">→</span>
                </div>
              </a>
            </Card>
          </div>

          {/* Information Note */}
          <Card className="p-5 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <h4 className="text-sm dark:text-white mb-2">
              📋 {t('informationNeeded') || 'Information We Need'}
            </h4>
            <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1 ml-4 list-disc">
              <li>{t('businessName') || 'Business/Shop Name'}</li>
              <li>{t('categoryType') || 'Category & Type'}</li>
              <li>{t('contactDetails') || 'Contact Details'}</li>
              <li>{t('address') || 'Address & Location'}</li>
              <li>{t('photos') || 'Photos (if available)'}</li>
            </ul>
          </Card>

        </div>
      </div>
    </div>
  );
}
