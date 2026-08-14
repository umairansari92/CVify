import React from "react";
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
  Shield,
  BookOpen,
  Sparkles,
  ChevronRight
} from "lucide-react";

const Sidebar = ({ onClose = () => {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const coreNavItems = [
    {
      path: "/dashboard",
      label: "Command Center",
      icon: LayoutDashboard,
      color: "text-slate-400 group-hover:text-emerald-400",
      activeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
    },
    {
      path: "/resume/library",
      label: "My Resumes",
      icon: FileText,
      color: "text-slate-400 group-hover:text-blue-400",
      activeColor: "text-blue-400 bg-blue-500/10 border-blue-500/30"
    },
    {
      path: "/templates",
      label: "ATS Templates",
      icon: Layers,
      color: "text-slate-400 group-hover:text-indigo-400",
      activeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30"
    },
  ];

  const aiCareerTools = [
    {
      path: "/ats/scan",
      activePaths: ["/ats/scan", "/ats/reports", "/ats/history", "/ats/guide"],
      label: "ATS Intelligence",
      icon: Target,
      tag: "v5.1",
      tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      activeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      dotColor: "bg-emerald-400"
    },
    {
      path: "/job-matcher",
      activePaths: ["/job-matcher"],
      label: "Job Matcher",
      icon: Briefcase,
      tag: "AI",
      tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      activeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
      dotColor: "bg-cyan-400"
    },
    {
      path: "/interview",
      activePaths: ["/interview"],
      label: "Interview Simulator",
      icon: Mic,
      tag: "NEW",
      tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      activeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      dotColor: "bg-amber-400"
    },
    {
      path: "/roadmap",
      activePaths: ["/roadmap"],
      label: "Career Roadmap",
      icon: Compass,
      tag: "NEW",
      tagColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      activeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
      dotColor: "bg-purple-400"
    },
    {
      path: "/cover-letter",
      activePaths: ["/cover-letter"],
      label: "Cover Letter AI",
      icon: Mail,
      tag: "AI",
      tagColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      activeColor: "text-rose-400 bg-rose-500/10 border-rose-500/30",
      dotColor: "bg-rose-400"
    },
  ];

  return (
    <aside className="w-72 bg-slate-950/90 backdrop-blur-2xl border-r border-slate-800/80 h-screen flex flex-col justify-between relative z-30 transition-all duration-300 overflow-hidden">
      
      {/* ── Top Header & Logo ── */}
      <div>
        <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-800/60">
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
            className="lg:hidden p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
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
        <nav className="px-3 py-2 space-y-5 overflow-y-auto max-h-[calc(100vh-320px)] custom-scrollbar">
          
          {/* Section 1: Core Workspace */}
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3 block mb-1.5">
              Workspace Core
            </span>
            {coreNavItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={idx}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                    isActive
                      ? `border ${item.activeColor}`
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "" : item.color} transition-colors`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </NavLink>
              );
            })}
          </div>

          {/* Section 2: AI Career Tools */}
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3 block mb-1.5">
              AI Career Copilots
            </span>
            {aiCareerTools.map((tool, idx) => {
              const Icon = tool.icon;
              const isActive = tool.activePaths.some((p) => location.pathname.startsWith(p));

              return (
                <NavLink
                  key={idx}
                  to={tool.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                    isActive
                      ? `border ${tool.activeColor}`
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 transition-colors" />
                    <span>{tool.label}</span>
                  </div>
                  <span className={`text-[9px] font-black px-1.5 py-0.2 rounded border ${tool.tagColor}`}>
                    {tool.tag}
                  </span>
                </NavLink>
              );
            })}
          </div>

        </nav>
      </div>

      {/* ── Bottom Section: Diamonds & User Drawer ── */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950 space-y-2.5">
        
        {/* Diamond Wallet Widget */}
        <NavLink
          to="/referral"
          onClick={onClose}
          className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Gem className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">Diamond Balance</span>
              <span className="text-xs font-black text-emerald-400 font-mono">{user?.diamonds || 0} Credits</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-teal-400 group-hover:underline">Top Up →</span>
        </NavLink>

        {/* User Profile & Utilities Bar */}
        <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-center justify-between">
          <NavLink
            to="/profile"
            onClick={onClose}
            className="flex items-center gap-2.5 min-w-0 group flex-1"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="User" className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-slate-400" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-slate-200 group-hover:text-white truncate block">
                {user?.firstName || user?.username || "Account"}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
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
        <div className="flex items-center justify-between px-2 text-[10px] text-slate-500">
          <NavLink to="/documentation" onClick={onClose} className="hover:text-slate-300">
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
