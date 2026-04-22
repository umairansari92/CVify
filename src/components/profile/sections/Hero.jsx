import React from "react";
import { motion } from "framer-motion";
import { Rocket as RocketIcon } from "lucide-react";
import { FaMagic, FaCheckCircle, FaChevronDown, FaLayerGroup } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import InlineEdit from "../InlineEdit";

const Hero = React.memo(({ user, isOwner, theme, displayValue, handleLiveUpdate, analytics }) => {
  const personalInfo = user?.personalInfo || {
    fullName: [user?.firstName, user?.lastName].filter(Boolean).join(" "),
    image: user?.profileImage,
    jobTitle: user?.headline,
    objective: user?.bio,
    location: user?.location,
    email: user?.email,
    phone: user?.phoneNumber
  };
  const branding = user?.branding || {};
  const slogans = user?.heroSlogans || [];

  const HeroStats = () => {
    const stats = [
      { 
        label: "Recruiter Engagement", 
        value: analytics.views != null ? `${analytics.views} Profile Views` : null, 
        icon: <FaMagic size={14} />,
        field: null 
      },
      { 
        label: "Hiring Signals", 
        value: (analytics.contactClicks != null || analytics.resumeDownloads != null) ? `${(analytics.contactClicks || 0) + (analytics.resumeDownloads || 0)} Signals Generated` : null, 
        icon: <RocketIcon size={14} />,
        field: null 
      },
      { 
        label: "Talent Status", 
        value: user?.availability, 
        icon: <FaCheckCircle size={14} />,
        field: "availability"
      },
    ].filter(s => s.value);

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
    <section id="home" className="relative min-h-[100vh] flex flex-col justify-center pt-28 sm:pt-36 lg:pt-48 pb-24 lg:pb-40 outline-none bg-gradient-to-b from-[var(--bg-color)] to-[var(--card-bg)]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw))' }}>
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-[var(--primary-color)]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main 2-Column Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        
        {/* LEFT COLUMN: TEXT */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {personalInfo.fullName && (
            <div className="space-y-2">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[6rem] font-black text-[var(--text-primary)] leading-[0.9] tracking-tighter w-full">
                <InlineEdit className="inline-block" isOwner={isOwner} id="heroTitle" value={personalInfo.fullName} onSave={(v) => { const [f, ...l] = v.split(" "); handleLiveUpdate({ firstName: f, lastName: l.join(" ") }); }}>
                  <span className="text-white uppercase block">
                    {personalInfo.fullName}
                  </span>
                </InlineEdit>
              </h1>

              {(slogans.length > 0 || personalInfo.jobTitle) && (
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--primary-color)] tracking-tighter italic leading-none h-[1.2em]">
                  <InlineEdit isOwner={isOwner} id="heroRole" value={personalInfo.jobTitle} multiline={true} onSave={(v) => handleLiveUpdate({ headline: v })}>
                    <TypeAnimation
                      key={personalInfo.jobTitle || "empty"}
                      sequence={
                        slogans.length > 0 
                        ? slogans.flatMap(s => [s, 2000]) 
                        : personalInfo.jobTitle ? personalInfo.jobTitle.split(",").map(s => s.trim()).filter(Boolean).flatMap(s => [s, 2000]) : ["Developer", 2000]
                      }
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                    />
                  </InlineEdit>
                </div>
              )}
            </div>
          )}

          {user?.branding?.valueProposition && (
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] opacity-80 max-w-2xl font-medium leading-relaxed">
              {user.branding.valueProposition}
            </p>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap items-center gap-4 pt-10">
             <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 bg-[var(--primary-color)] text-white rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_30px_var(--primary-color)]/40 flex items-center gap-2">
               📂 View Profile
             </button>
             <button onClick={() => window.open(user?.resumes?.[0]?.fileUrl || '#', '_blank')} className="px-10 py-5 bg-white/5 border border-white/10 text-[var(--text-primary)] rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
               📄 Get Resume
             </button>
             <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 bg-transparent border-2 border-[var(--primary-color)]/30 text-[var(--primary-color)] rounded-full font-black text-xs uppercase tracking-widest hover:bg-[var(--primary-color)]/10 transition-all flex items-center gap-2">
               📧 Contact
             </button>
          </motion.div>

        </motion.div>

        {/* RIGHT COLUMN: PORTRAIT */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-5 flex justify-center lg:justify-end relative mt-16 mx-auto lg:mt-0 lg:mx-0 w-full">
           {personalInfo.image && (
             <div className="w-[85%] sm:w-full max-w-sm md:max-w-md h-[380px] sm:h-[450px] md:h-[500px] lg:w-[420px] lg:h-[550px] rounded-[2rem] border border-[var(--card-border)] p-2 bg-[var(--card-bg)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-20">
               <img src={personalInfo.image} alt="Profile" className="w-full h-full object-cover rounded-[1.5rem]" />
               
               {/* Floating Badges */}
               <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -right-4 top-1/4 p-3 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl text-[var(--primary-color)]">
                 <FaCheckCircle size={20} />
               </motion.div>
               <motion.div 
                 initial={{ x: 20, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ delay: 1.2 }}
                 className="absolute -right-8 bottom-1/3 bg-[var(--primary-color)] text-[var(--bg-color)] px-4 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-2xl rotate-12 z-40 hidden sm:block border-2 border-[var(--bg-color)]"
               >
                 Available for Hire ⚡
               </motion.div>
               <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute -left-4 bottom-1/4 p-3 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl text-[var(--primary-color)]">
                 <FaLayerGroup size={20} />
               </motion.div>

               {/* Background Accent */}
               <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--primary-color)] to-transparent opacity-20 blur-2xl -z-10 rounded-[3rem]" />
             </div>
           )}

           {branding.identityLabel && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1 }}
               className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-6 py-3 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-xl shadow-2xl whitespace-nowrap min-w-[200px] justify-center"
             >
               <div className="w-2 h-2 rounded-full bg-[var(--primary-color)] animate-pulse shadow-[0_0_10px_var(--primary-color)]" />
               <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[var(--text-primary)]">
                  <InlineEdit isOwner={isOwner} id="heroStatusBadge" value={branding.identityLabel} onSave={(v) => handleLiveUpdate({ "branding.identityLabel": v })}>
                    {branding.identityLabel}
                  </InlineEdit>
               </span>
             </motion.div>
           )}
        </motion.div>
      </div>
      
      {/* Bottom Stats Row */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 mt-20">
          <HeroStats />
      </div>

    </section>
  );
});

export default Hero;
