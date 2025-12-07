'use client';

import { ReactNode } from 'react';
import { Card } from '../ui/card';

interface BaseCardProps {
  children: ReactNode;
  onClick?: () => void;
  featured?: boolean;
  sponsored?: boolean;
  className?: string;
}

export function BaseCard({ children, onClick, featured, sponsored, className = '' }: BaseCardProps) {
  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-lg dark:bg-gray-900 dark:border-gray-800 ${
        onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''
      } ${
        sponsored ? 'ring-2 ring-yellow-500 dark:ring-yellow-600' : ''
      } ${
        featured ? 'ring-2 ring-blue-500 dark:ring-blue-600' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </Card>
  );
}
