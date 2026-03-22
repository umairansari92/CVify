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
    <div className="w-72 lg:w-72 glass border-r border-border-subtle h-screen flex flex-col relative z-20 transition-all duration-500 overflow-hidden">
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <FaTimes className="text-xl text-text-main" />
        </button>
      </div>
      
      {/* Decorative Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 -left-10 w-40 h-40 bg-primary/20 blur-[80px] animate-pulse"></div>
        <div className="absolute bottom-0 -right-10 w-40 h-40 bg-accent/20 blur-[80px] animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="p-8 flex flex-col items-center justify-center relative">
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center justify-center group cursor-pointer">
            <Logo className="w-48" />
          </div>
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2"></div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 relative z-10 overflow-y-auto custom-scrollbar pr-2">
        <div className="flex items-center gap-2 px-5 mb-4 mt-2">
          <FaRocket className="text-primary/60 text-xs" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted opacity-60">
            Main Menu
          </p>
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                isActive
                  ? `bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]`
                  : "text-text-muted hover:bg-foreground/20 hover:text-text-main hover:translate-x-1"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-white" : "group-hover:text-primary text-text-muted"}`}>
                  {item.icon}
                </span>
                <span className={`font-bold text-sm tracking-tight ${isActive ? "text-white" : "group-hover:text-text-main"}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]"></div>
                )}
              </>
            )}
          </NavLink>
        ))}

        {isAdmin && (
          <>
            <div className="flex items-center gap-2 px-5 mt-10 mb-4">
              <FaShieldAlt className="text-amber-500/60 text-xs" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/60">
                Admin Center
              </p>
            </div>
            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? `bg-amber-500 text-white shadow-xl shadow-amber-500/20 scale-[1.02]`
                      : "text-text-muted hover:bg-amber-500/5 hover:text-amber-500 hover:translate-x-1"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-white" : "group-hover:text-amber-500 text-text-muted"}`}>
                      {item.icon}
                    </span>
                    <span className={`font-bold text-sm tracking-tight ${isActive ? "text-white" : "group-hover:text-text-main"}`}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <div className="p-6 relative z-10">
        <div className="premium-card p-5 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 mb-6 group cursor-pointer relative overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1 h-1 bg-primary rounded-full animate-pulse"></span>
              Account Status
            </p>
            <FaCrown className="text-amber-500 text-xs animate-bounce" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <FaStar size={14} className="animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <div>
              <p className="text-xs font-black text-text-main group-hover:text-primary transition-colors">Elite Member</p>
              <p className="text-[9px] text-text-muted font-bold mt-0.5">Lifetime Access</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white shadow-sm hover:shadow-red-500/20 group"
        >
          <FaSignOutAlt className="text-lg group-hover:translate-x-1 transition-transform" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
