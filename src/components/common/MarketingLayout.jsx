import React from "react";
import { Outlet } from "react-router-dom";
import MegaNavbar from "../navigation/MegaNavbar";
import { Toaster } from "react-hot-toast";

const MarketingLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans antialiased overflow-x-hidden relative selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl opacity-60 dark:opacity-70" />
      </div>

      {/* Floating Mega Navbar */}
      <MegaNavbar />

      {/* Main Marketing Page Content */}
      <main className="relative z-10 pt-20 sm:pt-24 min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>

      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--surface-elevated)',
            color: 'var(--text-primary)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
            fontWeight: 700,
            fontSize: '13px'
          }
        }}
      />
    </div>
  );
};

export default React.memo(MarketingLayout);
