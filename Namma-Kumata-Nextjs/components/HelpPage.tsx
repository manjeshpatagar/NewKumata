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
    question: language === 'en'
      ? 'Who can add shops and services?'
      : 'ಅಂಗಡಿಗಳು ಮತ್ತು ಸೇವೆಗಳನ್ನು ಯಾರು ಸೇರಿಸಬಹುದು?',
    answer: language === 'en'
      ? 'Only administrators can add shops, services, temples, tourist places, and other listings to ensure accuracy and quality.'
      : 'ನಿಖರತೆ ಮತ್ತು ಗುಣಮಟ್ಟವನ್ನು ಖಚಿತಪಡಿಸಲು ಅಂಗಡಿಗಳು, ಸೇವೆಗಳು, ದೇವಸ್ಥಾನಗಳು ಮತ್ತು ಇತರ ಪಟ್ಟಿಗಳನ್ನು ಕೇವಲ ನಿರ್ವಾಹಕರು ಮಾತ್ರ ಸೇರಿಸಬಹುದು.',
    icon: Shield,
  },
  {
    id: '2',
    question: language === 'en'
      ? 'Can I post an advertisement?'
      : 'ನಾನು ಜಾಹೀರಾತು ಪೋಸ್ಟ್ ಮಾಡಬಹುದೇ?',
    answer: language === 'en'
      ? 'No. Advertisements are managed only by the admin team. If you want to publish an ad, please contact the admin.'
      : 'ಇಲ್ಲ. ಜಾಹೀರಾತುಗಳನ್ನು ನಿರ್ವಾಹಕರ ತಂಡ ಮಾತ್ರ ನಿರ್ವಹಿಸುತ್ತದೆ. ಜಾಹೀರಾತು ಪ್ರಕಟಿಸಲು ನಿರ್ವಾಹಕರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    icon: Bell,
  },
  {
    id: '3',
    question: language === 'en'
      ? 'How do I update shop or listing details?'
      : 'ಅಂಗಡಿ ಅಥವಾ ಪಟ್ಟಿ ವಿವರಗಳನ್ನು ನಾನು ಹೇಗೆ ಬದಲಾಯಿಸಬಹುದು?',
    answer: language === 'en'
      ? 'If any details are incorrect or need updates, please contact the admin with correct information. Admin will review and update it.'
      : 'ಯಾವುದೇ ವಿವರಗಳು ತಪ್ಪಿದ್ದರೆ ಅಥವಾ ಬದಲಾವಣೆ ಅಗತ್ಯವಿದ್ದರೆ, ಸರಿಯಾದ ಮಾಹಿತಿಯೊಂದಿಗೆ ನಿರ್ವಾಹಕರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    icon: Edit,
  },
  {
    id: '4',
    question: language === 'en'
      ? 'How long does admin approval or update take?'
      : 'ನಿರ್ವಾಹಕರ ಪರಿಶೀಲನೆಗೆ ಎಷ್ಟು ಸಮಯ ಬೇಕು?',
    answer: language === 'en'
      ? 'Most updates and requests are handled within 24–48 hours depending on verification requirements.'
      : 'ಬಹುತೆಕ ಬದಲಾವಣೆಗಳು ಮತ್ತು ವಿನಂತಿಗಳನ್ನು 24–48 ಗಂಟೆಗಳೊಳಗೆ ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ.',
    icon: Shield,
  },
  {
    id: '5',
    question: language === 'en'
      ? 'How do notifications work?'
      : 'ಅಧಿಸೂಚನೆಗಳು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತವೆ?',
    answer: language === 'en'
      ? 'You receive notifications for important updates, new featured listings, announcements, and admin messages.'
      : 'ಮುಖ್ಯ ನವೀಕರಣಗಳು, ಹೊಸ ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಪಟ್ಟಿಗಳು ಮತ್ತು ನಿರ್ವಾಹಕರ ಸಂದೇಶಗಳಿಗಾಗಿ ಅಧಿಸೂಚನೆಗಳನ್ನು ಪಡೆಯುತ್ತೀರಿ.',
    icon: Bell,
  },
  {
    id: '6',
    question: language === 'en'
      ? 'How do I contact the admin?'
      : 'ನಾನು ನಿರ್ವಾಹಕರನ್ನು ಹೇಗೆ ಸಂಪರ್ಕಿಸುವುದು?',
    answer: language === 'en'
      ? 'Use the Contact Us page to reach the admin for listing requests, corrections, advertisements, or any support.'
      : 'ಪಟ್ಟಿ ವಿನಂತಿಗಳು, ತಿದ್ದುಪಡಿ, ಜಾಹೀರಾತುಗಳು ಅಥವಾ ಬೆಂಬಲಕ್ಕಾಗಿ ಸಂಪರ್ಕಿಸಿ ಪುಟವನ್ನು ಬಳಸಿ.',
    icon: MessageCircle,
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