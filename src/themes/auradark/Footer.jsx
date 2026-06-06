import React from "react";
import { tokens } from "./tokens";

const Footer = ({ user }) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "";
  return (
    <footer
      className="w-full px-8 md:px-16 lg:px-24 py-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      <p className="text-xs uppercase tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}>
        © {new Date().getFullYear()} {fullName}. All Rights Reserved.
      </p>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-xs uppercase tracking-widest hover:-translate-y-1 transition-transform"
        style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}
      >
        BACK TO TOP ↑
      </button>
      <p className="text-xs uppercase tracking-widest" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textFaint }}>
        ENGINEERED IN PAKISTAN
      </p>
    </footer>
  );
};

export default Footer;
