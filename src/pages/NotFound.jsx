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
          <div className="relative z-10 flex flex-col items-center py-10">
            <h1 className="text-8xl md:text-9xl font-black text-red-500 mb-2 drop-shadow-xl select-none uppercase bg-black/20 px-6 py-2 rounded-xl backdrop-blur-sm">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-12 drop-shadow-lg tracking-wide bg-black/20 px-6 py-2 rounded-xl backdrop-blur-sm">
              This page could not be found.
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-gray-500 font-bold uppercase tracking-widest px-8 py-4 rounded-2xl transition-all shadow-sm active:scale-95 backdrop-blur-md"
              >
                <FaArrowLeft /> Go Back
              </button>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 bg-white text-action hover:bg-slate-100 font-bold uppercase tracking-widest px-8 py-4 rounded-2xl transition-all shadow-premium active:scale-95"
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
