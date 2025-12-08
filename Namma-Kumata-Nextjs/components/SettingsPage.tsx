'use client';

import { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Smartphone,
  Mail,
  Phone,
  Key,
  Trash2,
  Moon,
  Sun,
  ChevronRight,
  Shield,
  Eye,
  EyeOff,
  MapPin,
  Heart,
  Info,
  FileText,
  Save
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface SettingsPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export function SettingsPage({ onBack, onNavigate }: SettingsPageProps) {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  // Settings State
  const [settings, setSettings] = useState({
    pushNotifications: true,
    newListings: true,
    newShops: true,
    advertisements: false,
    specialOffers: true,
    emailNotifications: false,
    showPhoneNumber: true,
    showEmail: true,
    profilePublic: true,
    locationServices: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Setting updated successfully!');
  };

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6 sm:translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    toggle, 
    onClick 
  }: { 
    icon: any; 
    title: string; 
    description?: string; 
    toggle?: { enabled: boolean; onToggle: () => void };
    onClick?: () => void;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-3 sm:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base text-gray-900 dark:text-white">
            {title}
          </p>
          {description && (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
              {description}
            </p>
          )}
        </div>
      </div>
      {toggle ? (
        <ToggleSwitch enabled={toggle.enabled} onToggle={toggle.onToggle} />
      ) : (
        <button onClick={onClick} className="flex-shrink-0">
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
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
                Settings
              </h1>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-24">
          
          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-base sm:text-lg text-gray-900 dark:text-white mb-3 px-2">
              👤 Account Settings
            </h2>
            <Card className="p-2 sm:p-3 mb-5 sm:mb-6 bg-white dark:bg-gray-900">
              <SettingItem
                icon={Mail}
                title="Change Email"
                description="Update your email address"
                onClick={() => toast.info('Change Email - Coming soon!')}
              />
              <SettingItem
                icon={Phone}
                title="Change Phone Number"
                description="Update your phone number"
                onClick={() => toast.info('Change Phone - Coming soon!')}
              />
              <SettingItem
                icon={Key}
                title="Change Password"
                description="Update your password"
                onClick={() => onNavigate?.('forgot-password')}
              />
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-base sm:text-lg text-gray-900 dark:text-white mb-3 px-2">
              🔔 Notifications
            </h2>
            <Card className="p-2 sm:p-3 mb-5 sm:mb-6 bg-white dark:bg-gray-900">
              <SettingItem
                icon={Bell}
                title="Push Notifications"
                description="Receive app notifications"
                toggle={{
                  enabled: settings.pushNotifications,
                  onToggle: () => handleToggle('pushNotifications')
                }}
              />
              <SettingItem
                icon={Smartphone}
                title="New Listings"
                description="Get alerts for new listings"
                toggle={{
                  enabled: settings.newListings,
                  onToggle: () => handleToggle('newListings')
                }}
              />
              <SettingItem
                icon={Smartphone}
                title="New Shops"
                description="Get alerts for new shops"
                toggle={{
                  enabled: settings.newShops,
                  onToggle: () => handleToggle('newShops')
                }}
              />
              <SettingItem
                icon={Smartphone}
                title="Advertisements"
                description="Receive ad notifications"
                toggle={{
                  enabled: settings.advertisements,
                  onToggle: () => handleToggle('advertisements')
                }}
              />
              <SettingItem
                icon={Heart}
                title="Special Offers"
                description="Get notified about offers"
                toggle={{
                  enabled: settings.specialOffers,
                  onToggle: () => handleToggle('specialOffers')
                }}
              />
              <SettingItem
                icon={Mail}
                title="Email Notifications"
                description="Receive emails"
                toggle={{
                  enabled: settings.emailNotifications,
                  onToggle: () => handleToggle('emailNotifications')
                }}
              />
            </Card>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-base sm:text-lg text-gray-900 dark:text-white mb-3 px-2">
              🔒 Privacy
            </h2>
            <Card className="p-2 sm:p-3 mb-5 sm:mb-6 bg-white dark:bg-gray-900">
              <SettingItem
                icon={Eye}
                title="Profile Visibility"
                description="Make profile public"
                toggle={{
                  enabled: settings.profilePublic,
                  onToggle: () => handleToggle('profilePublic')
                }}
              />
              <SettingItem
                icon={Phone}
                title="Show Phone Number"
                description="Display on your profile"
                toggle={{
                  enabled: settings.showPhoneNumber,
                  onToggle: () => handleToggle('showPhoneNumber')
                }}
              />
              <SettingItem
                icon={Mail}
                title="Show Email"
                description="Display on your profile"
                toggle={{
                  enabled: settings.showEmail,
                  onToggle: () => handleToggle('showEmail')
                }}
              />
              <SettingItem
                icon={Shield}
                title="Two-Factor Authentication"
                description="Add extra security"
                onClick={() => toast.info('2FA - Coming soon!')}
              />
            </Card>
          </motion.div>

          {/* App Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-base sm:text-lg text-gray-900 dark:text-white mb-3 px-2">
              ⚙️ App Preferences
            </h2>
            <Card className="p-2 sm:p-3 mb-5 sm:mb-6 bg-white dark:bg-gray-900">
              <SettingItem
                icon={Globe}
                title="Language"
                description={language === 'en' ? 'English' : 'ಕನ್ನಡ'}
                onClick={() => {
                  toggleLanguage();
                  toast.success(language === 'en' ? 'Language changed to Kannada' : 'Language changed to English');
                }}
              />
              <SettingItem
                icon={theme === 'dark' ? Moon : Sun}
                title="Theme"
                description={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                onClick={() => {
                  toggleTheme();
                  toast.success(theme === 'dark' ? 'Switched to Light Mode' : 'Switched to Dark Mode');
                }}
              />
              <SettingItem
                icon={MapPin}
                title="Location Services"
                description="Enable location access"
                toggle={{
                  enabled: settings.locationServices,
                  onToggle: () => handleToggle('locationServices')
                }}
              />
            </Card>
          </motion.div>

          {/* About & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-base sm:text-lg text-gray-900 dark:text-white mb-3 px-2">
              ℹ️ About & Legal
            </h2>
            <Card className="p-2 sm:p-3 mb-5 sm:mb-6 bg-white dark:bg-gray-900">
              <SettingItem
                icon={Info}
                title="About Namma Kumta"
                description="Learn more about us"
                onClick={() => onNavigate?.('about')}
              />
              <SettingItem
                icon={Smartphone}
                title="App Version"
                description="v1.0.0"
                onClick={() => toast.info('You are on the latest version!')}
              />
              <SettingItem
                icon={FileText}
                title="Privacy Policy"
                description="Read our privacy policy"
                onClick={() => onNavigate?.('privacy-policy')}
              />
              <SettingItem
                icon={FileText}
                title="Terms & Conditions"
                description="Read our terms"
                onClick={() => onNavigate?.('terms-conditions')}
              />
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-base sm:text-lg text-red-600 dark:text-red-400 mb-3 px-2">
              ⚠️ Danger Zone
            </h2>
            <Card className="p-4 sm:p-5 mb-5 sm:mb-6 bg-white dark:bg-gray-900 border-red-200 dark:border-red-900">
              <Button
                variant="outline"
                className="w-full border-red-300 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 h-11 sm:h-12 text-sm sm:text-base"
                onClick={() => {
                  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                    toast.error('Account deletion - Contact admin to proceed');
                  }
                }}
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Delete Account
              </Button>
            </Card>
          </motion.div>

        </div>
      </ScrollArea>
    </div>
  );
}
