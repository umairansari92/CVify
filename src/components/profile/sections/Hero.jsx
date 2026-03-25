import React from "react";
import { motion } from "framer-motion";
import { Rocket as RocketIcon } from "lucide-react";
import { FaMagic, FaCheckCircle, FaChevronDown, FaLayerGroup } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import InlineEdit from "../InlineEdit";

const Hero = React.memo(({ user, isOwner, theme, displayValue, handleLiveUpdate }) => {
  const personalInfo = user?.personalInfo || {};
  const branding = user?.branding || {};
  const slogans = user?.heroSlogans || [];

  const HeroStats = () => {
    const stats = [
      { 
        label: "Impact", 
        value: (user?.projects?.length || 0) > 0 ? `${user.projects.length}+ Projects` : "10+ Projects", 
        icon: <RocketIcon size={14} />,
        field: null 
      },
      { 
        label: "Identity", 
        value: displayValue(branding.identityLabel, "Full-stack Expert"), 
        icon: <FaMagic size={14} />,
        field: "branding.identityLabel"
      },
      { 
        label: "Availability", 
        value: displayValue(user?.availability, "Open to Work"), 
        icon: <FaCheckCircle size={14} />,
        field: "availability"
      },
    ];

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pt-12 border-t border-white/5"
      >
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[var(--primary-color)]/20 transition-all group">
            <div className="text-[var(--primary-color)] opacity-60 group-hover:opacity-100 transition-all">
              {stat.icon}
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40 group-hover:opacity-60 transition-all">{stat.label}</p>
              {stat.field ? (
                <div className="text-sm font-black text-[var(--text-primary)]">
                  <InlineEdit isOwner={isOwner} id={`stat-${i}`} value={stat.value} onSave={(v) => handleLiveUpdate({ [stat.field]: v })}>
                    {stat.value}
                  </InlineEdit>
                </div>
              ) : (
                <p className="text-sm font-black text-[var(--text-primary)]">{stat.value}</p>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center pt-32 overflow-hidden outline-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-[var(--primary-color)]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-10 md:space-y-14">
        
        {/* Profile Image & Slogan Identity Layer */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6">
          
          {personalInfo.image && (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-2 bg-gradient-to-tr from-[var(--primary-color)] to-transparent relative z-20 shadow-2xl">
              <img 
                src={personalInfo.image} 
                alt="Profile Identity" 
                className="w-full h-full rounded-full object-cover object-top bg-[var(--card-bg)]"
              />
            </div>
          )}

          <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] shadow-xl mt-4">
            <RocketIcon size={16} className="text-[var(--primary-color)]" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[var(--text-secondary)]">
              <InlineEdit isOwner={isOwner} id="heroStatus" value={branding.identityLabel || "Digital Architecture & Strategy"} onSave={(v) => handleLiveUpdate({ "branding.identityLabel": v })}>
                {branding.identityLabel || "Digital Architecture & Strategy"}
              </InlineEdit>
            </span>
          </span>

          {slogans.length > 0 && (
            <div className="h-4 flex items-center justify-center">
              <TypeAnimation
                sequence={slogans.flatMap(s => [s, 3000])}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-xs md:text-sm font-black uppercase tracking-[0.4em] text-[var(--primary-color)] opacity-60"
              />
            </div>
          )}
        </motion.div>

        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-[var(--text-primary)] tracking-tighter leading-[0.9] uppercase"
          >
            <InlineEdit isOwner={isOwner} id="heroTitle" value={personalInfo.fullName} onSave={(v) => { const [f, ...l] = v.split(" "); handleLiveUpdate({ firstName: f, lastName: l.join(" ") }); }}>
              {displayValue(personalInfo.fullName, "User Name")}
            </InlineEdit>
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-4xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--primary-color)] to-[var(--text-secondary)] tracking-tight leading-tight"
          >
            <InlineEdit isOwner={isOwner} id="heroRole" value={personalInfo.jobTitle} onSave={(v) => handleLiveUpdate({ headline: v })}>
              {displayValue(personalInfo.jobTitle, "Engineering Future Solutions.")}
            </InlineEdit>
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-2xl lg:text-3xl text-[var(--text-secondary)] font-light max-w-3xl mx-auto leading-relaxed"
        >
          <InlineEdit isOwner={isOwner} id="heroObjective" value={personalInfo.objective} onSave={(v) => handleLiveUpdate({ bio: v })} type="textarea">
            <p className="opacity-80">"{displayValue(personalInfo.objective, "I build intelligent digital products that bridge the gap between human needs and complex technology.")}"</p>
          </InlineEdit>
        </motion.div>

        <div className="space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10">
            <a href="#showcase" className="group relative px-12 py-5 bg-[var(--primary-color)] text-white rounded-full font-black text-xs uppercase tracking-widest overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_var(--primary-color)]/40 flex items-center gap-3">
              <span className="relative z-10">🚀 View My Journey</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-12 py-5 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-full font-black text-xs uppercase tracking-widest hover:border-[var(--primary-color)]/50 hover:bg-[var(--primary-color)]/5 transition-all flex items-center gap-3 active:scale-95">
              📩 Contact Me
            </button>
          </motion.div>
          <HeroStats />
        </div>
      </div>

      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--primary-color)] opacity-40 flex flex-col items-center gap-2">
         <span className="text-[8px] font-black uppercase tracking-[0.4em]">Initialize</span>
         <FaChevronDown size={20} />
      </motion.div>
    </section>
  );
});

export default Hero;
