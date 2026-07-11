import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import { tokens } from "./tokens";

/**
 * APEX — Footer
 * ──────────────────────────────────────────────────────────────
 * Three-column layout:
 *   Col 1: Brand + tagline
 *   Col 2: Quick nav links
 *   Col 3: Contact info + social icons (React-icons, NOT emojis)
 * Bottom bar: copyright with dynamic year + powered-by credits.
 */

const NAV_LINKS = [
  { label: "Home",         href: "#hero" },
  { label: "About",        href: "#about" },
  { label: "Experience",   href: "#experience" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#showcase" },
  { label: "Contact",      href: "#contact" },
];

const SOCIAL_ICONS = [
  { key: "linkedin",  Icon: FaLinkedin },
  { key: "github",    Icon: FaGithub   },
  { key: "twitter",   Icon: FaTwitter  },
  { key: "instagram", Icon: FaInstagram},
  { key: "website",   Icon: FaGlobe   },
];

const Footer = ({ user }) => {
  const firstName  = user?.firstName || "";
  const lastName   = user?.lastName  || "";
  const fullName   = [firstName, lastName].filter(Boolean).join(" ") || "Developer";
  const email      = user?.email || user?.contact?.email || "";
  const location   = user?.location || "";
  const tagline    = user?.branding?.tagline || user?.headline?.split(",")?.[0]?.trim() || "";
  const socialLinks = user?.socialLinks || {};
  const year       = new Date().getFullYear();

  const activeSocials = SOCIAL_ICONS.filter((s) => socialLinks[s.key]);

  return (
    <footer
      id="footer"
      className="border-t"
      style={{
        fontFamily:      tokens.fonts.body,
        backgroundColor: tokens.colors.surface,
        borderColor:     tokens.colors.border,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-14 w-full">

        {/* Top 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* ── Col 1: Brand ─────────────────────── */}
          <div>
            <h3
              className="text-2xl font-extrabold mb-3 tracking-tight"
              style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.accent }}
            >
              {firstName || "Apex"}
              <span style={{ color: tokens.colors.primary }}>.dev</span>
            </h3>
            {tagline && (
              <p
                className="text-sm leading-relaxed mb-4 max-w-xs"
                style={{ color: tokens.colors.secondary }}
              >
                {tagline}
              </p>
            )}
            <p
              className="text-xs leading-relaxed max-w-xs"
              style={{ color: `${tokens.colors.secondary}80` }}
            >
              Crafted with precision. Powered by{" "}
              <a
                href="https://dataversetechnologies.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-colors duration-200"
                style={{ color: tokens.colors.accent }}
              >
                DataVerse Technologies
              </a>
              .
            </p>
          </div>

          {/* ── Col 2: Quick Links ───────────────── */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-[0.2em] mb-5"
              style={{ color: tokens.colors.accent }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm flex items-center gap-2 group transition-colors duration-200"
                    style={{ color: tokens.colors.secondary }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = tokens.colors.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = tokens.colors.secondary)}
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-150"
                      style={{ backgroundColor: tokens.colors.accent }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Contact + Socials ─────────── */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-[0.2em] mb-5"
              style={{ color: tokens.colors.accent }}
            >
              Get In Touch
            </h4>

            <ul className="space-y-2.5 text-sm mb-6" style={{ color: tokens.colors.secondary }}>
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="transition-colors duration-200 hover:underline"
                    style={{ color: tokens.colors.secondary }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = tokens.colors.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = tokens.colors.secondary)}
                  >
                    ✉ {email}
                  </a>
                </li>
              )}
              {location && (
                <li>
                  <span>📍 {location}</span>
                </li>
              )}
            </ul>

            {/* Social icon pills */}
            {activeSocials.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activeSocials.map(({ key, Icon }) => (
                  <a
                    key={key}
                    href={socialLinks[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={key}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-300 hover:-translate-y-1"
                    style={{
                      backgroundColor: tokens.colors.bg,
                      borderColor:     tokens.colors.border,
                      color:           tokens.colors.secondary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = tokens.colors.accent;
                      e.currentTarget.style.color       = tokens.colors.accent;
                      e.currentTarget.style.boxShadow   = `0 4px 14px ${tokens.colors.accent}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = tokens.colors.border;
                      e.currentTarget.style.color       = tokens.colors.secondary;
                      e.currentTarget.style.boxShadow   = "none";
                    }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{
            background: `linear-gradient(to right, transparent, ${tokens.colors.border}, transparent)`,
          }}
        />

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ color: tokens.colors.secondary }}
        >
          <p>© {year} {fullName}. All rights reserved.</p>
          <p>
            Designed &amp; Developed by{" "}
            <a
              href="https://app-cvifypro.vercel.app/p/umairansari92"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors duration-200"
              style={{ color: tokens.colors.primary }}
              onMouseEnter={(e) => (e.currentTarget.style.color = tokens.colors.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = tokens.colors.primary)}
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
