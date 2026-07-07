import React from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { tokens } from "./tokens";

const Footer = ({ user }) => {
  const currentYear = new Date().getFullYear();
  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.name || "Portfolio";
  const socialLinks = user?.socialLinks || {};

  const socials = [
    { key: "linkedin", icon: FaLinkedin, url: socialLinks.linkedin },
    { key: "github", icon: FaGithub, url: socialLinks.github },
    { key: "twitter", icon: FaTwitter, url: socialLinks.twitter },
  ].filter((s) => s.url);

  return (
    <footer
      className="w-full py-14 text-center border-t"
      style={{
        backgroundColor: tokens.colors.pureBlack,
        borderColor: "#222222",
        fontFamily: tokens.fonts.mono,
      }}
    >
      <div className="max-w-4xl mx-auto px-6 space-y-6">

        {/* Social Icon Row */}
        {socials.length > 0 && (
          <div className="flex items-center justify-center gap-4">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center border transition-all duration-300"
                style={{ borderColor: "#333333", color: "#78716C" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#D6D3D1";
                  e.currentTarget.style.color = "#FAFAF9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#333333";
                  e.currentTarget.style.color = "#78716C";
                }}
              >
                <s.icon size={14} />
              </a>
            ))}
          </div>
        )}

        {/* Copyright + CVify branding */}
        <div className="text-[10px] uppercase tracking-[0.2em] space-y-1.5" style={{ color: "#78716C" }}>
          <p>&copy; {currentYear} {fullName}. All rights reserved.</p>
          <p>
            Powered by{" "}
            <a
              href="https://dataversetechnologies.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: "#D6D3D1" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FAFAF9")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#D6D3D1")}
            >
              DataVerse Technologies
            </a>
            <span className="mx-2 opacity-30">|</span>
            Built by{" "}
            <a
              href="https://app-cvifypro.vercel.app/p/umairansari92"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: "#D6D3D1" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FAFAF9")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#D6D3D1")}
            >
              Umair Ahmed
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
