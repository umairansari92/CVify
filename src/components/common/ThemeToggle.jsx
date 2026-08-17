import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] active:scale-95 group"
      aria-label="Toggle Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === "light" ? (
          <FaMoon
            size={16}
            className="transform -rotate-12 group-hover:rotate-0 transition-transform duration-500"
          />
        ) : (
          <FaSun
            size={16}
            className="transform rotate-90 group-hover:rotate-0 transition-transform duration-500"
          />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
