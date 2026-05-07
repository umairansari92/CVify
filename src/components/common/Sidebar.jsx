import React from "react";
import { m } from "framer-motion";
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
      path: "/builder",
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
    <div className="w-72 lg:w-72 sidebar-premium h-screen flex flex-col relative z-20 transition-all duration-700 overflow-hidden">
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-3 rounded-2xl hover:bg-white/5 transition-all active:scale-95 duration-200"
        >
          <FaTimes className="text-xl text-text-muted" />
        </button>
      </div>
      
      {/* Background HUD Interface Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 -left-20 w-64 h-64 bg-primary/20 blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 -right-20 w-64 h-64 bg-accent/20 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="p-8 pb-6 flex flex-col items-center relative">
        <m.div 
          whileHover={{ scale: 1.02 }}
          className="relative z-10 p-4 glass-soft rounded-[2rem] border-primary/10 w-full flex justify-center group/logo overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700" />
          <Logo className="w-36 lg:w-40 opacity-95 relative z-10" />
        </m.div>
      </div>

      <nav className="flex-1 px-5 py-4 space-y-1.5 relative z-10 overflow-y-auto custom-scrollbar-thin pr-3">
        <div className="flex items-center gap-2 px-5 mb-5 mt-2">
          <div className="w-1 h-3 bg-primary/40 rounded-full" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted opacity-50">
            Explorer
          </p>
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item-premium ${isActive ? "active" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`text-[1.1rem] transition-all duration-500 ${isActive ? "text-primary" : "group-hover:text-primary"}`}>
                  {item.icon}
                </span>
                <span className={`tracking-tight text-[14px] ${isActive ? "text-text-main" : "text-text-muted group-hover:text-text-main"}`}>
                  {item.label}
                </span>
                {isActive && (
                  <m.div 
                    layoutId="active-pill"
                    className="absolute left-0 w-1.5 h-6 bg-primary rounded-r-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" 
                  />
                )}
              </>
            )}
          </NavLink>
        ))}

        {isAdmin && (
          <>
            <div className="flex items-center gap-2 px-5 mt-12 mb-5">
              <div className="w-1 h-3 bg-amber-500/40 rounded-full" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500/60">
                Command Center
              </p>
            </div>
            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-4 px-6 py-3.5 rounded-[1.25rem] transition-all duration-500 relative overflow-hidden ${
                    isActive
                      ? `glass-medium text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)] border-amber-500/30`
                      : "text-text-secondary hover:text-amber-500 hover:bg-amber-500/[0.03]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`text-[1.15rem] transition-all duration-500 ${isActive ? "scale-110" : "group-hover:text-amber-500 group-hover:scale-110"}`}>
                      {item.icon}
                    </span>
                    <span className={`font-black tracking-tight text-[13px] ${isActive ? "text-amber-500" : "text-text-secondary group-hover:text-amber-500"}`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <m.div 
                        layoutId="active-pill-admin"
                        className="absolute left-0 w-1.5 h-6 bg-amber-500 rounded-r-full shadow-[0_0_15px_rgba(245,158,11,0.8)]" 
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <div className="p-8 pt-0 relative z-10">
        {/* Elite Identity Badge */}
        <m.div 
          whileHover={{ y: -5 }}
          className="p-6 glass-strong mb-7 group cursor-pointer relative overflow-hidden rounded-[2rem] border-primary/20 glow-primary"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2 leading-none">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_var(--primary)]"></span>
              Identity
            </p>
            <FaCrown className="text-amber-500 text-[11px] group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-primary/15 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
              <FaStar size={14} className="animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <p className="text-[14px] font-black text-text-primary group-hover:text-primary transition-colors leading-none mb-1.5 uppercase tracking-tighter">Elite Strategist</p>
              <p className="text-[10px] text-text-secondary font-bold tracking-tight opacity-70">LEVEL 4 CERTIFIED</p>
            </div>
          </div>
        </m.div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-4 px-8 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 glass-soft border-white/5 text-text-secondary hover:glass-medium hover:text-red-500 hover:border-red-500/30 group active:scale-95"
        >
          <FaSignOutAlt size={14} className="group-hover:translate-x-1 transition-transform" />
          <span>Exit System</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
