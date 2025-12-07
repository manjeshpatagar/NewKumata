'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, HelpCircle, Search, Plus, Edit, Trash2, Bell, Shield, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

export function HelpPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      id: '1',
      question: language === 'en' ? 'How do I create a listing?' : 'ನಾನು ಪಟ್ಟಿಯನ್ನು ಹೇಗೆ ರಚಿಸುವುದು?',
      answer: language === 'en' 
        ? 'Tap the + button at the bottom of your screen, select "Add Listing", fill in the details about your shop/service, and submit. Your listing will be reviewed by our admin team before being published.'
        : 'ನಿಮ್ಮ ಪರದೆಯ ಕೆಳಭಾಗದಲ್ಲಿ + ಬಟನ್ ಟ್ಯಾಪ್ ಮಾಡಿ, "ಪಟ್ಟಿ ಸೇರಿಸಿ" ಆಯ್ಕೆಮಾಡಿ, ನಿಮ್ಮ ಅಗಡಿ/ಸೇವೆಯ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ ಮತ್ತು ಸಲ್ಲಿಸಿ. ನಿಮ್ಮ ಪಟ್ಟಿಯನ್ನು ಪ್ರಕಟಿಸುವ ಮೊದಲು ನಮ್ಮ ನಿರ್ವಾಹಕ ತಂಡದಿಂದ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.',
      icon: Plus,
    },
    {
      id: '2',
      question: language === 'en' ? 'How do I post an advertisement?' : 'ನಾನು ಜಾಹೀರಾತನ್ನು ಹೇಗೆ ಪೋಸ್ಟ್ ಮಾಡುವುದು?',
      answer: language === 'en' 
        ? 'Tap the + button, select "Post Ad", choose your category (Bikes, Cars, Jobs, etc.), fill in all required information including photos/videos, and submit for approval. You will receive a notification once your ad is reviewed.'
        : '+ ಬಟನ್ ಟ್ಯಾಪ್ ಮಾಡಿ, "ಜಾಹೀರಾತು ಪೋಸ್ಟ್ ಮಾಡಿ" ಆಯ್ಕೆಮಾಡಿ, ನಿಮ್ಮ ವರ್ಗವನ್ನು (ಬೈಕ್‌ಗಳು, ಕಾರುಗಳು, ಉದ್ಯೋಗಗಳು ಇತ್ಯಾದಿ) ಆರಿಸಿ, ಫೋಟೋಗಳು/ವೀಡಿಯೊಗಳನ್ನು ಒಳಗೊಂಡಂತೆ ಎಲ್ಲಾ ಅಗತ್ಯ ಮಾಹಿತಿಯನ್ನು ಭರ್ತಿ ಮಾಡಿ ಮತ್ತು ಅನುಮೋದನೆಗಾಗಿ ಸಲ್ಲಿಸಿ.',
      icon: Plus,
    },
    {
      id: '3',
      question: language === 'en' ? 'How do I edit my ad or listing?' : 'ನನ್ನ ಜಾಹೀರಾತು ಅಥವಾ ಪಟ್ಟಿಯನ್ನು ಹೇಗೆ ಸಂಪಾದಿಸುವುದು?',
      answer: language === 'en' 
        ? 'You can edit your advertisements from your Profile page under "My Ads". For listing changes (shops, services, etc.), please contact the admin as only administrators can modify listings to ensure quality and accuracy.'
        : 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಪುಟದಿಂದ "ನನ್ನ ಜಾಹೀರಾತುಗಳು" ಅಡಿಯಲ್ಲಿ ನಿಮ್ಮ ಜಾಹೀರಾತುಗಳನ್ನು ಸಂಪಾದಿಸಬಹುದು. ಪಟ್ಟಿ ಬದಲಾವಣೆಗಳಿಗೆ (ಅಂಗಡಿಗಳು, ಸೇವೆಗಳು, ಇತ್ಯಾದಿ), ದಯವಿಟ್ಟು ನಿರ್ವಾಹಕರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      icon: Edit,
    },
    {
      id: '4',
      question: language === 'en' ? 'How do I delete my ad or listing?' : 'ನನ್ನ ಜಾಹೀರಾತು ಅಥವಾ ಪಟ್ಟಿಯನ್ನು ಹೇಗೆ ಅಳಿಸುವುದು?',
      answer: language === 'en' 
        ? 'You can delete your advertisements from Profile > My Ads. For listing deletions (shops, services, etc.), please contact the admin. Note: Ad deletions cannot be undone.'
        : 'ಪ್ರೊಫೈಲ್ > ನನ್ನ ಜಾಹೀರಾತುಗಳಿಂದ ನಿಮ್ಮ ಜಾಹೀರಾತುಗಳನ್ನು ಅಳಿಸಬಹುದು. ಪಟ್ಟಿ ಅಳಿಸುವಿಕೆಗಾಗಿ, ದಯವಿಟ್ಟು ನಿರ್ವಾಹಕರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      icon: Trash2,
    },
    {
      id: '5',
      question: language === 'en' ? 'How long does approval take?' : 'ಅನುಮೋದನೆ ಎಷ್ಟು ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ?',
      answer: language === 'en' 
        ? 'Most listings and ads are reviewed within 24-48 hours. You will receive a notification once your submission is approved or if changes are needed. Check the Notifications tab for updates.'
        : 'ಹೆಚ್ಚಿನ ಪಟ್ಟಿಗಳು ಮತ್ತು ಜಾಹೀರಾತುಗಳನ್ನು 24-48 ಗಂಟೆಗಳಲ್ಲಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ. ನಿಮ್ಮ ಸಲ್ಲಿಕೆಯನ್ನು ಅನುಮೋದಿಸಿದ ನಂತರ ನಿಮಗೆ ಅಧಿಸೂಚನೆ ಬರುತ್ತದೆ.',
      icon: Shield,
    },
    {
      id: '6',
      question: language === 'en' ? 'Can I upload videos in ads?' : 'ನಾನು ಜಾಹೀರಾತುಗಳಲ್ಲಿ ವೀಡಿಯೊಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಾಡಬಹುದೇ?',
      answer: language === 'en' 
        ? 'Yes! You can upload up to 5 photos and 2 videos when posting an advertisement. Videos help showcase your product/service better. Maximum video size is 50MB per file.'
        : 'ಹೌದು! ಜಾಹೀರಾತನ್ನು ಪೋಸ್ಟ್ ಮಾಡುವಾಗ ನೀವು 5 ಫೋಟೋಗಳು ಮತ್ತು 2 ವೀಡಿಯೊಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಬಹುದು. ವೀಡಿಯೊಗಳು ನಿಮ್ಮ ಉತ್ಪನ್ನ/ಸೇವೆಯನ್ನು ಉತ್ತಮವಾಗಿ ಪ್ರದರ್ಶಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ.',
      icon: Plus,
    },
    {
      id: '7',
      question: language === 'en' ? 'How do notifications work?' : 'ಅಧಿಸೂಚನೆಗಳು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ?',
      answer: language === 'en' 
        ? 'You receive notifications when: your listing/ad is approved or rejected, someone posts in your favorite categories, new featured items are added, or important community updates. Tap the bell icon to view all notifications.'
        : 'ನೀವು ಅಧಿಸೂಚನೆಗಳನ್ನು ಸ್ವೀಕರಿಸುತ್ತೀರಿ: ನಿಮ್ಮ ಪಟ್ಟಿ/ಜಾಹೀರಾತನ್ನು ಅನುಮೋದಿಸಿದಾಗ ಅಥವಾ ತಿರಸ್ರಿಸಿದಾಗ, ಹೊಸ ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಐಟಂಗಳನ್ನು ಸೇರಿಸಿದಾಗ.',
      icon: Bell,
    },
    {
      id: '8',
      question: language === 'en' ? 'How do I change language?' : 'ನಾನು ಭಾಷೆಯನ್ನು ಹೇಗೆ ಬದಲಾಯಿಸುವುದು?',
      answer: language === 'en' 
        ? 'Tap the language selector in the top-right corner of most pages. Choose between English and Kannada. Your preference will be saved automatically.'
        : 'ಹೆಚ್ಚಿನ ಪುಟಗಳ ಮೇಲಿನ-ಬಲ ಮೂಲೆಯಲ್ಲಿ ಭಾಷಾ ಆಯ್ಕೆಕಾರವನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ. ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡದ ನಡುವೆ ಆಯ್ಕೆಮಾಡಿ.',
      icon: MessageCircle,
    },
    {
      id: '9',
      question: language === 'en' ? 'How do I contact a seller?' : 'ನಾನು ಮಾರಾಟಗಾರರನ್ನು ಹೇಗೆ ಸಂಪರ್ಕಿಸುವುದು?',
      answer: language === 'en' 
        ? 'Each listing and ad shows contact information including phone number, WhatsApp, and email. Tap "Call", "WhatsApp", or "Email" buttons to reach the seller directly.'
        : 'ಪ್ರತಿಯೊಂದು ಪಟ್ಟಿ ಮತ್ತು ಜಾಹೀರಾತು ಫೋನ್ ಸಂಖ್ಯೆ, ವಾಟ್ಸಾಪ್ ಮತ್ತು ಇಮೇಲ್ ಸೇರಿದಂತೆ ಸಂಪರ್ಕ ಮಾಹಿತಿಯನ್ನು ತೋರಿಸುತ್ತದೆ.',
      icon: MessageCircle,
    },
    {
      id: '10',
      question: language === 'en' ? 'How do I report inappropriate content?' : 'ಸೂಕ್ತವಲ್ಲದ ವಿಷಯವನ್ನು ನಾನು ಹೇಗೆ ವರದಿ ಮಾಡುವುದು?',
      answer: language === 'en' 
        ? 'If you see inappropriate or fraudulent content, please contact us immediately through the Contact Us page. Include details about the listing/ad so we can investigate and take appropriate action.'
        : 'ನೀವು ಸೂಕ್ತವಲ್ಲದ ಅಥವಾ ವಂಚನೆಯ ವಿಷಯವನ್ನು ನೋಡಿದರೆ, ದಯವಿಟ್ಟು ಸಂಪರ್ಕಿಸಿ ಪುಟದ ಮೂಲಕ ತಕ್ಷಣ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      icon: Shield,
    },
  ];

  const filteredFaqs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col w-full max-w-7xl mx-auto bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 lg:p-8 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b dark:border-gray-800 sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="md:h-10 md:w-10">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
          <h1 className="dark:text-white text-lg md:text-xl lg:text-2xl">{t('help')}</h1>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 pb-20 md:pb-24">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            <Input
              placeholder={language === 'en' ? 'Search for help...' : 'ಸಹಾಯಕ್ಕಾಗಿ ಹುಡುಕಿ...'}
              className="pl-10 md:pl-12 dark:bg-gray-900 dark:border-gray-800 md:h-12 md:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Quick Links */}
          <Card className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-sm md:text-base lg:text-lg font-semibold mb-3 md:mb-4 dark:text-white">
              {language === 'en' ? 'Quick Links' : 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು'}
            </h3>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <Button
                variant="outline"
                className="h-auto flex-col py-3 md:py-4 gap-2"
                onClick={() => onNavigate?.('contact-us')}
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                <span className="text-xs md:text-sm">{t('contactUs')}</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col py-3 md:py-4 gap-2"
                onClick={() => onNavigate?.('terms-conditions')}
              >
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-purple-600 dark:text-purple-400" />
                <span className="text-xs md:text-sm">{t('termsConditions')}</span>
              </Button>
            </div>
          </Card>

          {/* FAQs */}
          <Card className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-sm md:text-base lg:text-lg font-semibold mb-3 md:mb-4 dark:text-white">
              {language === 'en' ? 'Frequently Asked Questions' : 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು'}
            </h3>
            
            {filteredFaqs.length === 0 ? (
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 text-center py-8">
                {language === 'en' ? 'No results found' : 'ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ'}
              </p>
            ) : (
              <Accordion type="single" collapsible className="space-y-2 md:space-y-3">
                {filteredFaqs.map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    className="border rounded-lg px-4 md:px-5 dark:border-gray-800"
                  >
                    <AccordionTrigger className="hover:no-underline py-3 md:py-4">
                      <div className="flex items-center gap-3 md:gap-4 text-left">
                        <faq.icon className="w-4 h-4 md:w-5 md:h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                        <span className="text-sm md:text-base dark:text-white">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm md:text-base text-gray-600 dark:text-gray-400 pb-3 md:pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </Card>

          {/* Still Need Help? */}
          <Card className="p-6 md:p-8 lg:p-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
            <h3 className="font-semibold mb-2 md:text-lg lg:text-xl">
              {language === 'en' ? 'Still Need Help?' : 'ಇನ್ನೂ ಸಹಾಯ ಬೇಕೇ?'}
            </h3>
            <p className="text-sm md:text-base opacity-90 mb-4 md:mb-6">
              {language === 'en' 
                ? 'Can\'t find what you\'re looking for? Contact our support team.'
                : 'ನೀವು ಹುಡುಕುತ್ತಿರುವುದು ಸಿಗುತ್ತಿಲ್ಲವೇ? ನಮ್ಮ ಬೆಂಬಲ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ.'}
            </p>
            <Button
              variant="secondary"
              className="w-full md:h-12 md:text-base"
              onClick={() => onNavigate?.('contactUs')}
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              {t('contactUs')}
            </Button>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}