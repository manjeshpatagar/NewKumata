import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, icon, action, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-3 md:mb-4 ${className}`}>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {icon && <span className="text-xl md:text-2xl flex-shrink-0">{icon}</span>}
        <div className="min-w-0">
          <h2 className="dark:text-white truncate text-base md:text-lg lg:text-xl">{title}</h2>
          {subtitle && (
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div className="flex-shrink-0 ml-2">{action}</div>}
    </div>
  );
}
