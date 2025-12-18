/**
 * AddListingPage – INFO ONLY
 * 
 * Users cannot add listings directly.
 * To advertise or promote shops, they must contact admin.
 */

'use client';

import { Phone, Mail, Megaphone, ArrowLeft } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function AddListingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:to-gray-900">
      
      <Card className="relative max-w-md w-full p-6 sm:p-8 rounded-3xl shadow-2xl bg-white dark:bg-gray-900 border-0">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
          <Megaphone className="w-8 h-8 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Promote Your Shop
        </h1>

        {/* English Content */}
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
          Want more customers for your shop or business?  
          Advertise with us and reach more people easily.
        </p>

        {/* Kannada Content */}
        <p className="text-center text-gray-700 dark:text-gray-300 text-sm mb-6 leading-relaxed">
          ನಿಮ್ಮ ಅಂಗಡಿ ಅಥವಾ ವ್ಯವಹಾರವನ್ನು ಪ್ರಚಾರ ಮಾಡಬೇಕಾ?  
          ಜಾಹೀರಾತಿಗಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ – ಸುಲಭ ಮತ್ತು ವೇಗವಾದ ಸೇವೆ.
        </p>

        {/* Highlights */}
        <div className="space-y-2 mb-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          <p>✅ Easy to post / ಸುಲಭವಾಗಿ ಪೋಸ್ಟ್ ಮಾಡಬಹುದು</p>
          <p>✅ Fast approval / ವೇಗವಾದ ಅನುಮೋದನೆ</p>
          <p>✅ 24/7 support / 24 ಗಂಟೆ ಸಹಾಯ</p>
        </div>

        {/* Contact Buttons */}
        <div className="space-y-3">
          <Button className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base">
            <Phone className="w-4 h-4 mr-2" />
            Call: +91 98765 43210
          </Button>

          <Button
            variant="outline"
            className="w-full rounded-xl text-sm sm:text-base"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email: ads@yourdomain.com
          </Button>
        </div>

        {/* Footer Note */}
        <p className="mt-5 text-xs text-center text-gray-500 dark:text-gray-400">
          Our team will guide you step by step to promote your business.
        </p>

      </Card>
    </div>
  );
}
