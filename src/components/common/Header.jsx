import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";
import { FaUserCircle, FaCrown, FaStar, FaGem, FaBars, FaDownload } from "react-icons/fa";
import NotificationCenter from "./NotificationCenter";
import Logo from "./Logo";


const Header = ({ onMenuClick }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-16 lg:h-20 glass-strong border-b border-card-border flex items-center justify-between px-6 lg:px-12 transition-all duration-500 sticky top-0 z-50 overflow-hidden group/header">
      {/* Immersive HUD Header Glow */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover/header:opacity-100 transition-opacity duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-accent/[0.03] pointer-events-none" />

      <div className="flex items-center gap-4 lg:gap-6 relative z-10 lg:hidden">
        <button
          onClick={onMenuClick}
          className="p-3 rounded-2xl glass-soft hover:glass-medium hover:text-primary transition-all active:scale-95 duration-200"
          type="button"
          aria-label="Open Menu"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Dynamic System Status */}
      <div className="hidden lg:flex items-center gap-4 relative z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 glass-soft rounded-lg border-white/5">
           <div className="w-1 h-1 bg-success rounded-full animate-pulse shadow-[0_0_8px_var(--success)]" />
           <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-text-muted opacity-80">Workspace Active</span>
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-8 relative z-10">
        {/* Premium Diamond HUD */}
        <div className="flex items-center gap-3 px-4 py-2 bg-midground rounded-xl border border-primary/20 group/diamonds hover:shadow-hover transition-all cursor-pointer">
          <FaGem className="text-primary text-sm shadow-[0_0_15px_rgba(15,157,138,0.2)]" />
          <div className="flex flex-col">
            <span className="text-[8px] font-bold text-text-secondary uppercase tracking-[0.1em] leading-none mb-1">
              Credits
            </span>
            <span className="text-sm font-bold text-text-primary leading-none tabular-nums">
              {user?.diamonds || 0}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 lg:gap-4">
           <NotificationCenter />
           <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 lg:gap-5 pl-5 lg:pl-10 border-l border-card-border h-8">
          <div className="flex flex-col items-end hidden sm:flex group cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-text-main tracking-tight group-hover:text-primary transition-colors">
                {user?.firstName} {user?.lastName}
              </span>
              {user?.role === 'admin' && <FaCrown className="text-amber-500 text-[10px]" />}
            </div>
            <span className="text-[9px] text-text-muted font-bold opacity-50 uppercase tracking-widest">{user?.role || 'User'}</span>
          </div>

          <div className="relative group cursor-pointer">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl object-cover border border-card-border group-hover:border-primary/50 transition-all duration-medium relative z-10"
              />
            ) : (
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-white text-text-muted flex items-center justify-center border border-card-border group-hover:border-primary/40 transition-all duration-medium relative z-10">
                <FaUserCircle size={20} />
              </div>
            )}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white bg-success z-20" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
