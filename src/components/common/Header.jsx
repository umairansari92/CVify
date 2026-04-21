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

      {/* Dynamic Breadcrumb / System Status (Placeholder for future) */}
      <div className="hidden lg:flex items-center gap-4 relative z-10">
        <div className="flex items-center gap-2 px-4 py-2 glass-soft rounded-xl border-white/5">
           <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse shadow-[0_0_8px_var(--success)]" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted opacity-80">System Online</span>
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-8 relative z-10">
        {/* Premium Diamond HUD */}
        <div className="flex items-center gap-3.5 px-5 py-2.5 glass-medium rounded-2xl border-primary/20 group/diamonds hover:scale-[1.03] transition-all cursor-pointer">
          <FaGem className="text-primary animate-pulse text-sm lg:text-base shadow-[0_0_15px_var(--primary)]" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-text-secondary uppercase tracking-[0.2em] leading-none mb-1 opacity-60">
              Diamond Reserve
            </span>
            <span className="text-sm lg:text-base font-black text-text-primary leading-none tabular-nums">
              {user?.diamonds || 0}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 lg:gap-4">
           <NotificationCenter />
           <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 lg:gap-5 pl-5 lg:pl-10 border-l border-card-border h-10">
          <div className="flex flex-col items-end hidden sm:flex group cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-xs lg:text-[13px] font-black text-text-primary tracking-tight group-hover:text-primary transition-colors uppercase">
                {user?.firstName} {user?.lastName}
              </span>
              {user?.role === 'admin' && <FaCrown className="text-amber-500 text-[10px]" />}
            </div>
            <span className="text-[9px] text-text-secondary font-black opacity-50 uppercase tracking-widest">{user?.role || 'User'} Mode</span>
          </div>

          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl object-cover border-2 border-card-border group-hover:border-primary/50 transition-all duration-500 relative z-10 shadow-lg"
              />
            ) : (
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl glass-medium text-text-secondary flex items-center justify-center border-2 border-card-border group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/40 transition-all duration-500 relative z-10">
                <FaUserCircle size={22} className="lg:w-6 lg:h-6" />
              </div>
            )}
            
            {/* Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-bg-primary bg-success z-20 shadow-[0_0_10px_var(--success)]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
