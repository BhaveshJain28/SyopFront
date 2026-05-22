import { useTheme } from '../contexts/ThemeContext.jsx';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-16 items-center rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors duration-300 focus:outline-none shadow-inner cursor-pointer"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <span
        className={`${
          isDarkMode ? 'translate-x-8 bg-slate-950 text-yellow-400' : 'translate-x-1 bg-white text-amber-500'
        } flex h-7 w-7 transform items-center justify-center rounded-full transition-transform duration-300 shadow-md`}
      >
        {isDarkMode ? (
          <Moon size={16} className="animate-pulse" />
        ) : (
          <Sun size={16} />
        )}
      </span>
    </button>
  );
};
