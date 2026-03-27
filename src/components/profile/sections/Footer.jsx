import React from "react";

const Footer = React.memo(({ personalInfo }) => {
  return (
    <footer id="footer" className="relative py-10 border-t border-[var(--card-border)] bg-[var(--bg-primary)]/90 backdrop-blur-xl z-10 overflow-hidden">
      {/* Subtle Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[var(--primary-color)]/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright Info */}
        <div className="text-[var(--text-secondary)] text-sm font-medium">
          © {new Date().getFullYear()} <span className="text-[var(--text-primary)] font-bold">{personalInfo.fullName || 'User'}</span>. All rights reserved.
        </div>

        {/* The Branding Links */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm">
          
          <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
            Powered by 
            <a 
              href="https://app-cvifypro.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--text-primary)] hover:text-[var(--primary-color)] font-bold transition-colors flex items-center gap-1 group"
            >
              CVify Pro
            </a>
            <a 
              href="https://www.linkedin.com/company/cvifypro/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-1 text-[var(--text-secondary)] hover:text-[#0077B5] transition-colors"
              title="Follow CVify on LinkedIn"
            >
              <svg size={14} viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </span>

          <span className="hidden sm:block text-[var(--card-border)]">|</span>

          {/* DataVerse Technologies Branding */}
          <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
            Designed & Developed by 
            <a 
              href="https://dataversetechnologies.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-black tracking-wide hover:opacity-80 transition-opacity"
            >
              DataVerse Technologies
            </a>
          </span>

        </div>
      </div>
    </footer>
  );
});

export default Footer;
