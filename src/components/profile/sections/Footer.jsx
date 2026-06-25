import React from "react";

const Footer = React.memo(({ personalInfo }) => {
  return (
    <footer id="footer" className="relative py-10 border-t border-[var(--card-border)] bg-[var(--bg-primary)]/90 backdrop-blur-xl z-10 overflow-hidden">
      {/* Subtle Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-color)]/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright Info */}
        <div className="text-[var(--text-secondary)] text-sm font-medium text-center sm:text-left">
          © 2026 DataVerse Technologies. All rights reserved.
        </div>

        {/* The Branding Links */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm">
          
          <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
            Powered by: 
            <a 
              href="https://dataversetechnologies.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--text-primary)] hover:text-[var(--primary-color)] font-bold transition-colors"
            >
              DataVerse Technologies
            </a>
          </span>

          <span className="hidden sm:block text-[var(--card-border)]">|</span>

          <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
            Designed & Developed by: 
            <a 
              href="https://app-cvifypro.vercel.app/p/umairansari92" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-black tracking-wide hover:opacity-80 transition-opacity"
            >
              Umair Ahmed
            </a>
          </span>

        </div>
      </div>
    </footer>
  );
});

export default Footer;
