import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { Globe } from "lucide-react";
import { tokens } from "./tokens";

/**
 * NOIR — Footer
 *
 * Structure (top → bottom):
 *  1. Accent glow line (top edge)
 *  2. Main row: Name + tagline | Nav links | Social icons
 *  3. Divider
 *  4. Copyright bar: © DataVerse | Designed by Umair Ahmed | Powered by CVify Pro
 */

const Footer = ({ user }) => {
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Portfolio";
  const tagline = user?.branding?.tagline || user?.headline?.split(",")?.[0]?.trim() || "Full Stack Developer";
  const socialLinks = user?.socialLinks || {};

  const socials = [
    { key: "github",    icon: FaGithub,   label: "GitHub"    },
    { key: "linkedin",  icon: FaLinkedin,  label: "LinkedIn"  },
    { key: "twitter",   icon: FaTwitter,   label: "Twitter"   },
    { key: "instagram", icon: FaInstagram, label: "Instagram" },
    { key: "website",   icon: Globe,       label: "Website"   },
  ].filter((s) => !!socialLinks[s.key]);

  const navLinks = [
    { label: "About",    href: "#about"    },
    { label: "Skills",   href: "#skills"   },
    { label: "Work",     href: "#work"     },
    { label: "Contact",  href: "#contact"  },
  ];

  const scrollTo = (href) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative border-t overflow-hidden"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      {/* Accent glow line at the very top edge */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${tokens.colors.accent}55, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* ── Main Footer Row ── */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-14">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">

          {/* Brand */}
          <div className="space-y-4 max-w-xs">
            <div>
              <span
                className="text-2xl font-medium tracking-tight"
                style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}
              >
                {firstName}{" "}
                <span
                  className="italic"
                  style={{ fontFamily: "'Instrument Serif', serif", color: tokens.colors.accent }}
                >
                  {lastName}
                </span>
              </span>
              <span
                style={{
                  color: tokens.colors.accent,
                  fontFamily: tokens.fonts.heading,
                  fontSize: "1.5rem",
                  fontWeight: 400,
                }}
              >
                {!firstName && !lastName ? fullName : null}
              </span>
            </div>
            <p
              className="text-xs leading-relaxed opacity-50 max-w-[200px]"
              style={{ color: tokens.colors.secondary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {tagline}
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-3">
            <p
              className="text-[9px] font-black uppercase tracking-[0.2em] mb-1 opacity-40"
              style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}
            >
              Navigation
            </p>
            {navLinks.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className="text-left text-sm transition-colors duration-200"
                style={{ color: tokens.colors.secondary, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                onMouseEnter={(e) => (e.target.style.color = tokens.colors.primary)}
                onMouseLeave={(e) => (e.target.style.color = tokens.colors.secondary)}
                data-cursor="hover"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Social Icons */}
          {socials.length > 0 && (
            <div>
              <p
                className="text-[9px] font-black uppercase tracking-[0.2em] mb-4 opacity-40"
                style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}
              >
                Connect
              </p>
              <div className="flex flex-wrap gap-3">
                {socials.map(({ key, icon: Icon, label }) => (
                  <a
                    key={key}
                    href={socialLinks[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300"
                    style={{ borderColor: tokens.colors.border, color: tokens.colors.secondary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = tokens.colors.accent;
                      e.currentTarget.style.color = tokens.colors.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = tokens.colors.border;
                      e.currentTarget.style.color = tokens.colors.secondary;
                    }}
                    data-cursor="hover"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="mx-6 md:mx-12 border-t" style={{ borderColor: tokens.colors.border }} />

      {/* ── Copyright Bar ── */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span
            className="text-xs opacity-40"
            style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}
          >
            © {new Date().getFullYear()} DataVerse Technologies. All rights reserved.
          </span>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 text-xs opacity-40">
            <span style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}>
              Powered by{" "}
              <a
                href="https://app-cvifypro.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold transition-opacity hover:opacity-80"
                style={{ color: tokens.colors.accent }}
                data-cursor="hover"
              >
                CVify Pro
              </a>
            </span>

            <span
              className="hidden sm:inline opacity-30"
              style={{ color: tokens.colors.secondary }}
            >
              |
            </span>

            <span style={{ color: tokens.colors.secondary, fontFamily: tokens.fonts.mono }}>
              Designed &amp; Developed by{" "}
              <a
                href="https://app-cvifypro.vercel.app/p/umairansari92"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold transition-opacity hover:opacity-80"
                style={{ color: tokens.colors.primary }}
                data-cursor="hover"
              >
                Umair Ahmed
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
