import React from "react";
import { tokens } from "./tokens";

const Footer = ({ user }) => {
  return (
    <footer 
      className="py-8 border-t relative z-10"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      <div className="max-w-[1700px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span 
          className="font-mono text-[9px] uppercase tracking-[0.3em]"
          style={{ color: tokens.colors.textFaint }}
        >
          © {new Date().getFullYear()} {user?.name || "Portfolio"}. All rights reserved.
        </span>
        
        <span 
          className="font-mono text-[9px] uppercase tracking-[0.3em]"
          style={{ color: tokens.colors.textFaint }}
        >
          Powered by CVify Pro
        </span>
      </div>
    </footer>
  );
};

export default Footer;
