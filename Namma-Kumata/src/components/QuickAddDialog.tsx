import { Megaphone, Store, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';

interface QuickAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export function QuickAddDialog({ isOpen, onClose, onNavigate }: QuickAddDialogProps) {
  const { t } = useLanguage();
  const handleAddAdvertisement = () => {
    onClose();
    onNavigate('add-advertisement');
  };

  const handleAddListing = () => {
    onClose();
    onNavigate('add-listing');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-2">
        <DialogHeader>
          <DialogTitle className="text-center text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ✨ {t('whatWouldYouLikeToAdd')}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600 dark:text-gray-400">
            {t('chooseWhatToAdd')} {t('appName')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Add Advertisement Option */}
          <Card 
            className="group relative overflow-hidden p-6 cursor-pointer border-2 border-transparent hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30"
            onClick={handleAddAdvertisement}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            
            <div className="relative flex items-center gap-4">
              <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Megaphone className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {t('addAdvertisement')}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {t('postAdsDescription')}
                </p>
              </div>
              
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-white">→</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Add New Listing Option */}
          <Card 
            className="group relative overflow-hidden p-6 cursor-pointer border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30"
            onClick={handleAddListing}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            
            <div className="relative flex items-center gap-4">
              <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Store className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {t('addNewListing')}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {t('listYourBusiness')}
                </p>
              </div>
              
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white">→</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Button
          variant="ghost"
          className="w-full"
          onClick={onClose}
        >
          {t('cancel')}
        </Button>
      </DialogContent>
    </Dialog>
  );
}