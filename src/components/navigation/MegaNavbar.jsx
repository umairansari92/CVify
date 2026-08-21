import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight, 
  Gem, 
  Layers, 
  BookOpen, 
  Award,
  User,
  FileText,
  Target,
  Globe
} from "lucide-react";
import AppSwitcherDropdown from "./AppSwitcherDropdown";
import MegaMenuFeatures from "./MegaMenuFeatures";
import ThemeToggle from "../common/ThemeToggle";

const MegaNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const featuresRef = useRef(null);

  // Close features dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (featuresRef.current && !featuresRef.current.contains(e.target)) {
        setFeaturesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setFeaturesOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 max-w-7xl mx-auto pointer-events-none">
      <div className="pointer-events-auto bg-[var(--surface-elevated)]/90 backdrop-blur-2xl border border-[var(--border)] shadow-2xl rounded-2xl px-4 sm:px-6 py-2 flex items-center justify-between transition-all duration-300">
        
        {/* Brand Logo & App Switcher */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/" className="flex items-center group">
            <img
              src="/CVify Logo Dark.jpg"
              alt="CVify Pro"
              className="h-8 w-auto object-contain rounded-lg transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Ecosystem App Switcher */}
          <AppSwitcherDropdown isWorkspaceMode={false} />
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-[var(--text-secondary)]">
          
          <Link
            to="/resume-builder"
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              location.pathname === "/resume-builder"
                ? "text-[var(--text-primary)] bg-[var(--surface-hover)] font-black"
                : "hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-500" />
            <span>Resume Studio</span>
          </Link>

          <Link
            to="/ats"
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              location.pathname === "/ats"
                ? "text-[var(--text-primary)] bg-[var(--surface-hover)] font-black"
                : "hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            <Target className="w-3.5 h-3.5 text-emerald-500" />
            <span>ATS Scanner</span>
          </Link>

          <Link
            to="/profile-guide"
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              location.pathname === "/profile-guide" || location.pathname.startsWith("/profile")
                ? "text-[var(--text-primary)] bg-[var(--surface-hover)] font-black"
                : "hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-purple-500" />
            <span>Portfolio</span>
          </Link>

          <Link
            to="/templates"
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              location.pathname === "/templates"
                ? "text-[var(--text-primary)] bg-[var(--surface-hover)] font-black"
                : "hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>Templates</span>
          </Link>

          {/* Features Mega Menu Trigger */}
          <div className="relative" ref={featuresRef}>
            <button
              onClick={() => setFeaturesOpen(!featuresOpen)}
              onMouseEnter={() => setFeaturesOpen(true)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                featuresOpen ? "text-[var(--text-primary)] bg-[var(--surface-hover)]" : "hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <span>Features</span>
              <ChevronDown className={`w-3 h-3 text-[var(--text-muted)] transition-transform duration-200 ${featuresOpen ? "rotate-180" : ""}`} />
            </button>

            {featuresOpen && (
              <div 
                onMouseLeave={() => setFeaturesOpen(false)}
                className="absolute left-1/2 -translate-x-1/2 mt-3 z-50"
              >
                <MegaMenuFeatures onClose={() => setFeaturesOpen(false)} />
              </div>
            )}
          </div>

          <Link
            to="/documentation"
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              location.pathname === "/documentation"
                ? "text-[var(--text-primary)] bg-[var(--surface-hover)] font-black"
                : "hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-500" />
            <span>Docs</span>
          </Link>
        </nav>

        {/* Right Auth / Profile CTA / Theme Toggle */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Theme Toggle */}
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-2.5">
              {/* Diamond HUD */}
              <Link
                to="/referral"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[var(--surface-muted)] border border-emerald-500/20 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/40 transition-all"
              >
                <Gem className="w-3 h-3 text-emerald-500" />
                <span>{user.diamonds || 0}</span>
              </Link>

              <Link
                to="/dashboard"
                className="px-3.5 py-1.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
              >
                <span>Command Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/profile"
                className="w-8 h-8 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--border-strong)] transition-all overflow-hidden"
              >
                {user.profileImage ? (
                  <img src={user.profileImage} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-[var(--text-muted)]" />
                )}
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="px-3.5 py-1.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start Free</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle & Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2 bg-[var(--surface-elevated)]/98 backdrop-blur-2xl border border-[var(--border)] rounded-2xl p-4 shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-150 text-[var(--text-primary)]">
          <div className="space-y-1 text-xs font-bold text-[var(--text-secondary)]">
            <Link
              to="/resume-builder"
              className="block p-2.5 rounded-xl hover:bg-[var(--surface-hover)] hover:text-blue-500"
            >
              AI Resume Studio
            </Link>
            <Link
              to="/ats"
              className="block p-2.5 rounded-xl hover:bg-[var(--surface-hover)] hover:text-emerald-500"
            >
              ATS Intelligence Scanner
            </Link>
            <Link
              to="/profile-guide"
              className="block p-2.5 rounded-xl hover:bg-[var(--surface-hover)] hover:text-purple-500"
            >
              Profile &amp; Portfolio Studio
            </Link>
            <Link
              to="/templates"
              className="block p-2.5 rounded-xl hover:bg-[var(--surface-hover)] hover:text-indigo-500"
            >
              ATS Templates
            </Link>
            <Link
              to="/interview"
              className="block p-2.5 rounded-xl hover:bg-[var(--surface-hover)] hover:text-amber-500"
            >
              Interview Simulator
            </Link>
            <Link
              to="/job-matcher"
              className="block p-2.5 rounded-xl hover:bg-[var(--surface-hover)] hover:text-cyan-500"
            >
              Job Matcher
            </Link>
            <Link
              to="/documentation"
              className="block p-2.5 rounded-xl hover:bg-[var(--surface-hover)] hover:text-teal-500"
            >
              Documentation
            </Link>
          </div>

          <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
            {user ? (
              <Link
                to="/dashboard"
                className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-white font-bold text-xs text-center block"
              >
                Go to Command Center →
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2 w-full">
                <Link
                  to="/login"
                  className="py-2 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text-secondary)] font-bold text-xs text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="py-2 rounded-xl bg-[var(--primary)] text-white font-bold text-xs text-center"
                >
                  Start Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default React.memo(MegaNavbar);
