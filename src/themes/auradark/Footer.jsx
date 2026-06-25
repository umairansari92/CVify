import React from "react";
import { tokens } from "./tokens";

const Footer = ({ user }) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "";
  return (
    <footer
      className="w-full px-8 md:px-16 lg:px-24 py-8 border-t flex flex-col items-center gap-4 text-center"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <p className="text-[10px] uppercase tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}>
          Powered by: <a href="https://dataversetechnologies.vercel.app/" target="_blank" rel="noreferrer" className="text-white hover:opacity-80 transition-opacity">DataVerse Technologies</a>
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[10px] uppercase tracking-widest hover:-translate-y-1 transition-transform"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
        >
          BACK TO TOP ↑
        </button>
        <p className="text-[10px] uppercase tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}>
          Designed & Developed by: <a href="https://app-cvifypro.vercel.app/p/umairansari92" target="_blank" rel="noreferrer" className="text-white hover:opacity-80 transition-opacity">Umair Ahmed</a>
        </p>
      </div>
      <p className="text-[10px] uppercase tracking-widest mt-2" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}>
        © 2026 DataVerse Technologies. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
