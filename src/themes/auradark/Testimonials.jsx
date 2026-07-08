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
      id="testimonials-ad" 
      className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 border-t overflow-hidden"
      style={{ backgroundColor: tokens.colors.background, borderColor: tokens.colors.borderFaint }}
    >
      <div className="max-w-[1400px] mx-auto relative z-10 text-center">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <motion.p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            TRUST SIGNALS / 06
          </motion.p>
          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]"
            style={{ color: tokens.colors.foreground }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Client Feedback
          </motion.h2>
        </div>

        {testimonials.length === 0 && isOwner ? (
          <div 
            className="text-center py-16 border border-dashed rounded-3xl transition-all"
            style={{ borderColor: tokens.colors.borderStrong }}
          >
            <p className="text-sm uppercase tracking-widest mb-6 opacity-60" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}>No Testimonials Found</p>
            <button 
              onClick={() => toast.success("Add testimonials in Dashboard > Verification.")}
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
              style={{ 
                fontFamily: tokens.fonts.mono, 
                backgroundColor: 'rgba(182,119,239,0.1)',
                color: tokens.colors.primary,
                border: `1px solid rgba(182,119,239,0.3)`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tokens.colors.primary;
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(182,119,239,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(182,119,239,0.1)';
                e.currentTarget.style.color = tokens.colors.primary;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              + Add Testimonial
            </button>
          </div>
        ) : (
          <div className="space-y-32">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex flex-col items-center max-w-4xl mx-auto relative"
              >
                {/* Glowing quote mark */}
                <div 
                  className="absolute -top-16 left-1/2 -translate-x-1/2 text-[120px] leading-none opacity-20 pointer-events-none" 
                  style={{ fontFamily: tokens.fonts.display, color: tokens.colors.primary, textShadow: '0 0 40px rgba(182,119,239,0.5)' }}
                >
                  "
                </div>

                <blockquote 
                  className="text-2xl md:text-4xl leading-relaxed mb-10 relative z-10"
                  style={{ fontFamily: tokens.fonts.display, color: tokens.colors.foreground, fontWeight: 300 }}
                >
                  <InlineEdit 
                    isOwner={isOwner} 
                    value={testimonial.text || testimonial.quote} 
                    onSave={(v) => handleArrayUpdate("testimonials", index, { ...testimonial, text: v })}
                  >
                    {testimonial.text || testimonial.quote}
                  </InlineEdit>
                </blockquote>

                <div className="flex flex-col items-center gap-2">
                  <span className="font-bold text-lg tracking-wide uppercase" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>
                    <InlineEdit 
                      isOwner={isOwner} 
                      value={testimonial.author || testimonial.name} 
                      onSave={(v) => handleArrayUpdate("testimonials", index, { ...testimonial, author: v })}
                    >
                      {testimonial.author || testimonial.name}
                    </InlineEdit>
                  </span>
                  <span className="text-xs uppercase tracking-[0.3em]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}>
                    <InlineEdit 
                      isOwner={isOwner} 
                      value={testimonial.position || testimonial.title} 
                      onSave={(v) => handleArrayUpdate("testimonials", index, { ...testimonial, position: v })}
                    >
                      {testimonial.position || testimonial.title}
                    </InlineEdit>
                    {(testimonial.company) && (
                      <>
                        <span className="mx-3 opacity-30">|</span>
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
