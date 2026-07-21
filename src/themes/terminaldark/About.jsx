import React from "react";
import { motion } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";

const About = ({ user, isOwner, handleLiveUpdate }) => {
  const profileImage = user?.profileImage || user?.profilePicture || user?.avatar;
  const firstName = user?.firstName || user?.name?.split(" ")[0] || "Developer";

  const services = user?.services || [];
  const strategicSkills = Array.isArray(user?.skills)
    ? user.skills.filter(s => s.category?.toLowerCase() === "strategic")
    : (user?.skills?.strategic || []);
  const cards = services.length > 0 ? services : strategicSkills;

  const iconMap = {
    "frontend": "🎨", "backend": "⚙️", "fullstack": "🚀", "mern": "⚡",
    "react": "⚛️", "ui": "💅", "ux": "🎭", "mobile": "📱",
    "api": "🔌", "database": "🗄️", "devops": "🛠️", "cloud": "☁️",
    "ai": "🤖", "ml": "🧠", "security": "🔒", "web": "🌐",
  };
  const getIcon = (name = "") => {
    const lower = name.toLowerCase();
    return Object.entries(iconMap).find(([k]) => lower.includes(k))?.[1] || "💻";
  };

  return (
    <section id="about-td" className="max-w-7xl mx-auto px-6 py-20">
      {/* Top: Text left + Photo right */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-20">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <p className="text-[#aaa6c3] text-[16px] uppercase tracking-widest mb-2">Introduction</p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mb-6">
            Overview.
          </h2>
          <InlineEdit
            isOwner={isOwner}
            id="td-about-summary"
            value={user?.summary || user?.bio || ""}
            type="textarea"
            onSave={(v) => handleLiveUpdate?.({ summary: v })}
          >
            <p className="text-[#aaa6c3] text-[17px] leading-[30px]">
              {user?.summary || user?.bio || "Passionate professional with a knack for solving complex problems and delivering high-quality solutions."}
            </p>
          </InlineEdit>
        </motion.div>

        {/* Right: Profile photo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-shrink-0"
        >
          <div className="relative w-64 h-72 lg:w-80 lg:h-96">
            <div className="absolute inset-0 rounded-2xl bg-[#915eff] blur-[60px] opacity-20" />
            <div className="absolute inset-0 rounded-2xl border-2 border-[#915eff]/40 rotate-3" />
            <div className="absolute inset-0 rounded-2xl border-2 border-[#7c3aed]/30 -rotate-2" />
            <div className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-[#915eff]/70 shadow-[0_0_40px_rgba(145,94,255,0.4)] z-10">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={firstName}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1e0a4a] to-[#151030] flex items-center justify-center">
                  <span className="text-6xl font-black text-[#915eff] opacity-60">{firstName.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom: Service / Skill Cards */}
      {cards.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((item, index) => {
            const name = typeof item === "string" ? item : (item.name || item.title || "");
            const icon = (typeof item === "object" && (item.icon || item.emoji)) || getIcon(name);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#151030] border border-[#915eff]/20 hover:border-[#915eff]/70 transition-all shadow-[0_0_15px_rgba(145,94,255,0.05)] hover:shadow-[0_0_25px_rgba(145,94,255,0.2)] text-center gap-4 cursor-default min-h-[180px]"
              >
                <div className="w-16 h-16 rounded-full bg-[#1e0a4a] flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-[#915eff]/30">
                  {typeof icon === "string" && icon.match(/^https?:\/\//) ? (
                    <img src={icon} alt={name} className="w-10 h-10 object-contain rounded-full" />
                  ) : (
                    <span>{icon}</span>
                  )}
                </div>
                <InlineEdit
                  isOwner={isOwner}
                  id={`td-service-${index}`}
                  value={name}
                  onSave={(v) => {
                    const field = services.length > 0 ? "services" : "skills.strategic";
                    handleLiveUpdate?.({ [field]: cards.map((c, i) => i === index ? { ...c, name: v } : c) });
                  }}
                >
                  <p className="text-white font-bold text-[14px] leading-tight">{name}</p>
                </InlineEdit>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Verification Proof ── */}
      {(user?.branding?.verificationStats?.atsScore || user?.branding?.verificationStats?.dataPoints) && (
        <div className="mt-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-8 rounded-2xl border"
            style={{ backgroundColor: tokens.colors.cardBg, borderColor: tokens.colors.border }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.accent }}>
                // verification proof
              </p>
              <p className="text-xl font-bold uppercase tracking-widest" style={{ color: tokens.colors.primary, fontFamily: tokens.fonts.heading }}>
                Verified by CVify
              </p>
            </div>

            <div className="flex items-center gap-12 md:gap-20">
              {user?.branding?.verificationStats?.atsScore && (
                <div className="text-center">
                  <p className="text-4xl font-bold" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>
                    {user.branding.verificationStats.atsScore}%
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] mt-2" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>Avg. ATS Score</p>
                </div>
              )}
              {user?.branding?.verificationStats?.dataPoints && (
                <div className="text-center">
                  <p className="text-4xl font-bold" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>
                    {user.branding.verificationStats.dataPoints}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] mt-2" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.secondary }}>Data Points</p>
                </div>
              )}
            </div>

            <button
              onClick={() => {}}
              className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all border"
              style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.accent, color: tokens.colors.accent, backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = tokens.colors.accent; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = tokens.colors.accent; }}
            >
              Access Dossier
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default About;
