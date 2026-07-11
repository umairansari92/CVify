import React from "react";
import { tokens } from "./tokens";

const Footer = ({ user }) => {
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Developer";
  const year = new Date().getFullYear();

  const socialLinks = [
    { label: "GitHub", url: user?.socialLinks?.github, icon: "🐙" },
    { label: "LinkedIn", url: user?.socialLinks?.linkedin, icon: "💼" },
    { label: "Twitter", url: user?.socialLinks?.twitter, icon: "🐦" },
    { label: "Website", url: user?.socialLinks?.website, icon: "🌐" },
  ].filter((link) => link.url);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#showcase" },
    { label: "Contact", href: "#contact" },
  ];

  const email = user?.email || user?.contact?.email || "";

  return (
    <footer
      id="footer"
      className="border-t"
      style={{ backgroundColor: tokens.colors.surface, borderColor: tokens.colors.border }}
    >
      <div className="max-w-6xl mx-auto px-6 py-14 w-full">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand Column */}
          <div className="text-center md:text-left">
            <h3
              className="text-2xl font-extrabold mb-3"
              style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.heading }}
            >
              {fullName.split(" ")[0]}<span style={{ color: tokens.colors.primary }}>.dev</span>
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: tokens.colors.secondary }}>
              Designed &amp; Developed by {fullName}. Passionate about building
              responsive and user-friendly web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: tokens.colors.accent }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:underline"
                    style={{ color: tokens.colors.secondary }}
                    onMouseEnter={(e) => (e.target.style.color = tokens.colors.accent)}
                    onMouseLeave={(e) => (e.target.style.color = tokens.colors.secondary)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: tokens.colors.accent }}>
              Contact
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: tokens.colors.secondary }}>
              {email && (
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${email}`}
                    style={{ color: tokens.colors.secondary }}
                    className="hover:underline"
                    onMouseEnter={(e) => (e.target.style.color = tokens.colors.accent)}
                    onMouseLeave={(e) => (e.target.style.color = tokens.colors.secondary)}
                  >
                    {email}
                  </a>
                </li>
              )}
              {user?.location && (
                <li>Location: <span style={{ color: tokens.colors.secondary }}>{user.location}</span></li>
              )}
            </ul>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base border transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/50"
                    style={{
                      backgroundColor: tokens.colors.bg,
                      borderColor: tokens.colors.border,
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 border-t text-center text-sm"
          style={{ borderColor: tokens.colors.border, color: tokens.colors.secondary }}
        >
          © {year} {fullName}. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
