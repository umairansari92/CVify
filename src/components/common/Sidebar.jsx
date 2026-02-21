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
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";

const Sidebar = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      path: "/referral",
      label: "Earn Diamonds",
      icon: <FaRocket />,
      color: "from-red-500 to-pink-500",
    },
  ];

  return (
    <div className="w-72 lg:w-72 bg-midground glass border-r border-border-subtle h-screen flex flex-col relative z-20 transition-all duration-300 overflow-hidden">
      {/* Mobile Close Button */}
      <div className="lg:hidden flex justify-end p-4">
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <FaTimes className="text-xl text-text-primary" />
        </button>
      </div>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-16 h-16 bg-secondary rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-12 h-12 bg-accent rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-8 w-3 h-3 bg-primary/20 rotate-45 animate-float"></div>
        <div
          className="absolute top-40 left-6 w-2 h-2 bg-secondary/30 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 right-12 w-4 h-4 bg-accent/20 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="p-10 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl rounded-full transform -translate-y-1/2 scale-150 animate-pulse"></div>
        <div className="relative z-10">
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
            <FaStar className="text-white text-xs" />
          </div>
          <img
            src={logo}
            alt="CVify Logo"
            className="w-44 h-auto dark:brightness-110 animate-float hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-3 relative z-10">
        <div className="flex items-center gap-2 px-5 mb-4">
          <FaRocket className="text-primary animate-pulse" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary opacity-50">
            Main Menu
          </p>
        </div>
        {navItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                isActive
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-primary/20 scale-[1.02]`
                  : "text-text-secondary hover:bg-white/10 hover:text-primary hover:scale-[1.01]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                    <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                  </>
                )}
                <span
                  className={`text-xl transition-all duration-300 group-hover:scale-110 relative z-10 ${
                    isActive
                      ? "text-white animate-bounce"
                      : "group-hover:text-primary"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.icon}
                </span>
                <span className="font-bold tracking-tight relative z-10">
                  {item.label}
                </span>
                {!isActive && (
                  <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 relative z-10">
        <div className="premium-card p-6 bg-linear-to-br from-primary/5 to-secondary/5 border border-primary/10 mb-6 group cursor-pointer relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-2 right-2">
            <FaCrown
              className="text-primary animate-spin"
              style={{ animationDuration: "4s" }}
            />
          </div>
          <p className="text-xs font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
            <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
            Status
            <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-lg shadow-success/50"></span>
            <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
              Premium Active
            </p>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs text-text-secondary">Expires: Never</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
              <div
                className="w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-linear-to-r from-red-500/10 to-red-600/10 text-red-500 hover:from-red-500 hover:to-red-600 hover:text-white transition-all duration-300 font-bold shadow-sm hover:shadow-lg hover:shadow-red-500/20 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <FaSignOutAlt className="text-lg relative z-10 group-hover:animate-bounce" />
          <span className="relative z-10">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
