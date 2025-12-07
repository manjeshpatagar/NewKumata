'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, onBack, rightAction, className = '' }: PageHeaderProps) {
  return (
    <div className={`flex items-center gap-3 md:gap-4 p-4 md:p-6 border-b dark:border-gray-800 bg-white dark:bg-gray-950 ${className}`}>
      {onBack && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="md:h-10 md:w-10"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="dark:text-white truncate text-lg md:text-xl lg:text-2xl">{title}</h1>
        {subtitle && (
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">
            {subtitle}
          </p>
        )}
      </div>
      {rightAction && <div className="flex-shrink-0">{rightAction}</div>}
    </div>
  );
}
