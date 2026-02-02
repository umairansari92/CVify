import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-action/10 bg-white/50 dark:bg-slate-blue/40 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-action dark:hover:text-accent hover:shadow-lg hover:shadow-action/5 active:scale-95 group"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === "light" ? (
          <FaMoon
            size={18}
            className="transform -rotate-12 group-hover:rotate-0 transition-transform duration-500"
          />
        ) : (
          <FaSun
            size={18}
            className="transform rotate-90 group-hover:rotate-0 transition-transform duration-500"
          />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
