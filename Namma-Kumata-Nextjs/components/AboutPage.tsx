'use client';
import { ArrowLeft, Heart, Users, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { NammaKumtaLogo } from './NammaKumtaLogo';
import { motion } from 'motion/react';

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
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
            <h1 className="text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-white">
              About Namma Kumta
            </h1>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-24">
          
          {/* Logo & Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 sm:p-8 mb-5 sm:mb-6 text-center bg-gradient-to-br from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20">
              <div className="mb-4">
                <NammaKumtaLogo size="xl" showTagline={true} />
              </div>
              <h2 className="text-xl sm:text-2xl text-gray-900 dark:text-white mb-3">
                Welcome to Namma Kumta
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Your local community guide for discovering shops, temples, tourism spots, and connecting with local businesses in the Kumta area.
              </p>
            </Card>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-5 sm:p-6 mb-5 sm:mb-6 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg sm:text-xl text-gray-900 dark:text-white">
                  Our Mission
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                To bring the Kumta community together by providing a comprehensive platform where locals and visitors can easily discover and connect with local businesses, temples, tourism spots, and services. We believe in supporting local economy and making information accessible to everyone.
              </p>
            </Card>
          </motion.div>

          {/* What We Offer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-5 sm:p-6 mb-5 sm:mb-6 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg sm:text-xl text-gray-900 dark:text-white">
                  What We Offer
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white">Local Businesses:</strong> Discover shops, restaurants, services, and more in Kumta
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white">Temples & Spirituality:</strong> Find local temples and spiritual places
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white">Tourism:</strong> Explore tourist attractions and hidden gems
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white">Marketplace:</strong> Buy/sell vehicles, electronics, furniture, and more
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white">Jobs & Services:</strong> Find local jobs and services
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white">Multi-Language:</strong> Available in English and Kannada
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-5 sm:p-6 mb-5 sm:mb-6 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg sm:text-xl text-gray-900 dark:text-white">
                  Contact Us
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Kumta, Karnataka, India
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <a href="tel:+919876543210" className="text-sm sm:text-base text-blue-600 dark:text-blue-400 hover:underline">
                    +91 98765 43210
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <a href="mailto:info@nammakumta.com" className="text-sm sm:text-base text-blue-600 dark:text-blue-400 hover:underline">
                    info@nammakumta.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <a href="https://nammakumta.com" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-blue-600 dark:text-blue-400 hover:underline">
                    www.nammakumta.com
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Version Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-4 sm:p-5 bg-gray-100 dark:bg-gray-800 text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
                Namma Kumta App
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                Version 1.0.0 • © 2024 All Rights Reserved
              </p>
            </Card>
          </motion.div>

        </div>
      </ScrollArea>
    </div>
  );
}
