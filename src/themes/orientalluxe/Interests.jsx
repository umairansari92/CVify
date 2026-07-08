import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";
import { toast } from "react-hot-toast";

const Interests = ({ user, isOwner, handleArrayUpdate }) => {
  const interests = user?.interests || [];

  if (!isOwner && interests.length === 0) return null;

  return (
    <section
      id="interests-ol"
      className="py-24 md:py-32 px-6 md:px-16"
      style={{ backgroundColor: tokens.colors.bg }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.accent }}>
            — Beyond The Professional
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: tokens.colors.textPrimary, fontFamily: tokens.fonts.primary }}>
            Personal Interests
          </h2>
        </motion.div>

        {interests.length === 0 && isOwner ? (
          <div
            className="text-center py-16 rounded-2xl border border-dashed"
            style={{ borderColor: tokens.colors.border }}
          >
            <p className="text-sm uppercase tracking-widest mb-6" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textMuted }}>No Interests Found</p>
            <button
              onClick={() => toast.success("Add interests in Dashboard > Dossier.")}
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              style={{
                fontFamily: tokens.fonts.mono,
                backgroundColor: tokens.colors.accentGlow,
                color: tokens.colors.accent,
                border: `1px solid ${tokens.colors.borderHover}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tokens.colors.accent;
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.boxShadow = tokens.shadows.glowStrong;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = tokens.colors.accentGlow;
                e.currentTarget.style.color = tokens.colors.accent;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              + Add Passion
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 md:gap-6">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="px-7 py-3.5 rounded-full border text-sm uppercase tracking-widest font-bold transition-all duration-300 cursor-default"
                style={{
                  fontFamily: tokens.fonts.mono,
                  borderColor: tokens.colors.border,
                  backgroundColor: tokens.colors.bgCard,
                  color: tokens.colors.textSecondary,
                  boxShadow: tokens.shadows.card,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.borderHover;
                  e.currentTarget.style.backgroundColor = tokens.colors.accentGlow;
                  e.currentTarget.style.color = tokens.colors.accent;
                  e.currentTarget.style.boxShadow = tokens.shadows.glow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.border;
                  e.currentTarget.style.backgroundColor = tokens.colors.bgCard;
                  e.currentTarget.style.color = tokens.colors.textSecondary;
                  e.currentTarget.style.boxShadow = tokens.shadows.card;
                }}
              >
                <InlineEdit
                  isOwner={isOwner}
                  value={interest.name || interest}
                  onSave={(v) => {
                    const updated = typeof interest === 'string' ? v : { ...interest, name: v };
                    handleArrayUpdate("interests", index, updated);
                  }}
                >
                  {interest.name || interest}
                </InlineEdit>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Interests;
