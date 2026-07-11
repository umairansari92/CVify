import React from "react";
import { tokens } from "./tokens";

const Interests = ({ user, isOwner }) => {
  const list = Array.isArray(user?.interests) ? user.interests.filter(Boolean) : [];
  if (list.length === 0 && !isOwner) return null;

  return (
    <section
      id="interests"
      className="py-24 relative overflow-hidden border-t"
      style={{ backgroundColor: tokens.colors.bg, borderColor: tokens.colors.border }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}
          >
            Interests
          </h2>
          <p className="text-sm font-medium uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
            What I'm Passionate About
          </p>
          <div className="h-1 w-20 rounded-full mx-auto" style={{ backgroundColor: tokens.colors.accent }}></div>
        </div>

        {list.length === 0 && isOwner ? (
          <div
            className="text-center py-10 rounded-2xl border"
            style={{ borderColor: tokens.colors.border, color: tokens.colors.secondary }}
          >
            <p>Add interests from your profile editor.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
            {list.map((interest, i) => (
              <div
                key={i}
                className="px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  backgroundColor: `${tokens.colors.accent}15`,
                  borderColor: `${tokens.colors.accent}40`,
                  color: tokens.colors.accent,
                }}
              >
                {interest}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Interests;
