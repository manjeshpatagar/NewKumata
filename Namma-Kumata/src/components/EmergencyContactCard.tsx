import { Phone } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface EmergencyContactCardProps {
  icon: React.ReactNode;
  title: string;
  number: string;
  bgColor: string;
}

export function EmergencyContactCard({
  icon,
  title,
  number,
  bgColor,
}: EmergencyContactCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
        <div className="flex-1">
          <h3 className="text-sm">{title}</h3>
          <p className="text-gray-600 text-sm">{number}</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          onClick={() => window.open(`tel:${number}`)}
        >
          <Phone className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
