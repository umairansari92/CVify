import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";
import { FaUserCircle, FaCrown, FaStar, FaGem } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-16 lg:h-20 glass border-b border-white/10 flex items-center justify-between px-4 lg:px-10 transition-all duration-300 sticky top-0 z-50 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-secondary/5 animate-pulse"></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-2 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-4 right-1/3 w-1 h-1 bg-secondary/40 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-2 left-1/2 w-1.5 h-1.5 bg-accent/30 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="flex items-center gap-2 lg:gap-4 relative z-10">
        <div className="flex flex-col group cursor-pointer">
          <div className="flex items-center gap-1 lg:gap-2">
            <FaStar
              className="text-primary animate-spin text-sm lg:text-base"
              style={{ animationDuration: "3s" }}
            />
            <h2 className="text-lg lg:text-xl font-black text-text-primary tracking-tight group-hover:text-primary transition-colors">
              Home
            </h2>
          </div>
          <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-70 group-hover:opacity-100 transition-opacity">
            My Account
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-8 relative z-10">
        {/* Diamond Balance Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 shadow-lg shadow-blue-500/5 group hover:scale-105 transition-all duration-300">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 blur-sm rounded-full animate-pulse opacity-50"></div>
            <FaGem
              className="text-blue-400 relative z-10 animate-bounce text-sm lg:text-base"
              style={{ animationDuration: "3s" }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] lg:text-[11px] font-black text-blue-400 uppercase leading-none tracking-tighter">
              Diamonds
            </span>
            <span className="text-xs lg:text-sm font-black text-text-primary leading-none mt-0.5">
              {user?.diamonds || 0}
            </span>
          </div>
          <div className="ml-1 w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div>
        </div>

        <ThemeToggle />

        <div className="flex items-center gap-2 lg:gap-4 pl-4 lg:pl-8 border-l border-white/10">
          <div className="flex flex-col items-end hidden md:flex group cursor-pointer">
            <div className="flex items-center gap-1 lg:gap-2">
              <span className="text-xs lg:text-sm font-black text-text-primary leading-none tracking-tight group-hover:text-primary transition-colors">
                {user?.firstName} {user?.lastName}
              </span>
              <FaCrown className="text-yellow-500 animate-pulse text-sm" />
            </div>
            <span className="text-[10px] lg:text-xs font-medium text-text-secondary mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
              {user?.email}
            </span>
            <span className="text-[9px] lg:text-[10px] font-black text-success mt-1 uppercase tracking-widest animate-pulse flex items-center gap-1">
              <div className="w-1 h-1 bg-success rounded-full"></div>
              Gold Member
              <div className="w-1 h-1 bg-success rounded-full"></div>
            </span>
          </div>

          {user?.profileImage ? (
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all scale-110 group-hover:scale-125"></div>
              <div
                className="absolute inset-0 bg-linear-to-r from-primary/20 to-secondary/20 rounded-full animate-spin"
                style={{ animationDuration: "10s" }}
              ></div>
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-8 h-8 lg:w-11 lg:h-11 rounded-2xl object-cover border-2 border-white/20 relative z-10 shadow-lg group-hover:shadow-primary/30 transition-all"
              />
            </div>
          ) : (
            <div className="w-8 h-8 lg:w-11 lg:h-11 rounded-2xl bg-linear-to-br from-primary/10 to-secondary/10 text-primary flex items-center justify-center border-2 border-primary/20 shadow-inner group hover:bg-linear-to-br hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <FaUserCircle size={20} className="lg:w-7 lg:h-7 relative z-10" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
