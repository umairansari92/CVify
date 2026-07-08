import React from "react";
import { tokens } from "./tokens";

/**
 * NOIR — Verification Proof / Brands Marquee
 *
 * Priority data sources:
 * 1. user.clients  — [{name, logo}]
 * 2. user.experience[].company — text-only fallback (always available)
 * 3. Built-in tech brand SVG fallbacks
 *
 * The section always renders as long as there's any data.
 */

// Inline SVG monochrome brand logos for reliable rendering
const TECH_BRANDS = [
  {
    name: "React",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23 23 20.46"><circle cx="0" cy="0" r="2.05" fill="white"/><ellipse rx="11" ry="4.2" stroke="white" stroke-width="0.7" fill="none"/><ellipse rx="11" ry="4.2" stroke="white" stroke-width="0.7" fill="none" transform="rotate(60)"/><ellipse rx="11" ry="4.2" stroke="white" stroke-width="0.7" fill="none" transform="rotate(120)"/></svg>`,
  },
  {
    name: "Node.js",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112"><path d="M56 0L8 28v56l48 28 48-28V28L56 0zm0 8l40 23.3v46.4L56 101 16 77.7V31.3L56 8z" fill="white"/><path d="M56 20L28 36v32l28 16 28-16V36L56 20zm-4 40v-24l20 12-20 12z" fill="white" opacity="0.5"/></svg>`,
  },
  {
    name: "TypeScript",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" rx="4" fill="white" opacity="0.1"/><path d="M87.5 187.5h225v25h-87.5v100h-25v-100h-112.5zM250 187.5h25c0 16.5-4 28-12 35-8 7-20 11-35 11-16 0-28-4.5-36-13.5s-12-21.5-12-37.5c0-16 4-28.5 12-37.5s20-13.5 36-13.5c14 0 25 3.5 33 10.5v27c-8-8-16-12-27-12-9 0-16 3-21 9s-7.5 14-7.5 24 2.5 18 7.5 24 12 9 21 9c11 0 20-4.5 24.5-13.5z" fill="white"/></svg>`,
  },
  {
    name: "Python",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110"><path d="M55 0C35 0 22 8 22 22v15h33v5H15C7 42 0 50 0 65c0 15 7 25 15 28l8 2h15V80c0-14 12-22 22-22h27c10 0 22-8 22-22V22C109 8 75 0 55 0zm-8 12c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7z" fill="white"/><path d="M55 110c20 0 33-8 33-22V73H55v-5h40c8 0 15-8 15-23S103 20 95 17l-8-2H72v15c0 14-12 22-22 22H23C13 52 1 60 1 74v14c0 14 34 22 54 22zm8-12c-4 0-7-3-7-7s3-7 7-7 7 3 7 7-3 7-7 7z" fill="white" opacity="0.5"/></svg>`,
  },
  {
    name: "AWS",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 304 182"><path d="M86 66l-6 14-6-14h-8l10 24h8l10-24zM118 66l-5 15-5-15h-7l-5 15-5-15h-8l9 24h8l5-14 5 14h8l9-24zM136 84c0 4 3 7 9 7 3 0 6-1 8-3v3h8V74c0-6-4-9-13-9-4 0-8 1-12 3l2 6c3-2 6-2 9-2 4 0 5 1 5 4v1c-2-1-4-2-7-2-7 0-9 4-9 9zm8 0c0-2 1-3 4-3s4 1 4 3-1 3-4 3-4-1-4-3z" fill="white"/><path d="M86 130c-38 0-68 12-68 28s30 24 68 24 68-8 68-24-30-28-68-28zm0 44c-32 0-58-7-58-16s26-20 58-20 58 11 58 20-26 16-58 16zM230 66l-10 18-10-18h-9l14 24h10l14-24zM254 79c0-8-6-14-15-14s-15 6-15 14 6 13 15 13 15-5 15-13zm-7 0c0 4-3 7-8 7s-8-3-8-7 3-7 8-7 8 3 8 7zM277 65c-5 0-9 3-11 7v-6h-8v24h8V78c0-4 2-6 6-6 1 0 2 0 3 1l1-7c-1-1-2-1-4-1-1 0-2 0-3 1z" fill="white"/></svg>`,
  },
  {
    name: "Docker",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264 196"><path d="M148 60h-20V40h20zm0 22h-20V62h20zm-22 0h-20V62h20zm-22 0H84V62h20zm-22 0H62V62h20zM126 38H106V18h20zm-22 0H84V18h20zm44 44h-20V62h20zm0-22h-20V40h20zM252 82c-5-12-18-16-31-14-3-16-15-30-32-38l-6-3-4 6c-5 9-8 22-7 33-9-4-19-6-26-6H24c0 28 14 52 35 66 24 15 50 16 78 16 36 0 68-8 88-38 19-2 32-10 37-22l3-8-13 9z" fill="white"/></svg>`,
  },
];

const BrandText = ({ name }) => (
  <span
    className="text-xs font-black uppercase tracking-[0.25em] whitespace-nowrap"
    style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.mono }}
  >
    {name}
  </span>
);

const Brands = ({ user, isOwner }) => {
  // Build items from best available source
  const clients = user?.clients || [];

  // Pull company names from experience
  const experienceCompanies = (user?.experience || [])
    .filter((e) => e?.company)
    .map((e) => ({ name: e.company }));

  // Combine: clients logos > experience text > tech fallbacks
  const baseItems =
    clients.length > 0
      ? clients
      : experienceCompanies.length > 0
      ? experienceCompanies
      : TECH_BRANDS;

  if (baseItems.length === 0 && !isOwner) return null;

  // Triplicate for smooth infinite loop
  const items = [...baseItems, ...baseItems, ...baseItems];

  return (
    <section
      id="brands"
      className="relative py-14 border-t border-b overflow-hidden select-none"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.005)",
        borderColor: tokens.colors.border,
      }}
    >
      <style>{`
        @keyframes noirMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        .noir-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: noirMarquee 30s linear infinite;
          will-change: transform;
          gap: 4rem;
        }
        @media (min-width: 768px) {
          .noir-marquee-track { gap: 6rem; }
        }
        .noir-gradient-mask {
          mask-image: linear-gradient(to right, transparent, white 12%, white 88%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 12%, white 88%, transparent);
        }
        .noir-brand-item:hover .noir-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Label */}
        <p
          className="text-[8px] uppercase tracking-[0.3em] mb-8 opacity-25 font-black text-center"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
        >
          // VERIFIED PROFESSIONAL REPUTATION
        </p>

        {/* Marquee */}
        <div className="relative w-full overflow-hidden noir-gradient-mask py-2">
          <div className="noir-marquee-track">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="noir-brand-item flex items-center gap-3 opacity-30 hover:opacity-80 transition-all duration-300 cursor-default"
              >
                {/* Try to render logo, fall back to text */}
                {item.svg ? (
                  <div
                    className="h-6 md:h-7 w-auto"
                    style={{ aspectRatio: "auto" }}
                    dangerouslySetInnerHTML={{ __html: item.svg }}
                    title={item.name}
                    aria-label={item.name}
                  />
                ) : item.logo ? (
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="h-5 md:h-7 w-auto object-contain brightness-0 invert"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "inline";
                    }}
                  />
                ) : null}
                <span
                  className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em] whitespace-nowrap"
                  style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.mono }}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
