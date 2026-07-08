import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";
import { toast } from "react-hot-toast";

const Testimonials = ({ user, isOwner, handleArrayUpdate }) => {
  const testimonials = user?.testimonials || [];

  if (!isOwner && testimonials.length === 0) return null;

  return (
    <section
      id="testimonials-ol"
      className="py-24 md:py-32 px-6 md:px-16"
      style={{ backgroundColor: tokens.colors.bgSoft }}
    >
      <div className="max-w-5xl mx-auto text-center">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.accent }}>
            — Trust Signals
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: tokens.colors.textPrimary, fontFamily: tokens.fonts.primary }}>
            Client Testimonials
          </h2>
        </motion.div>

        {testimonials.length === 0 && isOwner ? (
          <div 
            className="text-center py-16 rounded-2xl border border-dashed"
            style={{ borderColor: tokens.colors.border }}
          >
            <p className="text-sm uppercase tracking-widest mb-6" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textMuted }}>No Testimonials Found</p>
            <button 
              onClick={() => toast.success("Add testimonials in Dashboard > Verification.")}
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
              + Add Testimonial
            </button>
          </div>
        ) : (
          <div className="space-y-20">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative flex flex-col items-center"
              >
                {/* Gold quote mark */}
                <div
                  className="text-[100px] leading-none mb-4 opacity-25 select-none pointer-events-none"
                  style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.primary, textShadow: tokens.shadows.hero }}
                >
                  "
                </div>

                <blockquote 
                  className="text-xl md:text-2xl leading-relaxed italic mb-8 max-w-3xl"
                  style={{ color: tokens.colors.textPrimary, fontFamily: tokens.fonts.primary, fontWeight: 300 }}
                >
                  <InlineEdit
                    isOwner={isOwner}
                    value={testimonial.text || testimonial.quote}
                    onSave={(v) => handleArrayUpdate("testimonials", index, { ...testimonial, text: v })}
                  >
                    {testimonial.text || testimonial.quote}
                  </InlineEdit>
                </blockquote>

                {/* Divider line */}
                <div className="w-16 h-px mb-6" style={{ backgroundColor: tokens.colors.accent }} />

                <div className="flex flex-col items-center gap-1.5">
                  <span className="font-bold uppercase tracking-widest text-sm" style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}>
                    <InlineEdit
                      isOwner={isOwner}
                      value={testimonial.author || testimonial.name}
                      onSave={(v) => handleArrayUpdate("testimonials", index, { ...testimonial, author: v })}
                    >
                      {testimonial.author || testimonial.name}
                    </InlineEdit>
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textMuted }}>
                    <InlineEdit
                      isOwner={isOwner}
                      value={testimonial.position || testimonial.title}
                      onSave={(v) => handleArrayUpdate("testimonials", index, { ...testimonial, position: v })}
                    >
                      {testimonial.position || testimonial.title}
                    </InlineEdit>
                    {testimonial.company && (
                      <>
                        <span className="mx-2 opacity-40">·</span>
                        <InlineEdit
                          isOwner={isOwner}
                          value={testimonial.company}
                          onSave={(v) => handleArrayUpdate("testimonials", index, { ...testimonial, company: v })}
                        >
                          {testimonial.company}
                        </InlineEdit>
                      </>
                    )}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
