import React from "react";
import { tokens } from "./tokens";

const Footer = ({ user }) => {
  return (
    <footer className="px-6 md:px-12 py-10 border-t" style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}>
      <div className="mx-auto max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-baseline gap-3">
          <span className="text-xl font-medium tracking-tight" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}>
            ©{new Date().getFullYear()}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}>POWERED BY</span>
          <a href="https://cvify.vercel.app" target="_blank" rel="noopener noreferrer" className="text-xs font-bold transition-colors hover:text-[var(--primary)]" style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.heading, '--primary': tokens.colors.primary }} data-cursor="hover">
            CVify Pro
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
