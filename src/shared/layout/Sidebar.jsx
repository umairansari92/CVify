import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome, FaFileAlt, FaSignOutAlt, FaUser, FaThLarge,
  FaEnvelopeOpenText, FaChartLine, FaShieldAlt, FaUsers,
  FaFileInvoice, FaCog, FaBook, FaMicrophoneAlt, FaMapSigns, FaBriefcase
} from "react-icons/fa";
import { FiChevronDown, FiChevronUp, FiPlusCircle, FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import Logo from "../../components/common/Logo";

const Sidebar = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const [isResumeOpen, setIsResumeOpen] = useState(
    location.pathname.startsWith("/resume-builder") || location.pathname === "/ats"
  );

  const isAdminArea = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const careerOsItems = [
    { path: "/dashboard", label: "Command Center", icon: <FaHome /> },
    {
      id: "resume-parent",
      label: "Resume",
      icon: <FaFileAlt />,
      isSubmenu: true,
      children: [
        { path: "/resume-builder/my-resumes", label: "My Resumes" },
        { path: "/resume-builder/create", label: "Resume Builder" },
        { path: "/ats", label: "Resume Checker" },
      ]
    },
    { path: "/ats", label: "ATS Intelligence", icon: <FaChartLine /> },
    { path: "/cover-letter", label: "Cover Letter AI", icon: <FaEnvelopeOpenText /> },
    { path: "/templates", label: "Portfolio Lab", icon: <FaThLarge /> },
    { path: "/job-matcher", label: "Job Matcher", icon: <FaBriefcase /> },
    { path: "/interview", label: "Interview Simulator", icon: <FaMicrophoneAlt /> },
    { path: "/roadmap", label: "Career Roadmap", icon: <FaMapSigns /> },
    { path: "/profile", label: "Profile", icon: <FaUser /> },
    { path: "/documentation", label: "Documentation", icon: <FaBook /> },
    ...((user?.role === "admin" || user?.role === "superadmin")
      ? [{ path: "/admin/dashboard", label: "Admin Panel", icon: <FaShieldAlt /> }]
      : []),
  ];

  const adminItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <FaShieldAlt /> },
    { path: "/admin/analytics", label: "User Analytics", icon: <FaUsers /> },
    { path: "/admin/resumes", label: "Resume Submissions", icon: <FaFileInvoice /> },
    { path: "/admin/ats-scans", label: "ATS Logs", icon: <FaChartLine /> },
    { path: "/admin/logs", label: "Activity Logs", icon: <FaFileAlt /> },
    { path: "/admin/settings", label: "System Settings", icon: <FaCog /> },
    { path: "/dashboard", label: "Back to App", icon: <FaHome /> },
  ];

  const itemsToRender = isAdminArea ? adminItems : careerOsItems;

  return (
    <div className="w-72 lg:w-72 bg-bg-secondary border-r border-border-subtle h-screen flex flex-col relative z-20 transition-all duration-700 overflow-hidden">
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end p-4">
        <button onClick={onClose} className="p-3 rounded-2xl hover:bg-white/5 transition-all text-text-muted">
          ✕
        </button>
      </div>

      <div className="p-8 pb-6 flex flex-col items-center relative">
        <m.div className="relative z-10 w-full flex justify-center group/logo overflow-hidden">
          <Logo className="w-36 lg:w-40 opacity-95 relative z-10" />
        </m.div>
      </div>

      <nav className="flex-1 px-5 py-4 space-y-1.5 relative z-10 overflow-y-auto custom-scrollbar-thin pr-3">
        <div className="flex items-center gap-2 px-5 mb-5 mt-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted opacity-50">
            {isAdminArea ? "Control Plane" : "Career OS"}
          </p>
        </div>

        {itemsToRender.map((item) => {
          if (item.isSubmenu) {
            const isChildActive = item.children.some((c) => location.pathname === c.path);
            return (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => setIsResumeOpen(!isResumeOpen)}
                  className={`flex items-center justify-between w-full px-6 py-3.5 rounded-[14px] transition-all duration-200 font-semibold text-[14px] ${
                    isChildActive
                      ? "bg-primary/10 text-primary"
                      : "text-text-muted hover:text-text-main hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-[1.1rem] transition-all duration-200 ${isChildActive ? "text-primary" : ""}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {isResumeOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </button>

                <AnimatePresence>
                  {isResumeOpen && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-12 space-y-1 overflow-hidden"
                    >
                      {item.children.map((subItem) => (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                              isActive
                                ? "bg-primary/20 text-primary border-l-2 border-primary"
                                : "text-text-muted hover:text-text-main hover:bg-white/5"
                            }`
                          }
                        >
                          {subItem.label}
                        </NavLink>
                      ))}
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-3.5 rounded-[14px] transition-all duration-200 font-semibold text-[14px] ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-text-muted hover:text-text-main hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`text-[1.1rem] transition-all duration-200 ${isActive ? "text-primary" : ""}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <m.div layoutId="active-nav" className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-glow-primary" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-8 pt-0 relative z-10">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-4 px-8 py-4 rounded-2xl font-bold text-[12px] uppercase tracking-wider transition-all duration-300 bg-midground border border-border-subtle text-text-secondary hover:text-danger hover:border-danger/30"
        >
          <FaSignOutAlt size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
