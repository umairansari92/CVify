import React from "react";
import { motion } from "framer-motion";
import InlineEdit from "../../components/profile/InlineEdit";
import { tokens } from "./tokens";
import { Terminal, Code, Cpu } from "lucide-react";

const About = ({ user, isOwner, handleLiveUpdate }) => {
  if (!user?.bio && !isOwner) return null;

  const stats = [
    { label: "Years Experience", value: user?.yearsOfExperience || "2+" },
    { label: "Projects Completed", value: user?.projects?.length || "10+" },
    { label: "Technologies", value: user?.skills?.technical?.length || "15+" }
  ];

  return (
    <section id="about" className="py-20 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={{ fontFamily: "Orbitron, monospace" }}>
            <span className="text-white">About </span><span className="text-[var(--primary-color)]">Me</span>
          </h2>
          <div className="w-16 h-1 mx-auto mb-12 rounded-full" style={{ background: "linear-gradient(90deg, var(--primary-color), transparent)" }}></div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text & Stats */}
            <div className="space-y-6 text-[#a1a1aa] leading-relaxed">
              <p className="text-lg">
                <InlineEdit
                  value={user?.about || user?.bio}
                  onSave={(val) => handleLiveUpdate({ about: val })}
                  isOwner={isOwner}
                  placeholder="Detailed about me..."
                  multiline
                />
              </p>
              
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#222]">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <h3 className="text-3xl font-black text-white mb-2" style={{ fontFamily: tokens.fonts.mono }}>
                      {stat.value}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-[var(--primary-color)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Cards / Terminal Vibe */}
            <div className="space-y-4">
              <div className="bg-[#111] border border-[#222] p-6 rounded hover:border-[var(--primary-color)]/50 transition-colors group">
                <div className="flex items-center gap-4 mb-4">
                  <Terminal className="text-[var(--primary-color)]" size={24} />
                  <h3 className="text-xl text-white font-bold" style={{ fontFamily: tokens.fonts.mono }}>Frontend Development</h3>
                </div>
                <p className="text-[#a1a1aa] text-sm">Building responsive, interactive, and highly performant user interfaces using modern web technologies.</p>
              </div>
              
              <div className="bg-[#111] border border-[#222] p-6 rounded hover:border-[var(--primary-color)]/50 transition-colors group">
                <div className="flex items-center gap-4 mb-4">
                  <Code className="text-[var(--primary-color)]" size={24} />
                  <h3 className="text-xl text-white font-bold" style={{ fontFamily: tokens.fonts.mono }}>Backend Architecture</h3>
                </div>
                <p className="text-[#a1a1aa] text-sm">Designing scalable APIs, database schemas, and robust server-side logic to power web applications.</p>
              </div>

              <div className="bg-[#111] border border-[#222] p-6 rounded hover:border-[var(--primary-color)]/50 transition-colors group">
                <div className="flex items-center gap-4 mb-4">
                  <Cpu className="text-[var(--primary-color)]" size={24} />
                  <h3 className="text-xl text-white font-bold" style={{ fontFamily: tokens.fonts.mono }}>UI/UX Implementation</h3>
                </div>
                <p className="text-[#a1a1aa] text-sm">Translating complex designs into pixel-perfect, accessible, and animated experiences.</p>
              </div>
            </div>
          </div>
        </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Verification Proof ── */}
      {(user?.branding?.verificationStats?.atsScore || user?.branding?.verificationStats?.dataPoints) && (
        <div className="max-w-[1200px] mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-8 rounded border"
            style={{ backgroundColor: tokens.colors.cardBg, borderColor: tokens.colors.cardBorder }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}>
                &gt; VERIFICATION_PROOF
              </p>
              <p className="text-xl font-bold uppercase tracking-widest text-white" style={{ fontFamily: tokens.fonts.heading }}>
                Verified by CVify
              </p>
            </div>

            <div className="flex items-center gap-12 md:gap-20">
              {user?.branding?.verificationStats?.atsScore && (
                <div className="text-center">
                  <p className="text-4xl font-bold text-white" style={{ fontFamily: tokens.fonts.mono }}>
                    {user.branding.verificationStats.atsScore}%
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] mt-2" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textMuted }}>AVG_ATS_SCORE</p>
                </div>
              )}
              {user?.branding?.verificationStats?.dataPoints && (
                <div className="text-center">
                  <p className="text-4xl font-bold text-white" style={{ fontFamily: tokens.fonts.mono }}>
                    {user.branding.verificationStats.dataPoints}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] mt-2" style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textMuted }}>DATA_POINTS</p>
                </div>
              )}
            </div>

            <button
              onClick={() => {}}
              className="px-8 py-4 rounded text-xs font-bold uppercase tracking-widest transition-all border"
              style={{ fontFamily: tokens.fonts.mono, borderColor: tokens.colors.primary, color: tokens.colors.primary, backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = tokens.colors.primary; e.currentTarget.style.color = '#000'; e.currentTarget.style.boxShadow = `0 0 20px ${tokens.colors.primary}66`; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = tokens.colors.primary; e.currentTarget.style.boxShadow = 'none'; }}
            >
              ACCESS_DOSSIER
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default About;
