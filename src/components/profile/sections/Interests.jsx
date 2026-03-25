import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaPlus } from "react-icons/fa";
import InlineEdit from "../InlineEdit";
import { toast } from "react-hot-toast";

const Interests = React.memo(({ user, isOwner, displayValue, handleLiveUpdate, handleArrayUpdate }) => {
  const interests = user?.interests || [];

  return (
    <section id="interests" className="py-16 md:py-24 border-b border-white/5 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] uppercase tracking-tighter">
            Personal Interests
          </h2>
          <div className="h-1.5 w-16 bg-[var(--primary-color)] mx-auto rounded-full opacity-60" />
          <p className="text-xs font-black text-[var(--primary-color)] uppercase tracking-[0.4em] opacity-40 italic">Beyond the Professional</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
          {interests.map((interest, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="px-6 py-3 md:px-8 md:py-4 bg-white/[0.03] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] flex items-center gap-3 transition-all group"
            >
              <FaHeart size={14} className="text-[var(--primary-color)] opacity-40 group-hover:opacity-100 transition-all" />
              <span className="text-sm font-black text-[var(--text-primary)] tracking-wide uppercase">
                <InlineEdit isOwner={isOwner} label="Interest" value={interest} onSave={(v) => handleArrayUpdate("interests", index, v)}>
                  {interest}
                </InlineEdit>
              </span>
            </motion.div>
          ))}

          {isOwner && (
            <button 
              onClick={() => toast.success("Add interests in Dashboard > Dossier.")}
              className="px-8 py-4 border border-dashed border-white/20 hover:border-[var(--primary-color)]/40 rounded-[2rem] text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-all flex items-center gap-2 text-sm font-black uppercase tracking-widest"
            >
              <FaPlus size={10} /> Add Passion
            </button>
          )}
        </div>
      </div>
    </section>
  );
});

export default Interests;
