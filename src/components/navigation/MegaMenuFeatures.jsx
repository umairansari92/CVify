import React from "react";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Target, 
  Sparkles, 
  Layers, 
  Compass, 
  Mic, 
  Mail, 
  Cpu, 
  Briefcase, 
  DollarSign, 
  Eye, 
  BarChart3, 
  Activity, 
  ShieldCheck, 
  Code, 
  Palette,
  ArrowRight,
  Zap
} from "lucide-react";

const MegaMenuFeatures = ({ onClose = () => {} }) => {
  const menuCategories = [
    {
      title: "Resume Intelligence",
      items: [
        {
          name: "Resume Checker",
          desc: "Deterministic ATS format & syntax scan",
          path: "/ats",
          icon: ShieldCheck,
          badge: "AI",
          color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
        },
        {
          name: "ATS Intelligence Scanner",
          desc: "Fortune 500 keyword gap & scoring auditor",
          path: "/ats/scan",
          icon: Target,
          badge: "v5.1",
          color: "text-teal-400 bg-teal-500/10 border-teal-500/20"
        },
        {
          name: "AI Resume Builder",
          desc: "Step-by-step executive resume creation",
          path: "/resume-builder",
          icon: FileText,
          badge: "PRO",
          color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
        },
        {
          name: "ATS Templates Catalog",
          desc: "12+ recruiter-approved ATS layouts",
          path: "/templates",
          icon: Layers,
          badge: "NEW",
          color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
        },
      ]
    },
    {
      title: "Career AI & Copilots",
      items: [
        {
          name: "AI Career Coach",
          desc: "Actionable debriefs & reality checks",
          path: "/ats/reports",
          icon: Sparkles,
          badge: "AI",
          color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
        },
        {
          name: "Interview Simulator",
          desc: "Real-time AI behavioral & tech mocks",
          path: "/interview",
          icon: Mic,
          badge: "NEW",
          color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
        },
        {
          name: "Cover Letter AI",
          desc: "Tailored executive cover letter creator",
          path: "/cover-letter",
          icon: Mail,
          badge: "AI",
          color: "text-rose-400 bg-rose-500/10 border-rose-500/20"
        },
        {
          name: "Career Roadmap",
          desc: "Personalized engineering milestones",
          path: "/roadmap",
          icon: Compass,
          badge: "NEW",
          color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
        },
      ]
    },
    {
      title: "Job Intelligence",
      items: [
        {
          name: "Smart Job Matcher",
          desc: "Match resume against any live JD URL",
          path: "/job-matcher",
          icon: Briefcase,
          badge: "AI",
          color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
        },
        {
          name: "Salary & Compensation",
          desc: "Calibrated tech salary benchmarks",
          path: "/job-matcher",
          icon: DollarSign,
          badge: "SOON",
          color: "text-slate-400 bg-slate-800 border-slate-700"
        },
        {
          name: "Recruiter Connect",
          desc: "Simulate 7-second recruiter eye tracking",
          path: "/ats/reports",
          icon: Eye,
          badge: "NEW",
          color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
        },
        {
          name: "Application Tracker",
          desc: "Organize active job outreach pipeline",
          path: "/dashboard",
          icon: BarChart3,
          badge: "PRO",
          color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
        },
      ]
    },
    {
      title: "Platform & Ecosystem",
      items: [
        {
          name: "Command Center",
          desc: "Unified metrics, scans & diamond wallet",
          path: "/dashboard",
          icon: Activity,
          badge: "OS",
          color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
        },
        {
          name: "Chrome Extension",
          desc: "1-click JD import from LinkedIn & Indeed",
          path: "/documentation",
          icon: Zap,
          badge: "SOON",
          color: "text-slate-400 bg-slate-800 border-slate-700"
        },
        {
          name: "Developer Documentation",
          desc: "Architecture guides, API contracts & specs",
          path: "/documentation",
          icon: Code,
          badge: "DOCS",
          color: "text-teal-400 bg-teal-500/10 border-teal-500/20"
        },
        {
          name: "Portfolio Theme Engine",
          desc: "12+ modern portfolio themes",
          path: "/profile",
          icon: Palette,
          badge: "v4.0",
          color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
        },
      ]
    },
  ];

  return (
    <div className="w-[850px] lg:w-[980px] p-6 bg-[var(--surface-elevated)]/98 backdrop-blur-3xl border border-[var(--border)] rounded-3xl shadow-2xl grid grid-cols-12 gap-6 animate-in fade-in zoom-in-95 duration-150 text-[var(--text-primary)]">
      
      {/* Left 4 Columns (9 Columns Span) */}
      <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-5">
        {menuCategories.map((cat, idx) => (
          <div key={idx} className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5 border-b border-[var(--border)] pb-1.5">
              {cat.title}
            </span>

            <div className="space-y-1.5">
              {cat.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    to={item.path}
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-[var(--surface-hover)] border border-transparent hover:border-[var(--border)] transition-all flex items-start gap-2.5 group"
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${item.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-emerald-500 transition-colors truncate">
                          {item.name}
                        </span>
                        <span className={`text-[9px] font-black px-1.5 py-0.2 rounded border uppercase ${item.color}`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] line-clamp-1 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Right Spotlight Card (4 Columns Span) */}
      <div className="col-span-12 lg:col-span-4 bg-gradient-to-b from-[var(--surface-muted)] to-[var(--surface)] p-5 rounded-2xl border border-emerald-500/20 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              FEATURED SPOTLIGHT
            </span>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">v5.1 Engine</span>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-base font-black text-[var(--text-primary)] tracking-tight">
              Fortune 500 ATS Scanner
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Test your resume against 2026 Workday, Greenhouse & Taleo algorithms with zero token waste.
            </p>
          </div>

          {/* Mini Interactive Preview Graphic */}
          <div className="p-3 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border)] space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[var(--text-muted)]">Match Benchmark</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">94% PASSED</span>
            </div>
            <div className="w-full bg-[var(--surface-muted)] h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[94%]" />
            </div>
            <div className="flex items-center justify-between text-[9px] text-[var(--text-muted)]">
              <span>7-Stage Pipeline Verified</span>
              <span>Latency: 78ms</span>
            </div>
          </div>
        </div>

        <Link
          to="/ats/scan"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all group"
        >
          <span>Launch Scanner</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
};

export default React.memo(MegaMenuFeatures);
