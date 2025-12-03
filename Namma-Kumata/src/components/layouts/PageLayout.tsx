import { ReactNode } from 'react';
import { ScrollArea } from '../ui/scroll-area';

interface PageLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export function PageLayout({ 
  children, 
  header, 
  footer, 
  maxWidth = 'xl',
  className = '' 
}: PageLayoutProps) {
  return (
    <div className={`h-[calc(100vh-4rem)] flex flex-col w-full ${maxWidthClasses[maxWidth]} mx-auto bg-white dark:bg-gray-950 ${className}`}>
      {header}
      <ScrollArea className="flex-1">
        <div className="pb-20 md:pb-24">
          {children}
        </div>
      </ScrollArea>
      {footer}
    </div>
  );
}
