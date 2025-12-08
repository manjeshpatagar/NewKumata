'use client';

import { MapPin, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function LocationSelector() {
  const locations = ['Kumta', 'Karwar', 'Bhatkal', 'Honnavar', 'Sirsi'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-md transition-colors">
        <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <span className="text-sm dark:text-white">Kumta</span>
        <ChevronDown className="w-3 h-3 text-gray-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {locations.map((location) => (
          <DropdownMenuItem key={location}>
            {location}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
