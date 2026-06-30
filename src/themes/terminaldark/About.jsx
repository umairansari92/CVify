import React from "react";
import { motion } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";

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
    <section id="about-td" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
      {/* Top: Text left + Photo right */}
      <div className="mb-20 flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <p className="mb-2 text-[16px] uppercase tracking-[0.35em] text-[#aaa6c3]">Introduction</p>
          <h2 className="mb-6 text-[30px] font-black text-white sm:text-[40px] md:text-[60px]">
            Overview.
          </h2>
          <InlineEdit
            isOwner={isOwner}
            id="td-about-summary"
            value={user?.summary || user?.bio || ""}
            type="textarea"
            onSave={(v) => handleLiveUpdate?.({ summary: v })}
          >
            <p className="text-[17px] leading-[30px] text-[#aaa6c3]">
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
          <div className="relative h-72 w-64 lg:h-96 lg:w-80">
            <div className="absolute inset-0 rounded-[2rem] bg-[#915eff] opacity-20 blur-[70px]" />
            <div className="absolute inset-0 rotate-3 rounded-[2rem] border-2 border-[#915eff]/40" />
            <div className="absolute inset-0 -rotate-2 rounded-[2rem] border-2 border-[#7c3aed]/30" />
            <div className="absolute inset-0 z-10 overflow-hidden rounded-[2rem] border-2 border-[#915eff]/70 shadow-[0_0_40px_rgba(145,94,255,0.35)]">
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
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
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
                className="flex min-h-[180px] cursor-default flex-col items-center justify-center gap-4 rounded-[1.4rem] border border-[#915eff]/20 bg-[#151030]/90 p-6 text-center shadow-[0_0_15px_rgba(145,94,255,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#915eff]/70 hover:shadow-[0_0_25px_rgba(145,94,255,0.2)]"
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
    </section>
  );
};

export default About;
