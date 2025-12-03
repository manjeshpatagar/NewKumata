import { useState } from 'react';
import { ArrowLeft, Bell, CheckCheck, Trash2, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';

interface NotificationsPageProps {
  onBack: () => void;
}

interface Notification {
  id: number;
  type: 'approval' | 'rejection' | 'promotion' | 'update' | 'listing' | 'event' | 'system' | 'ad' | 'warning';
  icon: any;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function NotificationsPage({ onBack }: NotificationsPageProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'read'>('all');

  const allNotifications: Notification[] = [
    {
      id: 1,
      type: 'approval',
      icon: CheckCheck,
      title: 'Listing Approved',
      message: 'Your listing "Kumar Bakery" has been approved and is now live on Namma Kumta!',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'rejection',
      icon: Bell,
      title: 'Advertisement Rejected',
      message: 'Your ad "Used Car Sale" was rejected. Please review our guidelines and resubmit.',
      time: '3 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'promotion',
      icon: Bell,
      title: 'Grand Diwali Sale',
      message: 'Special offers at Rajesh General Store - Up to 50% off on all items!',
      time: '5 hours ago',
      read: false,
    },
    {
      id: 4,
      type: 'event',
      icon: Bell,
      title: 'Yakshagana Performance',
      message: 'Traditional Yakshagana performance this weekend at Kumta Town Hall. Book your seats now!',
      time: '8 hours ago',
      read: true,
    },
    {
      id: 5,
      type: 'listing',
      icon: Bell,
      title: 'New Shop Added',
      message: 'Kumta Medical Store is now available on Namma Kumta. Check out their offerings!',
      time: '1 day ago',
      read: true,
    },
    {
      id: 6,
      type: 'approval',
      icon: CheckCheck,
      title: 'Ad Approved',
      message: 'Your advertisement "Electronics Sale" is now live and visible to all users.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 7,
      type: 'update',
      icon: Bell,
      title: 'App Update Available',
      message: 'New features including dark mode and Kannada language support are now available!',
      time: '2 days ago',
      read: true,
    },
    {
      id: 8,
      type: 'system',
      icon: Bell,
      title: 'Maintenance Notice',
      message: 'Scheduled maintenance on Dec 25th from 2 AM to 4 AM. Services may be temporarily unavailable.',
      time: '2 days ago',
      read: true,
    },
  ];

  const [notifications, setNotifications] = useState(allNotifications);

  const iconColors: Record<string, string> = {
    approval: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    rejection: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    promotion: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    update: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    listing: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    event: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
    system: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    ad: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    warning: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  };

  const filteredNotifications = 
    activeTab === 'all' 
      ? notifications 
      : activeTab === 'unread'
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.read);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 flex-shrink-0">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onBack}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-white truncate">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                    {unreadCount} unread
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleMarkAllRead}
                  className="text-xs sm:text-sm hidden sm:flex"
                >
                  <CheckCheck className="w-4 h-4 mr-1.5" />
                  Mark Read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleClearAll}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 text-xs sm:text-sm"
                >
                  <Trash2 className="w-4 h-4 sm:mr-1.5" />
                  <span className="hidden sm:inline">Clear</span>
                </Button>
              )}
            </div>
          </div>

          {/* 3 Simple Tabs */}
          <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 pb-3 text-sm sm:text-base transition-all ${
                activeTab === 'all'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`flex-1 pb-3 text-sm sm:text-base transition-all ${
                activeTab === 'unread'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setActiveTab('read')}
              className={`flex-1 pb-3 text-sm sm:text-base transition-all ${
                activeTab === 'read'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Read ({notifications.length - unreadCount})
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-24">
          {filteredNotifications.length === 0 ? (
            <Card className="p-8 sm:p-12 text-center bg-white dark:bg-gray-900">
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl text-gray-900 dark:text-white mb-2">
                    No Notifications
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                    {activeTab === 'all' 
                      ? "You're all caught up!"
                      : `No ${activeTab} notifications`
                    }
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {filteredNotifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <Card
                    key={notification.id}
                    className={`p-3 sm:p-4 cursor-pointer hover:shadow-md transition-all ${
                      !notification.read 
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600' 
                        : 'bg-white dark:bg-gray-900'
                    }`}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className="relative flex-shrink-0">
                        <div
                          className={`p-2 sm:p-3 rounded-lg ${
                            iconColors[notification.type] || 'bg-gray-100 dark:bg-gray-800'
                          }`}
                        >
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        {!notification.read && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white dark:border-gray-900"></div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base text-gray-900 dark:text-white mb-1">
                          {notification.title}
                        </h3>
                        
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {notification.message}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                            <Clock className="w-3 h-3" />
                            {notification.time}
                          </span>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNotification(notification.id);
                            }}
                            className="h-7 px-2 text-red-600 hover:text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
