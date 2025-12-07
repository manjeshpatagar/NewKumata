'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X, ShoppingBag, Store } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { useRequireAuth } from '../hooks/useRequireAuth';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingAddButton() {
  const router = useRouter();
  const { t } = useLanguage();
  const { requireAuth } = useRequireAuth();
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    {
      id: 'advertisement',
      title: 'Add Advertisement',
      description: 'Post bikes, cars, rentals, jobs & more',
      icon: ShoppingBag,
      color: 'purple',
      route: 'add-advertisement'
    },
    {
      id: 'business',
      title: 'Add Your Business',
      description: 'Get your business listed in minutes',
      icon: Store,
      color: 'blue',
      route: 'add-business'
    }
  ];

  const handleOptionClick = (option: typeof options[0]) => {
    setIsOpen(false);
    const routeMap: Record<string, string> = {
      'add-advertisement': '/add-advertisement',
      'add-business': '/add-business',
    };
    const route = routeMap[option.route] || `/${option.route}`;
    requireAuth(() => router.push(route), () => router.push('/auth/login'));
  };

  return (
    <>
      {/* Backdrop with Blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-36 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-sm"
          >
            <Card className="bg-white dark:bg-gray-900 shadow-2xl border-0 overflow-hidden">
              {/* Header */}
              <div className="p-4 text-center border-b border-gray-100 dark:border-gray-800">
                <h3 className="text-lg text-gray-900 dark:text-white">
                  What would you like to add?
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Choose an option below
                </p>
              </div>
              
              {/* Options */}
              <div className="p-3 space-y-2">
                {options.map((option) => {
                  const Icon = option.icon;
                  const colorClasses = {
                    purple: 'bg-purple-600 hover:bg-purple-700',
                    blue: 'bg-blue-600 hover:bg-blue-700',
                  };
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      className="w-full p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all flex items-center gap-4 group"
                    >
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-lg ${colorClasses[option.color as keyof typeof colorClasses]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 text-left">
                        <p className="text-base text-gray-900 dark:text-white mb-0.5">
                          {option.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                      
                      {/* Arrow */}
                      <div className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 group-hover:translate-x-1 transition-all text-xl">
                        →
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`h-14 w-14 rounded-full shadow-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all hover:scale-110 active:scale-95 flex items-center justify-center p-0 border-4 border-white dark:border-gray-900 ${
            isOpen ? 'rotate-45' : ''
          }`}
          aria-label={isOpen ? 'Close menu' : 'Add new item'}
          size="icon"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Plus className="w-6 h-6 text-white" />
          )}
        </Button>
      </div>
    </>
  );
}
