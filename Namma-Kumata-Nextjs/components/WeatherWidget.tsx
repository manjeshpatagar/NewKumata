'use client';

import { Cloud, MapPin } from 'lucide-react';

export function WeatherWidget() {
  // Mock weather data
  const weather = {
    location: 'Kumta',
    temperature: 28,
    condition: 'Partly Cloudy',
  };

  return (
    <div className="px-4 md:px-6 lg:px-8 py-2">
      <div className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-400 text-xs md:text-sm">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          <span className="font-medium">{weather.location}</span>
        </div>
        <span className="text-gray-400">•</span>
        <div className="flex items-center gap-1.5">
          <Cloud className="w-3.5 h-3.5" />
          <span className="font-semibold">{weather.temperature}°C</span>
        </div>
        <span className="text-gray-400 hidden sm:inline">•</span>
        <span className="hidden sm:inline text-gray-500 dark:text-gray-500">{weather.condition}</span>
      </div>
    </div>
  );
}
