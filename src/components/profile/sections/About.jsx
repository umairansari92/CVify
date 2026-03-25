import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import InlineEdit from "../InlineEdit";

const About = React.memo(({ user, isOwner, displayValue, handleLiveUpdate, setShowResumeModal }) => {
  const personalInfo = user?.personalInfo || {
    fullName: [user?.firstName, user?.lastName].filter(Boolean).join(" "),
    image: user?.profileImage,
    jobTitle: user?.headline,
    objective: user?.bio,
    location: user?.location,
    email: user?.email,
    phone: user?.phoneNumber
  };

  return (
    <section id="about" className="py-40 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 text-center space-y-12"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[var(--primary-color)]/5 to-transparent pointer-events-none opacity-20" />

        <div className="flex justify-center">
          {displayValue(user.personalInfo?.industry, "Technology & Software") && (
            <span className="inline-flex items-center gap-2 px-6 py-2 text-[10px] font-black tracking-[0.3em] text-[var(--primary-color)] uppercase bg-[var(--primary-color)]/5 border border-[var(--primary-color)]/10 rounded-full">
              <InlineEdit isOwner={isOwner} label="Industry" value={user.personalInfo?.industry} onSave={(v) => handleLiveUpdate({ "personalInfo.industry": v })}>
                {user.personalInfo?.industry || 'Technology & Software'}
              </InlineEdit>
            </span>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-none uppercase">
            Professional Narrative
          </h2>
          <div className="h-1.5 w-16 bg-[var(--primary-color)] mx-auto rounded-full opacity-60" />
          <p className="text-xs font-black text-[var(--primary-color)] uppercase tracking-[0.4em] opacity-40">The Mission & Vision</p>
        </div>
        
        <div className="text-xl md:text-3xl text-[var(--text-secondary)] leading-relaxed font-light max-w-3xl mx-auto opacity-90 italic">
          <InlineEdit isOwner={isOwner} label="Professional Summary" value={user.bio} onSave={(v) => handleLiveUpdate({ bio: v })} type="textarea">
            <p className="whitespace-pre-wrap">"{displayValue(user.bio, "I am a dedicated professional focused on delivering high-quality, scalable digital solutions...")}"</p>
          </InlineEdit>
        </div>

        <div className="pt-10">
          <button onClick={() => setShowResumeModal(true)} className="px-10 py-4 bg-white/5 hover:bg-[var(--primary-color)]/10 border border-white/10 hover:border-[var(--primary-color)]/30 rounded-full text-[var(--text-primary)] font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 mx-auto group shadow-2xl active:scale-95">
            <Download size={16} className="group-hover:translate-y-1 transition-transform" /> View Full Dossier
          </button>
        </div>
      </motion.div>
    </section>
  );
});

export default About;
