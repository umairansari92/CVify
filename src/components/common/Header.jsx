import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../assets/logo.png";
const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-16 bg-white dark:bg-slate-blue border-b border-slate-200 dark:border-slate-800/50 flex items-center justify-between px-8 transition-colors duration-300 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="CVify"
          className="h-8 w-auto dark:brightness-110"
        />
        <h2 className="text-xl font-bold text-primary dark:text-slate-50 dark:font-jakarta flex items-center gap-3 mt-1">
          Welcome back,{" "}
          <span className="text-action dark:text-accent italic">
            {user?.firstName || "Professional"}
          </span>
          ! 👋
        </h2>
      </div>
      <div className="flex items-center gap-6">
        <ThemeToggle />
        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 border-l-2 border-slate-100 dark:border-slate-800 pl-6 h-8">
          <div className="flex flex-col items-end mr-1 hidden sm:flex">
            <span className="text-xs font-bold text-primary dark:text-slate-50 leading-none">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-tighter">
              Premium User
            </span>
          </div>
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border-2 border-action/20 ring-4 ring-action/5"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-midnight flex items-center justify-center text-action shadow-inner">
              <FaUserCircle size={28} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
