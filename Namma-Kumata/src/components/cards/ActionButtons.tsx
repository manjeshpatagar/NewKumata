import { Button } from '../ui/button';
import { LucideIcon } from 'lucide-react';

interface ActionButton {
  label?: string;
  icon: LucideIcon;
  variant?: 'default' | 'outline' | 'ghost';
  onClick: (e: React.MouseEvent) => void;
  active?: boolean;
  className?: string;
}

interface ActionButtonsProps {
  buttons: ActionButton[];
  className?: string;
}

export function ActionButtons({ buttons, className = '' }: ActionButtonsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {buttons.map((button, index) => {
        const Icon = button.icon;
        const hasLabel = !!button.label;
        
        return (
          <Button
            key={index}
            size="sm"
            variant={button.variant || 'outline'}
            className={`${hasLabel ? 'flex-1' : 'px-3'} ${button.className || ''}`}
            onClick={button.onClick}
          >
            <Icon className={`w-4 h-4 ${hasLabel ? 'mr-2' : ''} ${button.active ? 'fill-current' : ''}`} />
            {hasLabel && <span className="hidden sm:inline">{button.label}</span>}
          </Button>
        );
      })}
    </div>
  );
}
