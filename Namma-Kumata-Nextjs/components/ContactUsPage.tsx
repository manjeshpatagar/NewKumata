'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Phone, MapPin, MessageCircle, Send, Clock, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';
import { useState } from 'react';

export function ContactUsPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ');
      return;
    }

    toast.success(language === 'en' ? 'Message sent successfully! We\'ll get back to you soon.' : 'ಸಂದೇಶ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ! ನಾವು ಶೀಘ್ರದಲ್ಲೇ ��ಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col w-full max-w-7xl mx-auto bg-gradient-to-b from-green-50 to-blue-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 lg:p-8 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b dark:border-gray-800 sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="md:h-10 md:w-10">
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
          <h1 className="dark:text-white text-lg md:text-xl lg:text-2xl">{t('contactUs')}</h1>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 pb-20 md:pb-24">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {/* Phone */}
            <Card className="p-4 md:p-5 lg:p-6 dark:bg-gray-900 dark:border-gray-800">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 md:w-7 md:h-7 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-semibold dark:text-white">
                    {language === 'en' ? 'Phone' : 'ಫೋನ್'}
                  </h3>
                  <a href="tel:+918386255555" className="text-sm md:text-base text-blue-600 dark:text-blue-400 hover:underline block truncate">
                    +91 83862 55555
                  </a>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="md:h-10 md:px-4"
                  onClick={() => window.open('tel:+918386255555')}
                >
                  <span className="hidden md:inline">{language === 'en' ? 'Call' : 'ಕರೆ'}</span>
                  <Phone className="w-4 h-4 md:hidden" />
                </Button>
              </div>
            </Card>

            {/* WhatsApp */}
            <Card className="p-4 md:p-5 lg:p-6 dark:bg-gray-900 dark:border-gray-800">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-semibold dark:text-white">WhatsApp</h3>
                  <a href="https://wa.me/918386255555" className="text-sm md:text-base text-blue-600 dark:text-blue-400 hover:underline block truncate">
                    +91 83862 55555
                  </a>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-emerald-50 dark:bg-emerald-900/20 md:h-10 md:px-4"
                  onClick={() => window.open('https://wa.me/918386255555')}
                >
                  <span className="hidden md:inline">{language === 'en' ? 'Chat' : 'ಚಾಟ್'}</span>
                  <MessageCircle className="w-4 h-4 md:hidden" />
                </Button>
              </div>
            </Card>

            {/* Email */}
            <Card className="p-4 md:p-5 lg:p-6 dark:bg-gray-900 dark:border-gray-800">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 md:w-7 md:h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-semibold dark:text-white">
                    {language === 'en' ? 'Email' : 'ಇಮೇಲ್'}
                  </h3>
                  <a href="mailto:support@nammakumata.com" className="text-sm md:text-base text-blue-600 dark:text-blue-400 hover:underline block truncate">
                    support@nammakumata.com
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Location & Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* Location */}
            <Card className="p-4 md:p-5 lg:p-6 dark:bg-gray-900 dark:border-gray-800">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 md:w-7 md:h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-semibold dark:text-white mb-1 md:mb-2">
                    {language === 'en' ? 'Address' : 'ವಿಳಾಸ'}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    {language === 'en' 
                      ? 'Kumta, Uttara Kannada District, Karnataka - 581343'
                      : 'ಕುಮಟ, ಉತ್ತರ ಕನ್ನಡ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ - 581343'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Business Hours */}
            <Card className="p-4 md:p-5 lg:p-6 dark:bg-gray-900 dark:border-gray-800">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 md:w-7 md:h-7 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-semibold dark:text-white mb-2 md:mb-3">
                    {language === 'en' ? 'Support Hours' : 'ಬೆಂಬಲ ಸಮಯ'}
                  </h3>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 space-y-1">
                    <p>
                      {language === 'en' ? 'Monday - Saturday: 9:00 AM - 8:00 PM' : 'ಸೋಮವಾರ - ಶನಿವಾರ: ಬೆಳಿಗ್ಗೆ 9:00 - ರಾತ್ರಿ 8:00'}
                    </p>
                    <p>
                      {language === 'en' ? 'Sunday: 10:00 AM - 6:00 PM' : 'ಭಾನುವಾರ: ಬೆಳಿಗ್ಗೆ 10:00 - ಸಂಜೆ 6:00'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-4 md:p-6 lg:p-8 dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-4 md:mb-6 dark:text-white flex items-center gap-2">
              <Send className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
              {language === 'en' ? 'Send us a Message' : 'ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <Label htmlFor="name" className="dark:text-gray-200 text-sm md:text-base">
                    {language === 'en' ? 'Your Name' : 'ನಿಮ್ಮ ಹೆಸರು'} *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'en' ? 'Enter your name' : 'ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ'}
                    className="dark:bg-gray-800 dark:border-gray-700 md:h-12 md:text-base"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="dark:text-gray-200 text-sm md:text-base">
                    {language === 'en' ? 'Email Address' : 'ಇಮೇಲ್ ವಿಳಾಸ'} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={language === 'en' ? 'your.email@example.com' : 'ನಿಮ್ಮ.ಇಮೇಲ್@example.com'}
                    className="dark:bg-gray-800 dark:border-gray-700 md:h-12 md:text-base"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <Label htmlFor="phone" className="dark:text-gray-200 text-sm md:text-base">
                    {language === 'en' ? 'Phone Number' : 'ಫೋನ್ ಸಂಖ್ಯೆ'}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="dark:bg-gray-800 dark:border-gray-700 md:h-12 md:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="dark:text-gray-200 text-sm md:text-base">
                    {language === 'en' ? 'Subject' : 'ವಿಷಯ'}
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={language === 'en' ? 'What is this about?' : 'ಇದು ಯಾವ ಬಗ್ಗೆ?'}
                    className="dark:bg-gray-800 dark:border-gray-700 md:h-12 md:text-base"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="dark:text-gray-200 text-sm md:text-base">
                  {language === 'en' ? 'Message' : 'ಸಂದೇಶ'} *
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={language === 'en' ? 'Tell us more about your inquiry...' : 'ನಿಮ್ಮ ವಿಚಾರಣೆಯ ಬಗ್ಗೆ ಹೆಚ್ಚು ತಿಳಿಸಿ...'}
                  rows={5}
                  className="dark:bg-gray-800 dark:border-gray-700 md:text-base resize-none"
                  required
                />
              </div>

              <Button type="submit" className="w-full md:h-12 md:text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                {language === 'en' ? 'Send Message' : 'ಸಂದೇಶ ಕಳುಹಿಸಿ'}
              </Button>
            </form>
          </Card>

          {/* Social Media (Optional) */}
          <Card className="p-6 md:p-8 lg:p-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Globe className="w-5 h-5 md:w-6 md:h-6" />
              <h3 className="font-semibold md:text-lg lg:text-xl">
                {language === 'en' ? 'Connect With Us' : 'ನಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕದಲ್ಲಿರಿ'}
              </h3>
            </div>
            <p className="text-sm md:text-base opacity-90">
              {language === 'en' 
                ? 'We\'re here to help! Reach out through any channel and we\'ll respond within 24 hours.'
                : 'ನಾವು ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇವೆ! ಯಾವುದೇ ಮಾಧ್ಯಮದ ಮೂಲಕ ತಲುಪಿ ಮತ್ತು 24 ಗಂಟೆಗಳಲ್ಲಿ ನಾವು ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತೇವೆ.'}
            </p>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}