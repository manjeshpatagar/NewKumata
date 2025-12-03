import { Clock, CheckCircle, XCircle, Calendar, Eye } from 'lucide-react';
// PAYMENT IMPORTS - COMMENTED OUT FOR FUTURE USE
// import { CreditCard, IndianRupee, AlertCircle, Smartphone, QrCode, Wallet, CreditCard as CardIcon, Copy, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
// import { Button } from './ui/button';
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
import { useAdmin } from '../contexts/AdminContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
// import { toast } from 'sonner@2.0.3';

export function MyAdsSection() {
  const { ads } = useAdmin();
  const { user } = useAuth();
  const { language } = useLanguage();
  
  /* PAYMENT FUNCTIONALITY - COMMENTED OUT FOR FUTURE USE
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedAd, setSelectedAd] = useState<{ id: string; amount: number } | null>(null);
  const [paymentStep, setPaymentStep] = useState<'method' | 'processing' | 'success'>('method');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('upi');
  const [copied, setCopied] = useState(false);
  */
  
  // Filter ads for current user
  const myAds = ads.filter(ad => ad.owner === user?.name);

  const getStatusBadge = (status: string) => {
    // Simplified status badges without payment system
    if (status === 'pending') {
      return <Badge className="bg-amber-500 text-white">
        <Clock className="w-3 h-3 mr-1" />
        {language === 'en' ? 'Pending Approval' : 'ಅನುಮೋದನೆ ಬಾಕಿ'}
      </Badge>;
    }
    if (status === 'approved') {
      return <Badge className="bg-green-500 text-white">
        <CheckCircle className="w-3 h-3 mr-1" />
        {language === 'en' ? 'Approved & Live' : 'ಅನುಮೋದಿಸಲಾಗಿದೆ ಮತ್ತು ಲೈವ್'}
      </Badge>;
    }
    if (status === 'rejected') {
      return <Badge className="bg-red-500 text-white">
        <XCircle className="w-3 h-3 mr-1" />
        {language === 'en' ? 'Rejected' : 'ತಿರಸ್ಕರಿಸಲಾಗಿದೆ'}
      </Badge>;
    }
    if (status === 'expired') {
      return <Badge className="bg-gray-500 text-white">
        <Clock className="w-3 h-3 mr-1" />
        {language === 'en' ? 'Expired' : 'ಅವಧಿ ಮುಗಿದಿದೆ'}
      </Badge>;
    }
    return null;
  };

  const getDurationText = (duration?: string) => {
    if (!duration) return '';
    const map: Record<string, string> = {
      '1day': language === 'en' ? '1 Day' : '೧ ದಿನ',
      '3days': language === 'en' ? '3 Days' : '೩ ದಿನಗಳು',
      '1week': language === 'en' ? '1 Week' : '೧ ವಾರ',
      '1month': language === 'en' ? '1 Month' : '೧ ತಿಂಗಳು',
    };
    return map[duration] || duration;
  };

  if (myAds.length === 0) {
    return (
      <div className="text-center py-12">
        <Eye className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
        <p className="text-gray-500 dark:text-gray-400">
          {language === 'en' ? 'You have no advertisements yet' : 'ನೀವು ಇನ್ನೂ ಯಾವುದೇ ಜಾಹೀರಾತುಗಳನ್ನು ಹೊಂದಿಲ್ಲ'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl dark:text-white mb-4">
        {language === 'en' ? 'My Advertisements' : 'ನನ್ನ ಜಾಹೀರಾತುಗಳು'}
      </h2>

      {myAds.map((ad) => (
        <Card key={ad.id} className="p-4 dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <h3 className="font-semibold dark:text-white mb-2">{ad.title}</h3>
              {getStatusBadge(ad.status)}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{language === 'en' ? 'Submitted:' : 'ಸಲ್ಲಿಸಲಾಗಿದೆ:'} {new Date(ad.submittedDate).toLocaleDateString()}</span>
            </div>

            {ad.duration && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{language === 'en' ? 'Duration:' : 'ಅವಧಿ:'} {getDurationText(ad.duration)}</span>
              </div>
            )}

            {ad.approvedDate && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle className="w-4 h-4" />
                <span>{language === 'en' ? 'Approved:' : 'ಅನುಮೋದನೆ:'} {new Date(ad.approvedDate).toLocaleDateString()}</span>
              </div>
            )}

            {ad.expiryDate && ad.status === 'approved' && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {language === 'en' ? 'Expires on:' : 'ಮುಕ್ತಾಯ ದಿನಾಂಕ:'} 
                </span>
                <span className="font-medium dark:text-white">{new Date(ad.expiryDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Status Messages */}
          {ad.status === 'pending' && (
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {language === 'en' 
                  ? 'Your ad request has been submitted. Waiting for admin approval. You will be notified once approved.' 
                  : 'ನಿಮ್ಮ ಜಾಹೀರಾತು ವಿನಂತಿ ಸಲ್ಲಿಸಲಾಗಿದೆ. ನಿರ್ವಾಹಕ ಅನುಮೋದನೆಗಾಗಿ ಕಾಯುತ್ತಿದೆ.'}
              </p>
            </div>
          )}

          {ad.status === 'approved' && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {language === 'en' 
                  ? '🎉 Your ad has been approved and is now live on the advertisement page!' 
                  : '🎉 ನಿಮ್ಮ ಜಾಹೀರಾತು ಅನುಮೋದಿಸಲಾಗಿದೆ ಮತ್ತು ಈಗ ಜಾಹೀರಾತು ಪುಟದಲ್ಲಿ ಲೈವ್ ಆಗಿದೆ!'}
              </p>
            </div>
          )}

          {ad.status === 'rejected' && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-700 dark:text-red-400 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                {language === 'en' 
                  ? 'Your ad was rejected by admin. Please contact support for more details.' 
                  : 'ನಿಮ್ಮ ಜಾಹೀರಾತನ್ನು ನಿರ್ವಾಹಕರು ತಿರಸ್ಕರಿಸಿದ್ದಾರೆ. ಹೆಚ್ಚಿನ ವಿವರಗಳಿಗಾಗಿ ಸಹಾಯವನ್ನು ಸಂಪರ್ಕಿಸಿ.'}
              </p>
            </div>
          )}

          {ad.status === 'expired' && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {language === 'en' 
                  ? 'Your ad has expired. Contact admin to renew or extend it.' 
                  : 'ನಿಮ್ಮ ಜಾಹೀರಾತು ಅವಧಿ ಮುಗಿದಿದೆ. ನವೀಕರಿಸಲು ನಿರ್ವಾಹಕರನ್ನು ಸಂಪರ್ಕಿಸಿ.'}
              </p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
