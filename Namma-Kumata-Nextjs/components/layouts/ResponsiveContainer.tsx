'use client';

import { ReactNode } from 'react';

interface ResponsiveContainerProps {
  children: ReactNode;
  padding?: boolean;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const maxWidths = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export function ResponsiveContainer({ 
  children, 
  padding = true,
  maxWidth = 'full',
  className = '' 
}: ResponsiveContainerProps) {
  return (
    <div className={`w-full ${maxWidths[maxWidth]} mx-auto ${padding ? 'px-4 md:px-6 lg:px-8 xl:px-10' : ''} ${className}`}>
      {children}
    </div>
  );
}
