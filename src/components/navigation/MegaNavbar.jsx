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
  User
} from "lucide-react";
import AppSwitcherDropdown from "./AppSwitcherDropdown";
import MegaMenuFeatures from "./MegaMenuFeatures";

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
      <div className="pointer-events-auto bg-slate-950/80 backdrop-blur-2xl border border-slate-800/80 shadow-2xl shadow-black/80 rounded-2xl px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300">
        
        {/* Brand Logo & App Switcher */}
        <div className="flex items-center gap-3 sm:gap-5">
          <Link to="/" className="flex items-center group">
            <img
              src="/CVify Logo Dark.jpg"
              alt="CVify Pro"
              className="h-9 w-auto object-contain rounded-lg transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Ecosystem App Switcher */}
          <AppSwitcherDropdown isWorkspaceMode={false} />
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-bold text-slate-300">
          
          {/* Features Mega Menu Trigger */}
          <div className="relative" ref={featuresRef}>
            <button
              onClick={() => setFeaturesOpen(!featuresOpen)}
              onMouseEnter={() => setFeaturesOpen(true)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                featuresOpen ? "text-emerald-400 bg-slate-900" : "hover:text-slate-100 hover:bg-slate-900/60"
              }`}
            >
              <span>Features</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${featuresOpen ? "rotate-180" : ""}`} />
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
            to="/templates"
            className="px-3.5 py-2 rounded-xl hover:text-slate-100 hover:bg-slate-900/60 transition-all flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Templates</span>
          </Link>

          <Link
            to="/documentation"
            className="px-3.5 py-2 rounded-xl hover:text-slate-100 hover:bg-slate-900/60 transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            <span>Documentation</span>
          </Link>

          <Link
            to="/referral"
            className="px-3.5 py-2 rounded-xl hover:text-slate-100 hover:bg-slate-900/60 transition-all flex items-center gap-1.5"
          >
            <Gem className="w-3.5 h-3.5 text-emerald-400" />
            <span>Diamonds & Rewards</span>
          </Link>
        </nav>

        {/* Right Auth / Profile CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Diamond HUD */}
              <Link
                to="/referral"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-400 hover:border-emerald-500/40 transition-all"
              >
                <Gem className="w-3 h-3 text-emerald-400" />
                <span>{user.diamonds || 0}</span>
              </Link>

              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
              >
                <span>Command Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/profile"
                className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:border-emerald-500/40 transition-all overflow-hidden"
              >
                {user.profileImage ? (
                  <img src={user.profileImage} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-slate-400" />
                )}
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 transition-all"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start Free</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2 bg-slate-950/95 backdrop-blur-2xl border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-150">
          <div className="space-y-1 text-xs font-bold text-slate-300">
            <Link
              to="/ats"
              className="block p-2.5 rounded-xl hover:bg-slate-900 hover:text-emerald-400"
            >
              ATS Intelligence Scanner
            </Link>
            <Link
              to="/resume-builder"
              className="block p-2.5 rounded-xl hover:bg-slate-900 hover:text-blue-400"
            >
              AI Resume Studio
            </Link>
            <Link
              to="/interview"
              className="block p-2.5 rounded-xl hover:bg-slate-900 hover:text-amber-400"
            >
              Interview Simulator
            </Link>
            <Link
              to="/job-matcher"
              className="block p-2.5 rounded-xl hover:bg-slate-900 hover:text-cyan-400"
            >
              Job Matcher
            </Link>
            <Link
              to="/templates"
              className="block p-2.5 rounded-xl hover:bg-slate-900 hover:text-indigo-400"
            >
              ATS Templates
            </Link>
            <Link
              to="/documentation"
              className="block p-2.5 rounded-xl hover:bg-slate-900 hover:text-teal-400"
            >
              Documentation
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            {user ? (
              <Link
                to="/dashboard"
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs text-center block"
              >
                Go to Command Center →
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2 w-full">
                <Link
                  to="/login"
                  className="py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs text-center"
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
