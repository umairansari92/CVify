import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  Gem, 
  Search, 
  Sparkles, 
  Target, 
  FileText, 
  Briefcase, 
  Mic, 
  Compass, 
  Mail,
  User,
  Crown
} from "lucide-react";
import NotificationCenter from "./NotificationCenter";
import ThemeToggle from "./ThemeToggle";
import AppSwitcherDropdown from "../navigation/AppSwitcherDropdown";

const Header = ({ onMenuClick }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Determine current active workspace app badge
  const getActiveAppBadge = () => {
    const path = location.pathname;
    if (path.startsWith("/ats")) return { name: "ATS Intelligence", icon: Target, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" };
    if (path.startsWith("/resume") || path.startsWith("/templates")) return { name: "Resume Studio", icon: FileText, color: "text-blue-400 bg-blue-500/10 border-blue-500/30" };
    if (path.startsWith("/job-matcher")) return { name: "Job Matcher", icon: Briefcase, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" };
    if (path.startsWith("/interview")) return { name: "Interview Simulator", icon: Mic, color: "text-amber-400 bg-amber-500/10 border-amber-500/30" };
    if (path.startsWith("/roadmap")) return { name: "Career Roadmap", icon: Compass, color: "text-purple-400 bg-purple-500/10 border-purple-500/30" };
    if (path.startsWith("/cover-letter")) return { name: "Cover Letter AI", icon: Mail, color: "text-rose-400 bg-rose-500/10 border-rose-500/30" };
    return { name: "Command Center", icon: Sparkles, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" };
  };

  const activeApp = getActiveAppBadge();
  const ActiveIcon = activeApp.icon;

  return (
    <header className="h-16 lg:h-18 bg-[var(--surface)]/90 backdrop-blur-2xl border-b border-[var(--border)] flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-40 transition-all">
      
      {/* ── Left: Mobile Toggle & Active Workspace Context ── */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Open Sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Active Workspace App Badge */}
        <div className="flex items-center gap-2">
          <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-bold ${activeApp.color}`}>
            <ActiveIcon className="w-3.5 h-3.5" />
            <span>{activeApp.name}</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)] text-[10px] text-[var(--text-muted)] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Workspace Active</span>
          </div>
        </div>
      </div>

      {/* ── Center: Spotlight Quick Action ── */}
      <div className="hidden lg:flex items-center">
        <Link
          to="/ats/scan"
          className="flex items-center gap-3 px-4 py-1.5 bg-[var(--surface-muted)] hover:bg-[var(--surface-hover)] border border-[var(--border)] hover:border-[var(--border-strong)] rounded-xl text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all shadow-inner"
        >
          <Search className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          <span>Quick scan or match...</span>
          <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface-muted)] border border-[var(--border)] text-[10px] font-mono text-[var(--text-muted)]">
            Ctrl K
          </kbd>
        </Link>
      </div>

      {/* ── Right: App Switcher, Diamond HUD, Notifications & Profile ── */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        
        {/* App Switcher 9-Dots Matrix */}
        <AppSwitcherDropdown isWorkspaceMode={true} />

        {/* Diamond Credits Pill */}
        <Link
          to="/referral"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface-muted)] hover:bg-[var(--surface-hover)] border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 transition-all group"
        >
          <Gem className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span>{user?.diamonds || 0}</span>
        </Link>

        {/* Notification Center */}
        <NotificationCenter />

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Identity Avatar */}
        <Link
          to="/profile"
          className="flex items-center gap-2 pl-2 border-l border-[var(--border)] group"
        >
          <div className="w-8 h-8 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] group-hover:border-emerald-500/50 flex items-center justify-center overflow-hidden transition-colors">
            {user?.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 text-[var(--text-muted)]" />
            )}
          </div>
        </Link>

      </div>

    </header>
  );
};

export default React.memo(Header);
