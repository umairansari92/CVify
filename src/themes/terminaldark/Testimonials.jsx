import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";
import { toast } from "react-hot-toast";

const Testimonials = ({ user, isOwner, handleArrayUpdate }) => {
  const testimonials = user?.testimonials || [];
  if (!isOwner && testimonials.length === 0) return null;

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 border-t text-center" style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.background }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}>// trust signals</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}>Client Feedback</h2>
        </motion.div>

        {testimonials.length === 0 && isOwner ? (
          <div className="text-center py-14 rounded-2xl border border-dashed" style={{ borderColor: tokens.colors.border }}>
            <p className="text-sm mb-6 opacity-60" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>// no testimonials found</p>
            <button onClick={() => toast.success("Add testimonials in Dashboard > Verification.")} className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all border" style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.accent, color: tokens.colors.accent, backgroundColor: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = tokens.colors.accent; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = tokens.colors.accent; }}>
              + Add Testimonial
            </button>
          </div>
        ) : (
          <div className="space-y-24">
            {testimonials.map((t, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col items-center">
                <div className="text-8xl leading-none mb-4 opacity-30 pointer-events-none select-none" style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.heading, textShadow: `0 0 30px ${tokens.colors.accent}66` }}>"</div>
                <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 italic" style={{ fontFamily: tokens.fonts.body, color: tokens.colors.primary, fontWeight: 300 }}>
                  <InlineEdit isOwner={isOwner} value={t.text || t.quote} onSave={(v) => handleArrayUpdate("testimonials", index, { ...t, text: v })}>{t.text || t.quote}</InlineEdit>
                </blockquote>
                <div className="flex flex-col items-center gap-1">
                  <span className="font-bold uppercase tracking-widest text-sm" style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}>
                    <InlineEdit isOwner={isOwner} value={t.author || t.name} onSave={(v) => handleArrayUpdate("testimonials", index, { ...t, author: v })}>{t.author || t.name}</InlineEdit>
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>
                    <InlineEdit isOwner={isOwner} value={t.position || t.title} onSave={(v) => handleArrayUpdate("testimonials", index, { ...t, position: v })}>{t.position || t.title}</InlineEdit>
                    {t.company && <><span className="mx-2 opacity-30">|</span><InlineEdit isOwner={isOwner} value={t.company} onSave={(v) => handleArrayUpdate("testimonials", index, { ...t, company: v })}>{t.company}</InlineEdit></>}
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
