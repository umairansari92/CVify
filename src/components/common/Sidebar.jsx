import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaFileAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: <FaHome /> },
    { path: "/create", label: "Create Resume", icon: <FaFileAlt /> },
  ];

  return (
    <div className="w-64 bg-white dark:bg-slate-blue border-r border-slate-200 dark:border-slate-800/50 h-screen flex flex-col transition-colors duration-300">
      <div className="p-8 border-b border-slate-200 dark:border-slate-800/50 flex flex-col items-center justify-center gap-2">
        <img
          src={logo}
          alt="CVify Logo"
          className="w-40 h-auto dark:brightness-110"
        />
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-action text-white shadow-premium shadow-action/30 font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-midnight/50 font-medium"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`text-lg ${isActive ? "text-white" : "text-slate-400"}`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800/50">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-semibold"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
