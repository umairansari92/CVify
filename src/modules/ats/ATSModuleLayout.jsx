import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { 
  Sparkles, 
  Scan, 
  FileText, 
  TrendingUp, 
  BookOpen, 
  ShieldCheck 
} from "lucide-react";
import ATSErrorBoundary from "./ATSErrorBoundary";

const ATSModuleLayout = () => {
  const location = useLocation();

  const navItems = [
    { label: "Overview", path: "/ats", icon: Sparkles, exact: true },
    { label: "Scanner", path: "/ats/scan", icon: Scan },
    { label: "Debrief Reports", path: "/ats/reports", icon: FileText },
    { label: "Growth Timeline", path: "/ats/history", icon: TrendingUp },
    { label: "ATS Guide", path: "/ats/guide", icon: BookOpen },
  ];

  return (
    <ATSErrorBoundary>
      <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-300 flex flex-col">
        {/* Sub-Header Navigation */}
        <header className="sticky top-0 z-30 bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)] px-4 lg:px-8 py-3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Title & Badge */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
                    ATS Intelligence System
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    v2.0
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] hidden sm:block">
                  Recruiter Decoding & AI Intelligence Engine
                </p>
              </div>
            </div>

            {/* Sub-Routes Nav Pills */}
            <nav className="flex items-center gap-1 bg-[var(--surface-muted)] p-1 rounded-xl border border-[var(--border)] overflow-x-auto max-w-full">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact 
                  ? location.pathname === item.path 
                  : location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                        isActive
                          ? "bg-[var(--primary)] text-white shadow-md shadow-emerald-500/20 font-semibold"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                      }`
                    }
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

          </div>
        </header>

        {/* Main Route Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </ATSErrorBoundary>
  );
};

export default ATSModuleLayout;
