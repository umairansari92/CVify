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
      className="py-20 md:py-32 border-t"
      style={{
        backgroundColor: tokens.colors.pureBlack,
        color: tokens.colors.paper,
        borderColor: tokens.colors.borders,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="text-xs uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.muted }}
          >
            Beyond The Professional
          </h2>
          <h3
            className="text-3xl font-bold leading-tight"
            style={{ fontFamily: tokens.fonts.heading }}
          >
            Personal Interests
          </h3>
        </motion.div>

        {interests.length === 0 && isOwner ? (
          <div className="text-center py-12 border border-dashed" style={{ borderColor: tokens.colors.borders }}>
            <p className="text-sm uppercase tracking-widest mb-6 opacity-60" style={{ fontFamily: tokens.fonts.mono }}>No Interests Found</p>
            <button 
              onClick={() => toast.success("Add interests in Dashboard > Dossier.")}
              className="px-8 py-4 border text-xs font-bold uppercase tracking-widest transition-colors hover:bg-white hover:text-black"
              style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.paper }}
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
                className="px-6 py-3 border rounded-full text-sm uppercase tracking-widest transition-colors hover:bg-white hover:text-black cursor-default"
                style={{
                  fontFamily: tokens.fonts.mono,
                  borderColor: '#333',
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
