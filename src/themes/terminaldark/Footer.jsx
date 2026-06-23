import React from "react";
import { Github, Linkedin, Twitter, Globe } from "lucide-react";

const Footer = ({ user }) => {
  const firstName = user?.firstName || user?.name?.split(" ")[0] || "Developer";
  const { socialLinks } = user || {};

  return (
    <footer className="w-full bg-[#050816] border-t border-[#151030] py-10 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#915eff]">
            <span className="text-white font-black text-lg">{firstName.charAt(0)}</span>
          </div>
          <p className="text-white text-[16px] font-bold">
            {firstName} <span className="text-[#aaa6c3] font-normal">| &copy; {new Date().getFullYear()}</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks?.github && (
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#151030] flex items-center justify-center hover:bg-[#915eff] transition-colors group">
              <Github size={18} className="text-[#aaa6c3] group-hover:text-white" />
            </a>
          )}
          {socialLinks?.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#151030] flex items-center justify-center hover:bg-[#915eff] transition-colors group">
              <Linkedin size={18} className="text-[#aaa6c3] group-hover:text-white" />
            </a>
          )}
          {socialLinks?.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#151030] flex items-center justify-center hover:bg-[#915eff] transition-colors group">
              <Twitter size={18} className="text-[#aaa6c3] group-hover:text-white" />
            </a>
          )}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
