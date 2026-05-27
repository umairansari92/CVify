import React from "react";
import { motion } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const About = ({ user, isOwner, handleLiveUpdate }) => {
  const summary = user?.bio || "";
  const imageUrl = user?.profileImage || "/ahmed.webp";

  return (
    <section 
      id="about" 
      className="py-24 border-b border-[#1a1a1a]"
      style={{ fontFamily: tokens.fonts.primary }}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Column: Image Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-4 relative group"
        >
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#b58953]/30 to-transparent opacity-60 blur transition-opacity group-hover:opacity-100" />
          <div className="relative overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#121212] aspect-[4/5] w-full">
            <img 
              src={imageUrl} 
              alt="Portrait" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Right Column: Bio */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-8 space-y-6 text-left"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b58953]">WHO I AM</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-4">
              <span className="h-8 w-1 rounded-full bg-[#b58953]" /> ABOUT
            </h2>
          </div>

          <div className="text-base sm:text-lg leading-relaxed text-[#a3a3a3] font-light">
            <InlineEdit isOwner={isOwner} id="oriental-about-bio" value={summary} type="textarea" onSave={(v) => handleLiveUpdate({ bio: v })}>
              <p className="whitespace-pre-wrap">{summary || "Describe your background, key expertise, and professional values..."}</p>
            </InlineEdit>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
