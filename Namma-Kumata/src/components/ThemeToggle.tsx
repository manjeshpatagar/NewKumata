import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" />
      )}
    </button>
  );
}
