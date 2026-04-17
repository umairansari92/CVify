import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";
import { FaUserCircle, FaCrown, FaStar, FaGem, FaBars, FaDownload } from "react-icons/fa";
import Logo from "./Logo";

const Header = ({ onMenuClick }) => {
  const { user } = useSelector((state) => state.auth);

  const handleInstallClick = () => {
    const event = new Event("trigger-pwa-install");
    window.dispatchEvent(event);
  };

  return (
    <header className="h-16 lg:h-20 glass border-b border-border-subtle flex items-center justify-between px-4 lg:px-10 transition-all duration-500 sticky top-0 z-50 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>

      <div className="flex items-center gap-2 lg:gap-4 relative z-10">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-3 -ml-3 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all pointer-events-auto flex items-center justify-center"
          type="button"
          aria-label="Open Menu"
        >
          <FaBars className="text-2xl text-text-primary" />
        </button>
        <Logo className="w-24 lg:w-40" />
      </div>

      <div className="flex items-center gap-4 lg:gap-8 relative z-10">
        {/* Premium Diamond Indicator */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-foreground/10 border border-border-subtle group hover:scale-105 transition-all duration-300">
          <FaGem className="text-blue-500 animate-pulse text-sm lg:text-base" />
          <div className="flex flex-col">
            <span className="text-[8px] lg:text-[9px] font-black text-text-muted uppercase tracking-tighter">
              Diamonds
            </span>
            <span className="text-xs lg:text-sm font-black text-text-main leading-none">
              {user?.diamonds || 0}
            </span>
          </div>
        </div>

        <ThemeToggle />

        <div className="flex items-center gap-2 lg:gap-4 pl-4 lg:pl-8 border-l border-border-subtle">
          <div className="flex flex-col items-end hidden md:flex group cursor-pointer">
            <div className="flex items-center gap-1.5 lg:gap-2">
              <span className="text-xs lg:text-sm font-black text-text-main tracking-tight group-hover:text-primary transition-colors">
                {user?.firstName} {user?.lastName}
              </span>
              {user?.role === 'admin' && <FaCrown className="text-yellow-500 text-xs" />}
            </div>
            <span className="text-[10px] text-text-muted font-bold opacity-80">{user?.email}</span>
          </div>

          {user?.profileImage ? (
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all scale-110"></div>
              <img
                src={user.profileImage}
                alt="Profile"
                width={44}
                height={44}
                loading="lazy"
                className="w-9 h-9 lg:w-11 lg:h-11 rounded-xl object-cover border-2 border-border-subtle relative z-10 shadow-lg group-hover:border-primary/50 transition-all"
              />

            </div>
          ) : (
            <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-xl bg-foreground/20 text-text-muted flex items-center justify-center border-2 border-border-subtle group hover:bg-primary hover:text-white transition-all cursor-pointer">
              <FaUserCircle size={24} className="lg:w-7 lg:h-7" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
