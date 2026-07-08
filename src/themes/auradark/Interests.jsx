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
      id="interests-ad" 
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
            BEYOND THE CODE / 07
          </motion.p>
          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]"
            style={{ color: tokens.colors.foreground }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Interests
          </motion.h2>
        </div>

        {interests.length === 0 && isOwner ? (
          <div 
            className="text-center py-16 border border-dashed rounded-3xl transition-all"
            style={{ borderColor: tokens.colors.borderStrong }}
          >
            <p className="text-sm uppercase tracking-widest mb-6 opacity-60" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}>No Interests Found</p>
            <button 
              onClick={() => toast.success("Add interests in Dashboard > Dossier.")}
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
              + Add Passion
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-6 max-w-4xl mx-auto">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative px-8 py-4 rounded-full border transition-all duration-300 cursor-default flex items-center justify-center overflow-hidden"
                style={{
                  borderColor: tokens.colors.borderFaint,
                  backgroundColor: tokens.colors.backgroundFaint,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.primary;
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(182,119,239,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = tokens.colors.borderFaint;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="absolute inset-0 bg-[var(--primary-color)]/10 opacity-0 group-hover:opacity-100 transition-opacity" style={{ '--primary-color': tokens.colors.primary }} />
                
                <span className="text-sm uppercase tracking-widest font-bold relative z-10 transition-colors group-hover:text-[var(--primary-color)]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.foreground, '--primary-color': tokens.colors.primary }}>
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
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Interests;
