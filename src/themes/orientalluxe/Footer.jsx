import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaHeart } from "react-icons/fa";
import { tokens } from "./tokens";

/**
 * ORIENTAL LUXE — Footer
 * ──────────────────────
 * Minimal centered footer with social icons and copyright.
 */
const Footer = ({ user }) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Portfolio";
  const socialLinks = user?.socialLinks || {};

  const socials = [
    { key: "linkedin", icon: FaLinkedin, url: socialLinks.linkedin },
    { key: "github", icon: FaGithub, url: socialLinks.github },
    { key: "twitter", icon: FaTwitter, url: socialLinks.twitter },
  ].filter((s) => s.url);

  return (
    <footer
      className="relative py-12 text-center"
      style={{
        fontFamily: tokens.fonts.primary,
        borderTop: `1px solid ${tokens.colors.border}`,
      }}
    >
      <div className="mx-auto max-w-4xl px-6 space-y-6">
        {/* Social Icons */}
        {socials.length > 0 && (
          <div className="flex items-center justify-center gap-4">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300"
                style={{
                  borderColor: tokens.colors.border,
                  color: tokens.colors.textMuted,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.accent;
                  e.currentTarget.style.color = tokens.colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.border;
                  e.currentTarget.style.color = tokens.colors.textMuted;
                }}
              >
                <s.icon size={14} />
              </a>
            ))}
          </div>
        )}

        {/* Copyright */}
        <p
          className="text-xs"
          style={{ color: tokens.colors.textMuted }}
        >
          © {new Date().getFullYear()} {fullName}. Built with{" "}
          <FaHeart className="inline text-red-500 mx-0.5" size={10} />{" "}
          using{" "}
          <a
            href="https://app-cvifypro.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition-colors duration-200"
            style={{ color: tokens.colors.accent }}
          >
            CVify Pro
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
