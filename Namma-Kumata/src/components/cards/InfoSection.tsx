import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoItem {
  icon: LucideIcon;
  text: string;
  link?: boolean;
}

interface InfoSectionProps {
  items: InfoItem[];
  className?: string;
}

export function InfoSection({ items, className = '' }: InfoSectionProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div 
            key={index}
            className={`flex items-center gap-2 text-sm md:text-base ${
              item.link ? 'text-blue-600 dark:text-blue-400 hover:underline cursor-pointer' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{item.text}</span>
          </div>
        );
      })}
    </div>
  );
}
