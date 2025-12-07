'use client';

import { ReactNode } from 'react';
import { Button } from '../ui/button';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  className = '' 
}: EmptyStateProps) {
  return (
    <div className={`text-center py-8 md:py-12 lg:py-16 px-4 ${className}`}>
      <div className="mb-3 md:mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="mb-2 dark:text-white text-base md:text-lg">{title}</h3>
      {description && (
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button 
          onClick={onAction}
          className="mt-4"
          size="lg"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
