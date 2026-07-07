import React from "react";
import { ArrowUpRight } from "lucide-react";
import { tokens } from "./tokens";

const Footer = ({ user }) => {
  const currentYear = new Date().getFullYear();
  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "Portfolio";
  const socialLinks = user?.socialLinks || {};

  const socials = [
    { label: "Github", url: socialLinks.github },
    { label: "LinkedIn", url: socialLinks.linkedin },
    { label: "Twitter", url: socialLinks.twitter },
    { label: "Website", url: socialLinks.website || socialLinks.portfolio },
  ].filter((s) => s.url);

  return (
    <footer
      className="w-full py-12 md:py-16 border-t"
      style={{
        backgroundColor: tokens.colors.pureBlack,
        color: tokens.colors.paper,
        borderColor: "#222222",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Copyright */}
        <p
          className="text-sm"
          style={{ fontFamily: tokens.fonts.body, color: "#D6D3D1" }}
        >
          &copy; {currentYear} {displayName}.
        </p>

        {/* Social Links */}
        {socials.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs uppercase tracking-widest transition-colors hover:text-white"
                style={{ fontFamily: tokens.fonts.mono, color: "#78716C" }}
              >
                {s.label} <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        )}

      </div>
    </footer>
  );
};

export default Footer;
