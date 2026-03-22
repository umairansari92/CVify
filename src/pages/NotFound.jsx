import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft, FaCompass } from "react-icons/fa";
import logo from "../assets/logo.png";
import ThemeToggle from "../components/common/ThemeToggle";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-soft dark:bg-midnight p-6 transition-colors duration-500 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-action/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500/5 rounded-full blur-[120px] animate-pulse" />

      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="max-w-xl w-full relative z-10 animate-fadeIn text-center">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-end mb-4">
            <img
              src={logo}
              alt="CVify Pro"
              className="w-48 h-auto dark:brightness-110"
            />
            <span className="text-action dark:text-accent font-black text-3xl italic tracking-tighter mb-1 -ml-2 filter drop-shadow-md">Pro</span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-blue/40 backdrop-blur-xl p-10 rounded-[3rem] shadow-premium border border-white/20 dark:border-white/5 relative overflow-hidden">
          {/* Large Background Details */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-slate-100/50 dark:text-slate-800/30 opacity-50 select-none z-0">
            404
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 dark:text-red-400 mb-6 shadow-inner">
              <FaCompass className="text-4xl animate-spin-slow" style={{ animationDuration: '4s' }} />
            </div>

            <h1 className="text-4xl font-black text-primary dark:text-slate-50 mb-4 tracking-tight">
              Lost in Space?
            </h1>
            <p className="text-base text-slate-500 dark:text-slate-400 mb-10 max-w-md leading-relaxed px-4">
              The professional profile or page you are looking for has been moved, deleted, or never existed in the CVify Pro universe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold uppercase tracking-widest px-8 py-4 rounded-2xl transition-all shadow-sm active:scale-95"
              >
                <FaArrowLeft /> Go Back
              </button>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 bg-action hover:bg-blue-600 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-2xl transition-all shadow-premium hover:shadow-action/40 active:scale-95 glow-btn"
              >
                <FaHome /> Return Home
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          ERROR 404 • PAGE NOT FOUND
        </div>
      </div>
    </div>
  );
};

export default NotFound;
