import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FileText, 
  Target, 
  Mic, 
  Compass, 
  Briefcase, 
  Mail, 
  Grid, 
  ChevronDown, 
  Sparkles,
  ExternalLink
} from "lucide-react";

const appsList = [
  {
    id: "resume-builder",
    name: "Resume Studio",
    tagline: "AI Resume Builder & Templates",
    path: "/resume-builder",
    workspacePath: "/resume/library",
    icon: FileText,
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    bgColor: "bg-blue-500/10",
    badge: "PRO"
  },
  {
    id: "ats",
    name: "ATS Intelligence",
    tagline: "2026 Score & Keyword Auditor",
    path: "/ats",
    workspacePath: "/ats/scan",
    icon: Target,
    color: "from-emerald-500 to-teal-600",
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    bgColor: "bg-emerald-500/10",
    badge: "v5.1"
  },
  {
    id: "interview",
    name: "Interview Simulator",
    tagline: "Live AI Mock Interviews",
    path: "/interview",
    workspacePath: "/interview",
    icon: Mic,
    color: "from-amber-500 to-orange-600",
    textColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    bgColor: "bg-amber-500/10",
    badge: "AI"
  },
  {
    id: "roadmap",
    name: "Career Roadmap",
    tagline: "Milestones & Skill Ladder",
    path: "/roadmap",
    workspacePath: "/roadmap",
    icon: Compass,
    color: "from-purple-500 to-violet-600",
    textColor: "text-purple-400",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/10",
    badge: "NEW"
  },
  {
    id: "job-matcher",
    name: "Job Matcher",
    tagline: "Target JD Proximity Engine",
    path: "/job-matcher",
    workspacePath: "/job-matcher",
    icon: Briefcase,
    color: "from-cyan-500 to-blue-600",
    textColor: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    bgColor: "bg-cyan-500/10",
    badge: "AI"
  },
  {
    id: "cover-letter",
    name: "Cover Letter AI",
    tagline: "Tailored Executive Outreaches",
    path: "/cover-letter",
    workspacePath: "/cover-letter",
    icon: Mail,
    color: "from-rose-500 to-pink-600",
    textColor: "text-rose-400",
    borderColor: "border-rose-500/30",
    bgColor: "bg-rose-500/10",
    badge: "AI"
  },
];

const AppSwitcherDropdown = ({ isWorkspaceMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 text-xs font-bold ${
          isOpen
            ? "bg-slate-800 border-slate-700 text-slate-100 shadow-lg shadow-emerald-500/5"
            : "bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 text-slate-300 hover:text-slate-100"
        }`}
        aria-label="App Switcher"
      >
        <Grid className="w-3.5 h-3.5 text-emerald-400" />
        <span className="hidden sm:inline">Apps</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Matrix */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 sm:w-96 p-3 bg-slate-950/95 backdrop-blur-2xl border border-slate-800/90 rounded-2xl shadow-2xl shadow-black/80 z-[100] animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              CVify Pro Ecosystem
            </div>
            <span className="text-[10px] text-slate-500 font-mono">6 AI Tools</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {appsList.map((app) => {
              const Icon = app.icon;
              const targetRoute = isWorkspaceMode ? app.workspacePath : app.path;
              const isActive = location.pathname.startsWith(app.path);

              return (
                <Link
                  key={app.id}
                  to={targetRoute}
                  className={`p-2.5 rounded-xl border transition-all duration-200 flex flex-col justify-between group ${
                    isActive
                      ? "bg-slate-900 border-slate-700 shadow-md shadow-emerald-500/5"
                      : "bg-slate-900/40 hover:bg-slate-900 border-slate-800/60 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${app.bgColor} ${app.borderColor}`}>
                      <Icon className={`w-3.5 h-3.5 ${app.textColor}`} />
                    </div>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${app.bgColor} ${app.borderColor} ${app.textColor}`}>
                      {app.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-200 group-hover:text-white block tracking-tight">
                      {app.name}
                    </span>
                    <span className="text-[10px] text-slate-400 line-clamp-1">
                      {app.tagline}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between px-2 text-[10px] text-slate-400">
            <span>Unified Diamond Economy</span>
            <Link to="/dashboard" className="text-emerald-400 hover:underline font-bold flex items-center gap-1">
              Command Center →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(AppSwitcherDropdown);
