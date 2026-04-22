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
    <section id="about" className="py-24 md:py-40 relative overflow-hidden">
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
          <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tighter leading-none uppercase">
            About Me
          </h2>
          <div className="h-1.5 w-24 bg-[var(--primary-color)] mx-auto rounded-full" />
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest rounded-md">
              ✓ AI Optimized
            </span>
            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-widest rounded-md">
              ✓ ATS Tested
            </span>
          </div>
        </div>
        
        <div className="text-xl md:text-3xl text-[var(--text-secondary)] leading-tight font-medium max-w-3xl mx-auto opacity-95">
          <InlineEdit isOwner={isOwner} label="Professional Summary" value={user.bio} onSave={(v) => handleLiveUpdate({ bio: v })} type="textarea">
            <p className="whitespace-pre-wrap">{displayValue(user.bio, "I am a dedicated professional focused on delivering high-quality, scalable digital solutions...")}</p>
          </InlineEdit>
        </div>

        <div className="pt-12 space-y-8">
          <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] max-w-2xl mx-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-4">Verification Proof</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="text-center">
                <p className="text-4xl font-black text-white">{user?.branding?.verificationStats?.atsScore || 95}%</p>
                <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">Avg. ATS Score</p>
              </div>
              <div className="w-px h-12 bg-white/10 hidden sm:block" />
              <div className="text-center">
                <p className="text-4xl font-black text-white">{user?.branding?.verificationStats?.dataPoints || "6.4m"}</p>
                <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">Data Points Scanned</p>
              </div>
              <div className="w-px h-12 bg-white/10 hidden sm:block" />
              <div className="text-center">
                <p className="text-4xl font-black text-white">Verified</p>
                <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">By CVify Intelligence</p>
              </div>
            </div>
          </div>

          <button onClick={() => setShowResumeModal(true)} className="px-12 py-5 bg-[var(--primary-color)] text-white rounded-full text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 mx-auto group shadow-2xl active:scale-95">
            <Download size={16} className="group-hover:translate-y-1 transition-transform" /> Access Full Professional Dossier
          </button>
        </div>
      </motion.div>
    </section>
  );
});

export default About;
