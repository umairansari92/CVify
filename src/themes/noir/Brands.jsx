import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

/**
 * NOIR — Brands Section (Verification Proof Marquee)
 * 
 * An infinite horizontal scrolling marquee displaying client/employer logos.
 * Fades out at the left and right edges using mask-gradients, monochromatic 
 * style, high-end hover scaling, and full GPU composition.
 */
const Brands = ({ user, isOwner }) => {
  const clients = user?.clients || [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" }
  ];

  if (!clients.length && !isOwner) return null;

  // Duplicate items to ensure a seamless looping scroll width
  const marqueeItems = [...clients, ...clients, ...clients];

  return (
    <section
      id="brands"
      className="relative py-12 border-t border-b overflow-hidden select-none"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.005)",
        borderColor: tokens.colors.border,
      }}
    >
      {/* Inline styles for the infinite loop animation */}
      <style>{`
        @keyframes noirMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        .noir-marquee-track {
          display: flex;
          width: max-content;
          animation: noirMarquee 25s linear infinite;
          will-change: transform;
        }
        .noir-gradient-mask {
          mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Subtle section label */}
        <p
          className="text-[8px] uppercase tracking-[0.25em] mb-6 opacity-30 font-bold text-center"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}
        >
          // VERIFIED PROFESSIONAL REPUTATION
        </p>

        {/* Marquee viewport with gradient mask */}
        <div className="relative w-full overflow-hidden noir-gradient-mask py-4">
          <div className="noir-marquee-track gap-16 md:gap-24">
            {marqueeItems.map((client, idx) => (
              <div
                key={idx}
                className="h-6 md:h-8 flex items-center justify-center grayscale opacity-30 hover:opacity-85 hover:scale-105 transition-all duration-300 cursor-pointer"
                title={client.name}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-full w-auto object-contain brightness-0 invert"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                {/* Fallback text if logo fails */}
                <span
                  className="text-xs uppercase font-extrabold tracking-widest ml-2 hidden"
                  style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.mono }}
                >
                  {client.name}
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
