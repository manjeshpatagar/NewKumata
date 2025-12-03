'use client';

/**
 * AddAdvertisementPage - Contact Admin via WhatsApp
 * 
 * This page guides users to contact the admin team via WhatsApp
 * to submit their advertisement details for review and publishing.
 */

import { ArrowLeft, MessageCircle, Shield, Clock, CheckCircle2, FileText, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface AddAdvertisementPageProps {
  onBack: () => void;
  onSuccess: () => void;
  onNavigate?: (page: string) => void;
}

export function AddAdvertisementPage({ onBack }: AddAdvertisementPageProps) {
  const { t } = useLanguage();

  const handleWhatsAppClick = () => {
    const phoneNumber = '919876543210'; // Replace with actual admin WhatsApp number
    const message = encodeURIComponent(
      `Hello Namma Kumta Admin Team! 👋\n\nI would like to post an advertisement.\n\nHere are the details:\n\n📌 *Category*: (e.g., Jobs, Home Rentals, Vehicles, etc.)\n📝 *Title*: \n💬 *Description*: \n💰 *Price/Budget*: \n📍 *Location*: \n📞 *Contact Number*: \n⏰ *Duration*: (e.g., 1 week, 1 month)\n\nPlease let me know the next steps!\n\nThank you! 🙏`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50 dark:bg-gray-950">
      {/* Clean Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 flex-shrink-0">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-white truncate">
                Post Advertisement
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                Contact admin via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-32 sm:pb-36">
          
          {/* Main WhatsApp Card */}
          <Card className="p-5 sm:p-6 md:p-8 mb-4 sm:mb-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3">
                Send Details via WhatsApp
              </h2>
              
              <p className="text-white/90 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed px-2">
                Message our admin team with your advertisement details. We'll review and publish it within 24-48 hours.
              </p>

              <Button
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base bg-white text-green-600 hover:bg-gray-50 rounded-lg shadow-lg transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Open WhatsApp
              </Button>

              {/* Contact Info */}
              <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/20">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-white/30" />
                  <div className="text-white/80">
                    Available 9 AM - 9 PM
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* How It Works */}
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-base sm:text-lg text-gray-900 dark:text-white">
                How It Works
              </h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Step number="1" text="Click 'Open WhatsApp' button above" />
              <Step number="2" text="Send your ad details to admin" />
              <Step number="3" text="Admin reviews your advertisement" />
              <Step number="4" text="Your ad goes live in 24-48 hours" />
            </div>
          </Card>

          {/* What to Include */}
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-base sm:text-lg text-gray-900 dark:text-white">
                What to Include
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <InfoItem text="Category (Jobs, Cars, etc.)" />
              <InfoItem text="Advertisement Title" />
              <InfoItem text="Detailed Description" />
              <InfoItem text="Price/Budget" />
              <InfoItem text="Your Contact Number" />
              <InfoItem text="Location" />
              <InfoItem text="Duration (1 week - 1 month)" />
              <InfoItem text="Photos (optional)" />
            </div>
          </Card>

          {/* Why Admin Review */}
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-base sm:text-lg text-gray-900 dark:text-white">
                Why Admin Review?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <Benefit 
                icon={CheckCircle2}
                title="Quality Check"
                description="Verify all details"
                color="green"
              />
              <Benefit 
                icon={Shield}
                title="No Spam"
                description="Keep it clean"
                color="blue"
              />
              <Benefit 
                icon={Clock}
                title="Fast Review"
                description="24-48 hours"
                color="purple"
              />
            </div>
          </Card>

          {/* Pro Tip */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex gap-2 sm:gap-3">
              <div className="text-xl sm:text-2xl flex-shrink-0">💡</div>
              <div>
                <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium mb-1">
                  Pro Tip
                </p>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Include clear photos and complete details for faster approval and better results!
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Button */}
          <div className="fixed bottom-20 left-0 right-0 px-3 sm:px-4 z-40 pointer-events-none">
            <div className="max-w-3xl mx-auto pointer-events-auto">
              <Button
                onClick={handleWhatsAppClick}
                className="w-full h-12 sm:h-14 text-sm sm:text-base bg-green-600 hover:bg-green-700 text-white rounded-lg sm:rounded-xl shadow-lg transition-all hover:shadow-xl"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Contact Admin on WhatsApp
              </Button>
            </div>
          </div>

        </div>
      </ScrollArea>
    </div>
  );
}

// Step Component
function Step({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-start gap-2 sm:gap-3">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
        <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">{number}</span>
      </div>
      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 pt-1">
        {text}
      </p>
    </div>
  );
}

// Info Item Component
function InfoItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
}

// Benefit Component
function Benefit({ 
  icon: Icon, 
  title, 
  description, 
  color 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  color: string;
}) {
  const colorClasses = {
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <div className={`w-9 h-9 sm:w-10 sm:h-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <p className="text-xs sm:text-sm text-gray-900 dark:text-white mb-1">
        {title}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
