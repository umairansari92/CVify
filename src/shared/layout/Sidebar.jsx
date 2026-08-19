import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import {
  LayoutDashboard,
  FileText,
  Target,
  Briefcase,
  Mic,
  Compass,
  Mail,
  Layers,
  PlusCircle,
  Gem,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  Scan,
  TrendingUp,
  BookOpen,
  Globe
} from "lucide-react";

const Sidebar = ({ onClose = () => {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  // Accordion state for expandable sections
  const [isResumeOpen, setIsResumeOpen] = useState(
    location.pathname.startsWith("/resume") || location.pathname === "/templates"
  );
  const [isAtsOpen, setIsAtsOpen] = useState(
    location.pathname.startsWith("/ats")
  );

  // Auto-expand if user navigates to a sub-route
  useEffect(() => {
    if (location.pathname.startsWith("/resume") || location.pathname === "/templates") {
      setIsResumeOpen(true);
    }
    if (location.pathname.startsWith("/ats")) {
      setIsAtsOpen(true);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isResumeActive = location.pathname.startsWith("/resume") || location.pathname === "/templates";
  const isAtsActive = location.pathname.startsWith("/ats");

  return (
    <aside className="w-72 bg-[var(--surface)]/95 backdrop-blur-2xl border-r border-[var(--border)] h-screen flex flex-col justify-between relative z-30 transition-all duration-300 overflow-hidden">
      
      {/* ── Top Header & Logo ── */}
      <div>
        <div className="p-6 pb-4 flex items-center justify-between border-b border-[var(--border)]">
          <NavLink to="/dashboard" onClick={onClose} className="flex items-center gap-2 group">
            <img
              src="/CVify Logo Dark.jpg"
              alt="CVify Pro"
              className="h-8 w-auto object-contain rounded-lg transition-transform duration-200 group-hover:scale-105"
            />
          </NavLink>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg bg-[var(--surface-muted)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* ── Quick Create Action ── */}
        <div className="px-4 pt-4 pb-2">
          <NavLink
            to="/resume-builder/create"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Resume</span>
          </NavLink>
        </div>

        {/* ── Main Navigation List ── */}
        <nav className="px-3 py-2 space-y-4 overflow-y-auto max-h-[calc(100vh-320px)] custom-scrollbar">
          
          {/* Section 1: Core Workspace */}
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] opacity-60 px-3 block mb-1.5">
              Workspace Core
            </span>

            {/* Command Center */}
            <NavLink
              to="/dashboard"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                  isActive
                    ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/30"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-transparent"
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 transition-colors" />
                <span>Command Center</span>
              </div>
              {location.pathname === "/dashboard" && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
            </NavLink>

            {/* ── Resume Studio (Expandable Submenu) ── */}
            <div className="space-y-0.5">
              <button
                onClick={() => setIsResumeOpen(!isResumeOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                  isResumeActive
                    ? "text-blue-400 bg-blue-500/10 border border-blue-500/30"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>Resume Studio</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded border text-blue-400 bg-blue-500/10 border-blue-500/20">
                    PRO
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isResumeOpen ? "rotate-180" : ""}`} />
                </div>
              </button>

              {/* Resume Submenu Items */}
              {isResumeOpen && (
                <div className="pl-6 pr-1 py-1 space-y-1 border-l-2 border-[var(--border)] ml-5 animate-in fade-in duration-150">
                  <NavLink
                    to="/resume/library"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "text-blue-300 bg-blue-500/10 font-bold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      }`
                    }
                  >
                    <span>My Resumes</span>
                    {location.pathname === "/resume/library" && <div className="w-1 h-1 rounded-full bg-blue-400" />}
                  </NavLink>

                  <NavLink
                    to="/resume-builder"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "text-blue-300 bg-blue-500/10 font-bold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      }`
                    }
                  >
                    <span>Resume Builder</span>
                    {location.pathname === "/resume-builder" && <div className="w-1 h-1 rounded-full bg-blue-400" />}
                  </NavLink>

                  <NavLink
                    to="/templates"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "text-blue-300 bg-blue-500/10 font-bold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      }`
                    }
                  >
                    <span>ATS Templates</span>
                    {location.pathname === "/templates" && <div className="w-1 h-1 rounded-full bg-blue-400" />}
                  </NavLink>
                </div>
              )}
            </div>

            {/* ── Portfolio & Profile ── */}
            <NavLink
              to="/profile"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                  isActive
                    ? "text-purple-400 bg-purple-500/10 border border-purple-500/30"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-transparent"
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-purple-400" />
                <span>Profile & Portfolio</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-black px-1.5 py-0.2 rounded border text-purple-400 bg-purple-500/10 border-purple-500/20">
                  LIVE
                </span>
                {location.pathname === "/profile" && <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
              </div>
            </NavLink>

          </div>

          {/* Section 2: AI Career Tools */}
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] opacity-60 px-3 block mb-1.5">
              AI Career Copilots
            </span>

            {/* ── ATS Intelligence (Expandable Submenu) ── */}
            <div className="space-y-0.5">
              <button
                onClick={() => setIsAtsOpen(!isAtsOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                  isAtsActive
                    ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/30"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Target className="w-4 h-4 text-emerald-400" />
                  <span>ATS Intelligence</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded border text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
                    v5.1
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isAtsOpen ? "rotate-180" : ""}`} />
                </div>
              </button>

              {/* ATS Submenu Items */}
              {isAtsOpen && (
                <div className="pl-6 pr-1 py-1 space-y-1 border-l-2 border-[var(--border)] ml-5 animate-in fade-in duration-150">
                  <NavLink
                    to="/ats"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "text-emerald-300 bg-emerald-500/10 font-bold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      }`
                    }
                  >
                    <span>ATS Overview</span>
                    {location.pathname === "/ats" && <div className="w-1 h-1 rounded-full bg-emerald-400" />}
                  </NavLink>

                  <NavLink
                    to="/ats/scan"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "text-emerald-300 bg-emerald-500/10 font-bold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      }`
                    }
                  >
                    <span>Intelligence Scanner</span>
                    {location.pathname === "/ats/scan" && <div className="w-1 h-1 rounded-full bg-emerald-400" />}
                  </NavLink>

                  <NavLink
                    to="/ats/reports"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "text-emerald-300 bg-emerald-500/10 font-bold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      }`
                    }
                  >
                    <span>Debrief Reports</span>
                    {location.pathname.startsWith("/ats/reports") && <div className="w-1 h-1 rounded-full bg-emerald-400" />}
                  </NavLink>

                  <NavLink
                    to="/ats/history"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "text-emerald-300 bg-emerald-500/10 font-bold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      }`
                    }
                  >
                    <span>Score Evolution</span>
                    {location.pathname === "/ats/history" && <div className="w-1 h-1 rounded-full bg-emerald-400" />}
                  </NavLink>

                  <NavLink
                    to="/ats/guide"
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? "text-emerald-300 bg-emerald-500/10 font-bold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      }`
                    }
                  >
                    <span>ATS Blueprint Guide</span>
                    {location.pathname === "/ats/guide" && <div className="w-1 h-1 rounded-full bg-emerald-400" />}
                  </NavLink>
                </div>
              )}
            </div>

            {/* Job Matcher */}
            <NavLink
              to="/job-matcher"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                  isActive
                    ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/30"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-transparent"
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>Job Matcher</span>
              </div>
              <span className="text-[9px] font-black px-1.5 py-0.2 rounded border text-cyan-400 bg-cyan-500/10 border-cyan-500/20">
                AI
              </span>
            </NavLink>

            {/* Interview Simulator */}
            <NavLink
              to="/interview"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                  isActive
                    ? "text-amber-400 bg-amber-500/10 border border-amber-500/30"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-transparent"
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Mic className="w-4 h-4 text-amber-400" />
                <span>Interview Simulator</span>
              </div>
              <span className="text-[9px] font-black px-1.5 py-0.2 rounded border text-amber-400 bg-amber-500/10 border-amber-500/20">
                NEW
              </span>
            </NavLink>

            {/* Career Roadmap */}
            <NavLink
              to="/roadmap"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                  isActive
                    ? "text-purple-400 bg-purple-500/10 border border-purple-500/30"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-transparent"
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-purple-400" />
                <span>Career Roadmap</span>
              </div>
              <span className="text-[9px] font-black px-1.5 py-0.2 rounded border text-purple-400 bg-purple-500/10 border-purple-500/20">
                NEW
              </span>
            </NavLink>

            {/* Cover Letter AI */}
            <NavLink
              to="/cover-letter"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                  isActive
                    ? "text-rose-400 bg-rose-500/10 border border-rose-500/30"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-transparent"
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-400" />
                <span>Cover Letter AI</span>
              </div>
              <span className="text-[9px] font-black px-1.5 py-0.2 rounded border text-rose-400 bg-rose-500/10 border-rose-500/20">
                AI
              </span>
            </NavLink>

          </div>

        </nav>
      </div>

      {/* ── Bottom Section: Diamonds & User Drawer ── */}
      <div className="p-3 border-t border-[var(--border)] bg-[var(--surface)] space-y-2.5">
        
        {/* Diamond Wallet Widget */}
        <NavLink
          to="/referral"
          onClick={onClose}
          className="p-2.5 rounded-xl bg-[var(--surface-muted)] hover:bg-[var(--surface-hover)] border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Gem className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase block leading-none">Diamond Balance</span>
              <span className="text-xs font-black text-emerald-400 font-mono">{user?.diamonds || 0} Credits</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-teal-400 group-hover:underline">Top Up →</span>
        </NavLink>

        {/* User Profile & Utilities Bar */}
        <div className="p-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] flex items-center justify-between">
          <NavLink
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-2.5 min-w-0 group flex-1"
          >
            <div className="w-8 h-8 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] overflow-hidden shrink-0 flex items-center justify-center">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="User" className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-[var(--text-muted)]" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--text-primary)] truncate block">
                {user?.firstName || user?.username || "Account"}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
                {user?.role === "admin" ? "Administrator" : "Candidate Pro"}
              </span>
            </div>
          </NavLink>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Subtle Links (Admin & Docs) */}
        <div className="flex items-center justify-between px-2 text-[10px] text-[var(--text-muted)]">
          <NavLink to="/documentation" onClick={onClose} className="hover:text-[var(--text-primary)] transition-colors">
            Documentation
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin/dashboard" onClick={onClose} className="text-amber-400 hover:underline">
              Admin Panel
            </NavLink>
          )}
        </div>

      </div>

    </aside>
  );
};

export default React.memo(Sidebar);
