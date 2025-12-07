'use client';

import { Card } from '../ui/card';
import { LucideIcon } from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
  className?: string;
}

export function QuickActions({ actions, className = '' }: QuickActionsProps) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 ${className}`}>
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Card
            key={action.id}
            className="p-4 md:p-6 cursor-pointer hover:shadow-lg transition-all dark:bg-gray-900 dark:border-gray-800 hover:scale-105 active:scale-95"
            onClick={action.onClick}
          >
            <div className="flex flex-col items-center text-center gap-2 md:gap-3">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${action.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <span className="text-xs md:text-sm dark:text-white line-clamp-2">
                {action.label}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
