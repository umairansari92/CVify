import React from "react";
import { ArrowUpRight } from "lucide-react";
import { tokens } from "./tokens";

const Footer = ({ user }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="w-full py-12 md:py-16 border-t"
      style={{ backgroundColor: tokens.colors.pureBlack, color: tokens.colors.paper, borderColor: "#222222" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm text-[#D6D3D1]" style={{ fontFamily: tokens.fonts.body }}>
            &copy; {currentYear} {user?.name || "Portfolio"}.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {user?.socialLinks?.github && (
            <a 
              href={user.socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-[#78716C] hover:text-white transition-colors flex items-center gap-1"
              style={{ fontFamily: tokens.fonts.mono }}
            >
              Github <ArrowUpRight size={12} />
            </a>
          )}
          {user?.socialLinks?.linkedin && (
            <a 
              href={user.socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-[#78716C] hover:text-white transition-colors flex items-center gap-1"
              style={{ fontFamily: tokens.fonts.mono }}
            >
              LinkedIn <ArrowUpRight size={12} />
            </a>
          )}
          {user?.socialLinks?.twitter && (
            <a 
              href={user.socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-[#78716C] hover:text-white transition-colors flex items-center gap-1"
              style={{ fontFamily: tokens.fonts.mono }}
            >
              Twitter <ArrowUpRight size={12} />
            </a>
          )}
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
