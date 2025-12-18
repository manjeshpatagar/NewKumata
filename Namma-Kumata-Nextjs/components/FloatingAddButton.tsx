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

    <AnimatePresence>
  {isOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Wrapper (DO NOT stop click here) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        {/* Card only */}
        <Card
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm rounded-2xl shadow-2xl bg-white dark:bg-gray-900 overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-4 text-center border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add New
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Choose what you want to add
            </p>
          </div>

          {/* Options */}
          <div className="p-4 space-y-3">
            {options.map((option) => {
              const Icon = option.icon;

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 text-left">
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      {option.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {option.description}
                    </p>
                  </div>

                  <span className="text-gray-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </>
  )}
</AnimatePresence>



      {/* Main FAB Button */}
      {/* FAB */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-50"
        style={{ bottom: "63px" }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Add"
          className={`w-14 h-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-transform ${isOpen ? 'rotate-45' : ''
            }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Plus className="w-6 h-6" />
          )}
        </Button>
      </div>

    </>
  );
}
