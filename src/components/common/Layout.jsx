import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import Logo from "./Logo";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden transition-colors duration-500 animate-bg-shift relative">
      {/* Immersive HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 z-0" />
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden transition-all duration-500"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        w-72 fixed lg:static inset-y-0 left-0 z-[100] transform transition-transform duration-500 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 custom-scrollbar">
          <div className="max-w-[1280px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
        <Toaster 
          position="top-center" 
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--midground)',
              color: 'var(--text-main)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '1.5rem',
              fontWeight: 800,
              fontSize: '13px'
            }
          }}
        />
      </div>
    </div>
  );
};

export default Layout;
