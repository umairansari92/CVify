import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = ({ user }) => {
  const { socialLinks } = user || {};

  const socials = [
    socialLinks?.github    && { href: socialLinks.github,   Icon: Github,   label: "GitHub" },
    socialLinks?.linkedin  && { href: socialLinks.linkedin,  Icon: Linkedin, label: "LinkedIn" },
    socialLinks?.twitter   && { href: socialLinks.twitter,   Icon: Twitter,  label: "Twitter" },
  ].filter(Boolean);

  return (
    <footer className="w-full bg-[#050816] border-t border-[#151030] py-10 relative z-10">
      {/* Social Icons — centered */}
      {socials.length > 0 && (
        <div className="flex items-center justify-center gap-4 mb-6">
          {socials.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full bg-[#151030] flex items-center justify-center hover:bg-[#915eff] transition-all group border border-[#915eff]/10 hover:border-[#915eff] hover:shadow-[0_0_12px_rgba(145,94,255,0.4)]"
            >
              <Icon size={18} className="text-[#aaa6c3] group-hover:text-white transition-colors" />
            </a>
          ))}
        </div>
      )}

      {/* DataVerse branding */}
      <div className="text-center">
        <p className="text-[#aaa6c3] text-[13px] flex flex-col items-center gap-2">
          <span>© {new Date().getFullYear()} DataVerse Technologies. All rights reserved.</span>
          <span>
            Powered by: {" "}
            <a href="https://dataversetechnologies.vercel.app/" target="_blank" rel="noreferrer" className="text-[#915eff] hover:underline font-semibold">
              DataVerse Technologies
            </a>
            {" | "}
            Designed &amp; Developed by: {" "}
            <a href="https://app-cvifypro.vercel.app/p/umairansari92" target="_blank" rel="noreferrer" className="text-white hover:underline font-semibold">
              Umair Ahmed
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
