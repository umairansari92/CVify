import React from "react";
import { tokens } from "./tokens";

const Footer = ({ user }) => {
  return (
    <footer className="py-8 bg-[#080808] border-t border-[#222] relative z-10 text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-3">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-[#a1a1aa] font-mono text-xs">
          <p>
            Powered by:{" "}
            <a href="https://dataversetechnologies.vercel.app/" target="_blank" rel="noreferrer" className="text-[var(--primary-color)] hover:underline">
              DataVerse Technologies
            </a>
          </p>
          <p className="hidden sm:block opacity-30">|</p>
          <p>
            Designed & Developed by:{" "}
            <a href="https://app-cvifypro.vercel.app/p/umairansari92" target="_blank" rel="noreferrer" className="text-white hover:underline">
              Umair Ahmed
            </a>
          </p>
        </div>
        <p className="text-[#555] font-mono text-[10px] mt-2">
          © 2026 DataVerse Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
