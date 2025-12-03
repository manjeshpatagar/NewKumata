import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { ReactNode } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rightAction?: ReactNode;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder, rightAction, className = '' }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
      <Input
        placeholder={placeholder}
        className="pl-10 pr-12 h-10 md:h-11 text-sm md:text-base"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {rightAction && (
        <div className="absolute right-0 top-0 h-full flex items-center">
          {rightAction}
        </div>
      )}
    </div>
  );
}
