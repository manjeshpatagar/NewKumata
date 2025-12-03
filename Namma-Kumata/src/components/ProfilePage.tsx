import { ArrowLeft, Settings, Edit2, FileText, HelpCircle, Mail, ChevronRight, LogOut, Shield, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../contexts/AdminContext';
import { ThemeToggle } from './ThemeToggle';

interface ProfilePageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export function ProfilePage({ onBack, onNavigate }: ProfilePageProps) {
  const { t } = useLanguage();
  const { user: authUser, logout } = useAuth();
  const { isAdminLoggedIn } = useAdmin();
  const isAdmin = isAdminLoggedIn;
  
  // Use actual user from auth context
  const user = authUser || {
    name: 'Guest User',
    email: 'guest@email.com',
    phone: '+91 98765 43210',
    avatar: '',
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 flex-shrink-0">
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
                {t('profile')}
              </h1>
            </div>
            <div className="flex gap-2">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="icon"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => onNavigate?.('settings')}
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-24">
          
          {/* Profile Card */}
          <Card className="p-6 sm:p-8 mb-4 sm:mb-6 text-center bg-white dark:bg-gray-900">
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 ring-4 ring-blue-50 dark:ring-blue-900/30">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl sm:text-2xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-xl sm:text-2xl text-gray-900 dark:text-white mb-2">
              {user.name}
            </h2>
            
            <div className="space-y-1 mb-4 sm:mb-5">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {user.phone}
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 h-10 sm:h-11 text-sm sm:text-base"
              onClick={() => onNavigate?.('edit-profile')}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              {t('editProfile')}
            </Button>
          </Card>

          {/* Admin Access */}
          {isAdmin ? (
            <Card className="p-4 sm:p-5 mb-4 sm:mb-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg text-gray-900 dark:text-white">
                    Admin Access
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Manage app content and users
                  </p>
                </div>
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 sm:h-11 text-sm sm:text-base"
                onClick={() => onNavigate?.('admin')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Open Dashboard
              </Button>
            </Card>
          ) : (
            <Card className="p-4 sm:p-5 mb-4 sm:mb-6 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg text-gray-900 dark:text-white">
                    Admin Login
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Access admin dashboard
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full h-10 sm:h-11 text-sm sm:text-base"
                onClick={() => onNavigate?.('admin-login')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Login as Admin
              </Button>
            </Card>
          )}

          {/* Help & Support */}
          <Card className="p-4 sm:p-5 mb-4 sm:mb-6 bg-white dark:bg-gray-900">
            <h3 className="text-base sm:text-lg text-gray-900 dark:text-white mb-3 sm:mb-4">
              Help & Support
            </h3>
            
            <div className="space-y-2">
              <button
                onClick={() => onNavigate?.('terms-conditions')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    {t('termsConditions')}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </button>

              <button
                onClick={() => onNavigate?.('help')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    {t('help')}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </button>

              <button
                onClick={() => onNavigate?.('contact-us')}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                    {t('contactUs')}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </button>
            </div>
          </Card>

          {/* Logout */}
          <Card className="p-4 sm:p-5 bg-white dark:bg-gray-900">
            <Button
              variant="outline"
              className="w-full border-red-200 dark:border-red-900 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 dark:text-red-400 h-11 sm:h-12 text-sm sm:text-base"
              onClick={() => {
                if (confirm('Are you sure you want to logout?')) {
                  logout();
                  onNavigate?.('login');
                }
              }}
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {t('logout')}
            </Button>
          </Card>

        </div>
      </ScrollArea>
    </div>
  );
}