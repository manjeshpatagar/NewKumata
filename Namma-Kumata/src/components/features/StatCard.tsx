import { Card } from '../ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    label: string;
  };
  onClick?: () => void;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, color, trend, onClick, className = '' }: StatCardProps) {
  return (
    <Card 
      className={`p-4 md:p-6 ${onClick ? 'cursor-pointer hover:shadow-lg' : ''} transition-all dark:bg-gray-900 dark:border-gray-800 ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1 md:mb-2">
            {title}
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl dark:text-white mb-2">
            {value}
          </p>
          {trend && (
            <p className={`text-xs md:text-sm ${trend.value >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
      </div>
    </Card>
  );
}
