'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  data?: any;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  sendAdApprovalNotification: (adTitle: string, approved: boolean) => void;
  sendNewAdNotification: (category: string, adTitle: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Ad Approved!',
      message: 'Your advertisement "Royal Enfield Launch" has been approved and is now live.',
      type: 'success',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: '2',
      title: 'New Job Posted',
      message: 'A new job posting matching your interests: "Web Developer Required"',
      type: 'info',
      timestamp: new Date(Date.now() - 7200000),
      read: false,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification
    if (notification.type === 'success') {
      toast.success(notification.title, { description: notification.message });
    } else if (notification.type === 'error') {
      toast.error(notification.title, { description: notification.message });
    } else if (notification.type === 'warning') {
      toast.warning(notification.title, { description: notification.message });
    } else {
      toast.info(notification.title, { description: notification.message });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const sendAdApprovalNotification = (adTitle: string, approved: boolean) => {
    addNotification({
      title: approved ? 'Ad Approved!' : 'Ad Rejected',
      message: approved
        ? `Your advertisement "${adTitle}" has been approved and is now live on Namma Kumta!`
        : `Your advertisement "${adTitle}" was not approved. Please check the guidelines and try again.`,
      type: approved ? 'success' : 'warning',
    });
  };

  const sendNewAdNotification = (category: string, adTitle: string) => {
    addNotification({
      title: 'New Advertisement',
      message: `New ${category} posted: "${adTitle}"`,
      type: 'info',
      data: { category, adTitle },
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        sendAdApprovalNotification,
        sendNewAdNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
