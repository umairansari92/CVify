import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = ({ user }) => {
  const firstName = user?.firstName || user?.name?.split(" ")[0] || "Developer";
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Developer";
  const { socialLinks } = user || {};

  return (
    <footer className="w-full bg-[#050816] border-t border-[#151030] py-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#915eff] shadow-[0_0_12px_rgba(145,94,255,0.5)]">
            <span className="text-white font-black text-lg">{firstName.charAt(0)}</span>
          </div>
          <p className="text-white text-[16px] font-bold">
            {firstName} <span className="text-[#aaa6c3] font-normal">| &copy; {new Date().getFullYear()}</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks?.github && (
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#151030] flex items-center justify-center hover:bg-[#915eff] transition-colors group border border-[#915eff]/10 hover:border-[#915eff]">
              <Github size={18} className="text-[#aaa6c3] group-hover:text-white" />
            </a>
          )}
          {socialLinks?.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#151030] flex items-center justify-center hover:bg-[#915eff] transition-colors group border border-[#915eff]/10 hover:border-[#915eff]">
              <Linkedin size={18} className="text-[#aaa6c3] group-hover:text-white" />
            </a>
          )}
          {socialLinks?.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#151030] flex items-center justify-center hover:bg-[#915eff] transition-colors group border border-[#915eff]/10 hover:border-[#915eff]">
              <Twitter size={18} className="text-[#aaa6c3] group-hover:text-white" />
            </a>
          )}
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="mt-6 text-center">
        <p className="text-[#aaa6c3] text-[13px]">
          &copy; {new Date().getFullYear()} {fullName}. Built with{" "}
          <span className="text-red-500 text-base">❤</span> using{" "}
          <a
            href="https://cvifypro.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="text-[#915eff] hover:underline font-semibold"
          >
            CVify Pro
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
