import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaSignOutAlt,
  FaUser,
  FaThLarge,
  FaRocket,
  FaStar,
  FaCrown,
  FaTimes,
  FaEnvelopeOpenText,
  FaChartLine,
  FaShieldAlt,
  FaUsers,
  FaFileInvoice,
  FaSearchPlus,
  FaGem,
  FaHistory,
  FaCog,
  FaBook,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import Logo from "./Logo";

const Sidebar = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navItems = [
    {
      path: "/",
      label: "Home",
      icon: <FaHome />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      path: "/create",
      label: "Create Resume",
      icon: <FaFileAlt />,
      color: "from-green-500 to-emerald-500",
    },
    {
      path: "/templates",
      label: "Templates",
      icon: <FaThLarge />,
      color: "from-purple-500 to-pink-500",
    },
    {
      path: "/cover-letter",
      label: "Cover Letter",
      icon: <FaEnvelopeOpenText />,
      color: "from-orange-500 to-amber-500",
    },
    {
      path: "/ats",
      label: "ATS System",
      icon: <FaChartLine />,
      color: "from-indigo-500 to-blue-500",
    },
    {
      path: "/referral",
      label: "Earn Diamonds",
      icon: <FaRocket />,
      color: "from-red-500 to-pink-500",
    },
    {
      path: "/profile",
      label: "My Profile",
      icon: <FaUser />,
      color: "from-violet-500 to-purple-600",
    },
    {
      path: "/documentation",
      label: "Documentation",
      icon: <FaBook />,
      color: "from-slate-500 to-gray-600",
    },
    // Admin item is conditionally added below
  ];

  const adminItems = isAdmin ? [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <FaShieldAlt />,
      color: "from-amber-400 to-orange-500",
    },
    {
      path: "/admin/resumes",
      label: "Resumes",
      icon: <FaFileInvoice />,
      color: "from-teal-400 to-emerald-500",
    },
    {
      path: "/admin/ats-scans",
      label: "ATS Scans",
      icon: <FaSearchPlus />,
      color: "from-blue-400 to-indigo-500",
    },
    {
      path: "/admin/cover-letters",
      label: "Cover Letters",
      icon: <FaEnvelopeOpenText />,
      color: "from-pink-400 to-rose-500",
    },
    {
      path: "/admin/economy",
      label: "Economy",
      icon: <FaGem />,
      color: "from-purple-400 to-violet-500",
    },
    {
      path: "/admin/logs",
      label: "Activity Logs",
      icon: <FaHistory />,
      color: "from-slate-400 to-gray-500",
    },
    {
      path: "/admin/settings",
      label: "Settings",
      icon: <FaCog />,
      color: "from-cyan-400 to-blue-500",
    },
  ] : [];

  return (
    <div className="w-72 lg:w-72 backdrop-blur-2xl bg-white/[0.02] border-r border-white/5 h-screen flex flex-col relative z-20 transition-all duration-700 overflow-hidden shadow-2xl">
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-white/5 transition-colors"
        >
          <FaTimes className="text-xl text-text-muted" />
        </button>
      </div>
      
      {/* Background Glows (Minimalist) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 -left-20 w-64 h-64 bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-0 -right-20 w-64 h-64 bg-accent/20 blur-[100px]" />
      </div>

      <div className="p-8 pb-4 flex flex-col items-start relative">
        <div className="relative z-10">
          <Logo className="w-36 lg:w-40 opacity-90 hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 relative z-10 overflow-y-auto custom-scrollbar pr-2">
        <div className="flex items-center gap-2 px-5 mb-4 mt-2">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-muted opacity-40">
            Explorer
          </p>
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-500 relative overflow-hidden ${
                isActive
                  ? `bg-white/10 text-text-main shadow-lg border border-white/10`
                  : "text-text-muted hover:text-text-main hover:bg-white/[0.03]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`text-lg transition-all duration-500 ${isActive ? "text-primary scale-110" : "group-hover:text-primary"}`}>
                  {item.icon}
                </span>
                <span className={`font-bold text-[13px] tracking-tight ${isActive ? "text-text-main" : "text-text-muted/80 group-hover:text-text-main"}`}>
                  {item.label}
                </span>
                {isActive && (
                  <m.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" 
                  />
                )}
              </>
            )}
          </NavLink>
        ))}

        {isAdmin && (
          <>
            <div className="flex items-center gap-2 px-5 mt-10 mb-4">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-500/50">
                Command Center
              </p>
            </div>
            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-500 relative overflow-hidden ${
                    isActive
                      ? `bg-amber-500/10 text-amber-500 shadow-lg border border-amber-500/20`
                      : "text-text-muted hover:text-amber-500 hover:bg-amber-500/[0.02]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`text-lg transition-all duration-500 ${isActive ? "scale-110" : "group-hover:text-amber-500"}`}>
                      {item.icon}
                    </span>
                    <span className={`font-bold text-[13px] tracking-tight ${isActive ? "text-amber-500" : "text-text-muted/80 group-hover:text-amber-500"}`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <m.div 
                        layoutId="active-pill-admin"
                        className="absolute left-0 w-1 h-6 bg-amber-500 rounded-r-full" 
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <div className="p-6 pt-0 relative z-10">
        <div className="p-5 glass-card mb-6 group cursor-pointer relative overflow-hidden rounded-[2rem]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5 leading-none">
              <span className="w-1 h-1 bg-primary rounded-full animate-pulse"></span>
              Identity
            </p>
            <FaCrown className="text-amber-500 text-[10px] animate-bounce" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <FaStar size={12} className="animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <p className="text-[12px] font-black text-text-main group-hover:text-primary transition-colors leading-none mb-1">Elite Strategist</p>
              <p className="text-[9px] text-text-muted font-bold tracking-tight">Level 4 Certified</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 bg-white/[0.02] border border-white/5 text-text-muted hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 group"
        >
          <FaSignOutAlt className="group-hover:translate-x-1 transition-transform" />
          <span>Exit System</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
