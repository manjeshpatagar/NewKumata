import { ArrowLeft, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';

interface TermsConditionsPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export function TermsConditionsPage({ onBack, onNavigate }: TermsConditionsPageProps) {
  const { t, language } = useLanguage();

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col w-full max-w-7xl mx-auto bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 lg:p-8 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b dark:border-gray-800 sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={onBack} className="md:h-10 md:w-10">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
        <h1 className="dark:text-white text-lg md:text-xl lg:text-2xl">{t('termsConditions')}</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 pb-20 md:pb-24">
          {/* Introduction */}
          <Card className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-3 md:mb-4 dark:text-white">
              {language === 'en' ? 'Welcome to Namma Kumata' : 'ನಮ್ಮ ಕುಮಟಕ್ಕೆ ಸ್ವಾಗತ'}
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {language === 'en' 
                ? 'By using Namma Kumata, you agree to these terms and conditions. Please read them carefully.'
                : 'ನಮ್ಮ ಕುಮಟವನ್ನು ಬಳಸುವ ಮೂಲಕ, ನೀವು ಈ ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳನ್ನು ಒಪ್ಪುತ್ತೀರಿ. ದಯವಿಟ್ಟು ಅವುಗಳನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಓದಿ.'}
            </p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500 mt-2 md:mt-3">
              {language === 'en' ? 'Last Updated: November 2024' : 'ಕೊನೆಯ ನವೀಕರಣ: ನವೆಂಬರ್ 2024'}
            </p>
          </Card>

          {/* User Responsibilities */}
          <Card className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 dark:text-white">
              {language === 'en' ? '1. User Responsibilities' : '೧. ಬಳಕೆದಾರರ ವಾಬ್ದಾರಿಗಳು'}
            </h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
              <li className="flex gap-2 md:gap-3">
                <span className="text-blue-600 dark:text-blue-400 flex-shrink-0">•</span>
                <span>
                  {language === 'en' 
                    ? 'Provide accurate and truthful information in all listings and advertisements.'
                    : 'ಎಲ್ಲಾ ಪಟ್ಟಿಗಳು ಮತ್ತು ಜಾಹೀರಾತುಗಳಲ್ಲಿ ನಿಖರ ಮತ್ತು ಸತ್ಯವಾದ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸಿ.'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-blue-600 dark:text-blue-400 flex-shrink-0">•</span>
                <span>
                  {language === 'en' 
                    ? 'Do not post misleading, fraudulent, or illegal content.'
                    : 'ತಪ್ಪುದಾರಿಗೆಳೆಯುವ, ವಂಚನೆಯ ಅಥವಾ ಕಾನೂನುಬಾಹಿರ ವಿಷಯವನ್ನು ಪೋಸ್ಟ್ ಮಾಡಬೇಡಿ.'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-blue-600 dark:text-blue-400 flex-shrink-0">•</span>
                <span>
                  {language === 'en' 
                    ? 'Respect other users and maintain community standards.'
                    : 'ಇತರ ಬಳಕೆದಾರರನ್ನು ಗೌರವಿಸಿ ಮತ್ತು ಸಮುದಾಯ ಮಾನದಂಡಗಳನ್ನು ನಿರ್ವಹಿಸಿ.'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-blue-600 dark:text-blue-400 flex-shrink-0">•</span>
                <span>
                  {language === 'en' 
                    ? 'Keep your account credentials secure and confidential.'
                    : 'ನಿಮ್ಮ ಖಾತೆ ರುಜುವಾತುಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಮತ್ತು ಗೌಪ್ಯವಾಗಿ ಇರಿಸಿ.'}
                </span>
              </li>
            </ul>
          </Card>

          {/* Listings & Advertisements */}
          <Card className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 dark:text-white">
              {language === 'en' ? '2. Listings & Advertisements' : '೨. ಪಟ್ಟಿಗಳು ಮತ್ತು ಜಾಹೀರಾತುಗಳು'}
            </h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
              <li className="flex gap-2 md:gap-3">
                <span className="text-purple-600 dark:text-purple-400 flex-shrink-0">•</span>
                <span>
                  {language === 'en' 
                    ? 'All listings are subject to admin approval before being published.'
                    : 'ಎಲ್ಲಾ ಪಟ್ಟಿಗಳು ಪ್ರಕಟಿಸುವ ಮೊದಲು ನಿರ್ವಾಹಕರ ಅನುಮೋದನೆಗೆ ಒಳಪಟ್ಟಿವೆ.'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-purple-600 dark:text-purple-400 flex-shrink-0">•</span>
                <span>
                  {language === 'en' 
                    ? 'We reserve the right to reject or remove any content that violates our policies.'
                    : 'ನಮ್ಮ ನೀತಿಗಳನ್ನು ಉಲ್ಲಂಘಿಸುವ ಯಾವುದೇ ವಿಷಯವನ್ನು ತಿರಸ್ಕರಿಸಲು ಅಥವಾ ತೆಗೆದುಹಾಕಲು ನಾವು ಹಕ್ಕನ್ನು ಹೊಂದಿದ್ದೇವೆ.'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-purple-600 dark:text-purple-400 flex-shrink-0">•</span>
                <span>
                  {language === 'en' 
                    ? 'You are responsible for the accuracy of prices, descriptions, and contact information.'
                    : 'ಬೆಲೆಗಳು, ವಿವರಣೆಗಳು ಮತ್ತು ಸಂಪರ್ಕ ಮಾಹಿತಿಯ ನಿಖರತೆಗೆ ನೀವು ಜವಾಬ್ದಾರರು.'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-purple-600 dark:text-purple-400 flex-shrink-0">•</span>
                <span>
                  {language === 'en' 
                    ? 'Photos and videos must be genuine and relevant to your listing.'
                    : 'ಫೋಟೋಗಳು ಮತ್ತು ವೀಡಿಯೊಗಳು ನಿಜವಾದ ಮತ್ತು ನಿಮ್ಮ ಪಟ್ಟಿಗೆ ಸಂಬಂಧಿಸಿರಬೇಕು.'}
                </span>
              </li>
            </ul>
          </Card>

          {/* Prohibited Content */}
          <Card className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 dark:text-white">
              {language === 'en' ? '3. Prohibited Content' : '೩. ನಿಷೇಧಿತ ವಿಷಯ'}
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2">
              {language === 'en' 
                ? 'The following types of content are strictly prohibited:'
                : 'ಈ ಕೆಳಗಿನ ಪ್ರಕಾರದ ವಿಷಯವನ್ನು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ನಿಷೇಧಿಸಲಾಗಿದೆ:'}
            </p>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
              <li className="flex gap-2 md:gap-3">
                <span className="text-red-600 dark:text-red-400">✗</span>
                <span>
                  {language === 'en' 
                    ? 'Illegal goods or services'
                    : 'ಅಕ್ರಮ ಸರಕುಗಳು ಅಥವಾ ಸೇವೆಗಳು'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-red-600 dark:text-red-400">✗</span>
                <span>
                  {language === 'en' 
                    ? 'Adult or explicit content'
                    : 'ವಯಸ್ಕ ಅಥವಾ ಸ್ಪಷ್ಟ ವಿಷಯ'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-red-600 dark:text-red-400">✗</span>
                <span>
                  {language === 'en' 
                    ? 'Hate speech or discriminatory content'
                    : 'ದ್ವೇಷದ ಭಾಷಣ ಅಥವಾ ತಾರತಮ್ಯದ ವಿಷಯ'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-red-600 dark:text-red-400">✗</span>
                <span>
                  {language === 'en' 
                    ? 'Spam or duplicate listings'
                    : 'ಸ್ಪ್ಯಾಮ್ ಅಥವಾ ನಕಲು ಪಟ್ಟಿಗಳು'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-red-600 dark:text-red-400">✗</span>
                <span>
                  {language === 'en' 
                    ? 'Counterfeit or stolen items'
                    : 'ನಕಲಿ ಅಥವಾ ಕಳ್ಳತನದ ವಸ್ತುಗಳು'}
                </span>
              </li>
            </ul>
          </Card>

          {/* Privacy & Data */}
          <Card className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 dark:text-white">
              {language === 'en' ? '4. Privacy & Data Protection' : '೪. ಗೌಪ್ಯತೆ ಮತ್ತು ಡೇಟಾ ರಕ್ಷಣೆ'}
            </h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
              <li className="flex gap-2 md:gap-3">
                <span className="text-green-600 dark:text-green-400">•</span>
                <span>
                  {language === 'en' 
                    ? 'Your personal information is kept secure and confidential.'
                    : 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಸುರಕ್ಷಿತ ಮತ್ತು ಗೌಪ್ಯವಾಗಿ ಇರಿಸಲಾಗುತ್ತದೆ.'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-green-600 dark:text-green-400">•</span>
                <span>
                  {language === 'en' 
                    ? 'We do not sell or share your data with third parties without consent.'
                    : 'ನಾವು ನಿಮ್ಮ ಸಮ್ಮತಿ ಇಲ್ಲದೆ ನಿಮ್ಮ ಡೇಟಾವನ್ನು ಮೂರನೇ ವ್ಯಕ್ತಿಗಳೊಂದಿಗೆ ಮಾರಾಟ ಅಥವಾ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ.'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-green-600 dark:text-green-400">•</span>
                <span>
                  {language === 'en' 
                    ? 'Contact information in listings is visible to all users.'
                    : 'ಪಟ್ಟಿಗಳಲ್ಲಿನ ಸಂಪರ್ಕ ಮಾಹಿತಿ ಎಲ್ಲಾ ಬಳಕೆದಾರರಿಗೆ ಗೋಚರಿಸುತ್ತದೆ.'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-green-600 dark:text-green-400">•</span>
                <span>
                  {language === 'en' 
                    ? 'You can request deletion of your account and data at any time.'
                    : 'ನೀವು ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮ ಖಾತೆ ಮತ್ತು ಡೇಟಾವನ್ನು ಅಳಿಸಲು ವಿನಂತಿಸಬಹುದು.'}
                </span>
              </li>
            </ul>
          </Card>

          {/* Liability */}
          <Card className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 dark:text-white">
              {language === 'en' ? '5. Limitation of Liability' : '೫. ಹೊಣೆಗಾರಿಕೆಯ ಮಿತಿ'}
            </h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
              <li className="flex gap-2 md:gap-3">
                <span className="text-orange-600 dark:text-orange-400">•</span>
                <span>
                  {language === 'en' 
                    ? 'Namma Kumata is a platform connecting buyers and sellers. We are not responsible for transactions.'
                    : 'ನಮ್ಮ ಕುಮಟ ಖರೀದಿದಾರರು ಮತ್ತು ಮಾರಾಟಗಾರರನ್ನು ಸಂಪರ್ಕಿಸುವ ವೇದಿಕೆಯಾಗಿದೆ. ವಹಿವಾಟುಗಳಿಗೆ ನಾವು ಜವಾಬ್ದಾರರಲ್ಲ.'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-orange-600 dark:text-orange-400">•</span>
                <span>
                  {language === 'en' 
                    ? 'Verify all details before making purchases or commitments.'
                    : 'ಖರೀದಿ ಅಥವಾ ಬದ್ಧತೆಗಳನ್ನು ಮಾಡುವ ಮೊದಲು ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.'}
                </span>
              </li>
              <li className="flex gap-2 md:gap-3">
                <span className="text-orange-600 dark:text-orange-400">•</span>
                <span>
                  {language === 'en' 
                    ? 'We are not liable for disputes between users.'
                    : 'ಬಳಕೆದಾರರ ನಡುವಿನ ವಿವಾದಗಳಿಗೆ ನಾವು ಜವಾಬ್ದಾರರಲ್ಲ.'}
                </span>
              </li>
            </ul>
          </Card>

          {/* Changes to Terms */}
          <Card className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 dark:text-white">
              {language === 'en' ? '6. Changes to Terms' : '೬. ನಿಯಮಗಳಿಗೆ ಬದಲಾವಣೆಗಳು'}
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              {language === 'en' 
                ? 'We may update these terms from time to time. Continued use of the app indicates acceptance of updated terms. We will notify users of significant changes through the app.'
                : 'ನಾವು ಕಾಲಕಾಲಕ್ಕೆ ಈ ನಿಯಮಗಳನ್ನು ನವೀಕರಿಸಬಹುದು. ಅಪ್ಲಿಕೇಶನ್‌ನ ನಿರಂತರ ಬಳಕೆಯು ನವೀಕರಿಸಿದ ನಿಯಮಗಳ ಸ್ವೀಕಾರವನ್ನು ಸೂಚಿಸುತ್ತದೆ. ಅಪ್ಲಿಕೇಶನ್ ಮೂಲಕ ಗಮನಾರ್ಹ ಬದಲಾವಣೆಗಳ ಬಗ್ಗೆ ನಾವು ಬಳಕೆದಾರಿಗೆ ತಿಳಿಸುತ್ತೇವೆ.'}
            </p>
          </Card>

          {/* Contact */}
          <Card className="p-4 md:p-6 lg:p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <h3 className="font-semibold mb-3">
              {language === 'en' ? 'Questions About Terms?' : 'ನಿಯಮಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳು?'}
            </h3>
            <p className="text-sm md:text-base opacity-90 mb-4">
              {language === 'en' 
                ? 'If you have any questions about these terms, please contact us.'
                : 'ಈ ನಿಯಮಗಳ ಬಗ್ಗೆ ನಿಮಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿದ್ದರೆ, ದಯವಿಟ್ಟು ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.'}
            </p>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => onNavigate?.('contact-us')}
            >
              <Mail className="w-4 h-4 mr-2" />
              {t('contactUs')}
            </Button>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}