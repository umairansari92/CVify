import React from "react";
import { tokens } from "./tokens";

const Footer = ({ user }) => {
  return (
    <footer className="py-8 bg-[#080808] border-t border-[#222] relative z-10 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-[#a1a1aa] font-mono text-xs sm:text-sm">
          Designed & Built by{" "}
          <span className="text-[var(--primary-color)]">
            {user?.firstName || "Developer"} {user?.lastName || ""}
          </span>
        </p>
        <p className="text-[#555] font-mono text-[10px] mt-2">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
