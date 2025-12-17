'use client';

import { useEffect, useState } from 'react';
import { Cloud, MapPin, Sun, CloudRain } from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: string;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=14.4289&lon=74.4184&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        );

        if (!res.ok) return;

        const data = await res.json();

        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
        });
      } catch (err) {
        console.error('Weather fetch failed', err);
      }
    }

    fetchWeather();
  }, []);

  if (!weather) return null;

  const WeatherIcon =
    weather.condition === 'Rain'
      ? CloudRain
      : weather.condition === 'Clear'
      ? Sun
      : Cloud;

  return (
    <div className="px-4 md:px-6 lg:px-8 py-2">
      <div className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-400 text-xs md:text-sm">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          <span className="font-medium">Kumta</span>
        </div>

        <span className="text-gray-400">•</span>

        <div className="flex items-center gap-1.5">
          <WeatherIcon className="w-3.5 h-3.5" />
          <span className="font-semibold">{weather.temp}°C</span>
        </div>

        <span className="text-gray-400 hidden sm:inline">•</span>

        <span className="hidden sm:inline text-gray-500 dark:text-gray-500">
          {weather.condition}
        </span>
      </div>
    </div>
  );
}
