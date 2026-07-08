import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import InlineEdit from "../../components/profile/InlineEdit";
import { toast } from "react-hot-toast";

const Interests = ({ user, isOwner, handleArrayUpdate }) => {
  const interests = user?.interests || [];
  if (!isOwner && interests.length === 0) return null;

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 border-t text-center" style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.background }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: tokens.colors.accent, fontFamily: tokens.fonts.mono }}>// interests</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: tokens.fonts.heading, color: tokens.colors.primary }}>Interests</h2>
        </motion.div>

        {interests.length === 0 && isOwner ? (
          <div className="text-center py-14 rounded-2xl border border-dashed" style={{ borderColor: tokens.colors.border }}>
            <p className="text-sm mb-6 opacity-60" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>// no interests found</p>
            <button onClick={() => toast.success("Add interests in Dashboard > Dossier.")} className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all border" style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.accent, color: tokens.colors.accent, backgroundColor: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = tokens.colors.accent; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = tokens.colors.accent; }}>
              + Add Passion
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {interests.map((interest, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }}
                className="px-6 py-3 rounded-full border text-sm uppercase tracking-widest font-bold transition-all duration-300 cursor-default"
                style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.border, backgroundColor: tokens.colors.cardBg, color: tokens.colors.secondary }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${tokens.colors.accent}66`; e.currentTarget.style.color = tokens.colors.accent; e.currentTarget.style.backgroundColor = tokens.colors.cardBgHover; e.currentTarget.style.boxShadow = `0 0 15px ${tokens.colors.accent}33`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = tokens.colors.border; e.currentTarget.style.color = tokens.colors.secondary; e.currentTarget.style.backgroundColor = tokens.colors.cardBg; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <InlineEdit isOwner={isOwner} value={interest.name || interest} onSave={(v) => { const updated = typeof interest === 'string' ? v : { ...interest, name: v }; handleArrayUpdate("interests", index, updated); }}>
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
