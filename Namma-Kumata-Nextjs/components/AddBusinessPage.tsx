'use client';

import { ArrowLeft, Store, Users, TrendingUp, Star, Phone, Mail, MessageCircle, CheckCircle2, MapPin, Clock, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';

interface AddBusinessPageProps {
  onBack: () => void;
}

export function AddBusinessPage({ onBack }: AddBusinessPageProps) {
  const { t } = useLanguage();

  const handleWhatsAppClick = () => {
    const phoneNumber = '919876543210';
    const message = encodeURIComponent(
      `Hello Namma Kumta Admin! 👋\n\nI want to list my business on Namma Kumta.\n\n📋 *Business Details*:\n\n🏪 Business Name: \n📍 Category: (Grocery/Medical/Temple/Tourism/Furniture/Services)\n📍 Location/Address: \n📞 Contact Number: \n✉️ Email: \n⏰ Business Hours: \n📝 Description: \n\nPlease guide me through the listing process.\n\nThank you! 🙏`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+919876543210';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:admin@nammakumta.com?subject=Business Listing Request&body=Hello, I would like to list my business on Namma Kumta.';
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50 dark:bg-gray-950">
      {/* Header */}
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
                Add Your Business
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                Join Namma Kumta community
              </p>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-24 sm:pb-28">
          
          {/* Hero Section */}
          <div className="mb-4 sm:mb-6 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <Store className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-900 dark:text-white mb-2 sm:mb-3 px-2">
              Grow Your Business with Namma Kumta
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto px-2">
              Reach thousands of local customers actively searching for businesses like yours. Get listed today!
            </p>
          </div>

          {/* Benefits */}
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6 bg-white dark:bg-gray-900">
            <h3 className="text-base sm:text-lg text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              <span>Why List Your Business?</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <BenefitCard 
                icon={Users}
                title="Reach Local Customers"
                description="Connect with people in Kumta area looking for your services"
                color="blue"
              />
              <BenefitCard 
                icon={TrendingUp}
                title="Increase Visibility"
                description="Stand out in search results and get discovered easily"
                color="green"
              />
              <BenefitCard 
                icon={Star}
                title="Build Trust"
                description="Showcase ratings and reviews from satisfied customers"
                color="yellow"
              />
              <BenefitCard 
                icon={MapPin}
                title="Local Presence"
                description="Help customers find your exact location on the map"
                color="red"
              />
            </div>
          </Card>

          {/* What Customers Say */}
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
            <h3 className="text-base sm:text-lg text-gray-900 dark:text-white mb-3 sm:mb-4">
              📢 What Your Customers Are Saying
            </h3>
            
            <div className="space-y-2 sm:space-y-3">
              <Testimonial text="I found the perfect dental clinic near me through Namma Kumta!" />
              <Testimonial text="Love discovering new local shops and temples in my area." />
              <Testimonial text="This app made it so easy to find quality services nearby!" />
            </div>
          </Card>

          {/* Contact Admin Section */}
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6 bg-white dark:bg-gray-900">
            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs sm:text-sm text-blue-700 dark:text-blue-300 mb-3 sm:mb-4">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Admin approval required</span>
              </div>
              <h3 className="text-lg sm:text-xl text-gray-900 dark:text-white mb-1 sm:mb-2">
                Ready to Get Listed?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-2">
                Contact our admin team to start the listing process
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full p-3 sm:p-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg sm:rounded-xl transition-all hover:shadow-lg flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base">WhatsApp Admin</p>
                    <p className="text-xs sm:text-sm text-white/80">Send message instantly</p>
                  </div>
                </div>
                <div className="text-white/60 group-hover:text-white transition-colors text-lg sm:text-xl">
                  →
                </div>
              </button>

              {/* Call */}
              <button
                onClick={handleCallClick}
                className="w-full p-3 sm:p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base text-gray-900 dark:text-white">Call Admin</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">+91 9876543210</p>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors text-lg sm:text-xl">
                  →
                </div>
              </button>

              {/* Email */}
              <button
                onClick={handleEmailClick}
                className="w-full p-3 sm:p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm sm:text-base text-gray-900 dark:text-white">Email Admin</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">admin@nammakumta.com</p>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors text-lg sm:text-xl flex-shrink-0">
                  →
                </div>
              </button>
            </div>
          </Card>

          {/* What We Need */}
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6 bg-white dark:bg-gray-900">
            <h3 className="text-base sm:text-lg text-gray-900 dark:text-white mb-3 sm:mb-4">
              📋 Information We'll Need
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <InfoItem text="Business Name" />
              <InfoItem text="Category Type" />
              <InfoItem text="Complete Address" />
              <InfoItem text="Contact Number" />
              <InfoItem text="Email Address" />
              <InfoItem text="Business Hours" />
              <InfoItem text="Short Description" />
              <InfoItem text="Photos (optional)" />
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
            <StatCard number="500+" label="Businesses" />
            <StatCard number="10K+" label="Users" />
            <StatCard number="24h" label="Approval" />
          </div>

          {/* Pro Tip */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex gap-2 sm:gap-3">
              <div className="text-xl sm:text-2xl flex-shrink-0">💡</div>
              <div>
                <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-medium mb-1">
                  Pro Tip
                </p>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Have your business photos and complete details ready for faster approval and better listing quality!
                </p>
              </div>
            </div>
          </div>

        </div>
      </ScrollArea>
    </div>
  );
}

// Benefit Card Component
function BenefitCard({ 
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
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  };

  return (
    <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <div className={`w-9 h-9 sm:w-10 sm:h-10 mb-2 sm:mb-3 rounded-lg flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <p className="text-sm sm:text-base text-gray-900 dark:text-white mb-1">
        {title}
      </p>
      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

// Testimonial Component
function Testimonial({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
      <div className="text-base sm:text-lg flex-shrink-0">💬</div>
      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 italic pt-0.5">
        "{text}"
      </p>
    </div>
  );
}

// Info Item Component
function InfoItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 py-1">
      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
}

// Stat Card Component
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center p-3 sm:p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
      <p className="text-lg sm:text-xl md:text-2xl text-blue-600 dark:text-blue-400 mb-0.5 sm:mb-1">
        {number}
      </p>
      <p className="text-xs text-gray-600 dark:text-gray-400">
        {label}
      </p>
    </div>
  );
}
