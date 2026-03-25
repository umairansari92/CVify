import React from "react";
import { motion } from "framer-motion";
import { Rocket as RocketIcon } from "lucide-react";
import { FaMagic, FaCheckCircle, FaChevronDown, FaLayerGroup } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import InlineEdit from "../InlineEdit";

const Hero = React.memo(({ user, isOwner, theme, displayValue, handleLiveUpdate }) => {
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
    <section id="home" className="relative min-h-[100vh] flex flex-col justify-center pt-28 sm:pt-36 lg:pt-48 pb-24 lg:pb-40 outline-none bg-gradient-to-b from-[var(--bg-color)] to-[var(--card-bg)]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw))' }}>
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-[var(--primary-color)]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main 2-Column Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        
        {/* LEFT COLUMN: TEXT */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-7 flex flex-col items-start text-left space-y-4">
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-[var(--text-primary)] leading-[1.2] tracking-normal w-full">
            <span className="block mb-2 md:mb-4">
              Hi, I'm{" "}
              <InlineEdit className="inline-block" isOwner={isOwner} id="heroTitle" value={personalInfo.fullName} onSave={(v) => { const [f, ...l] = v.split(" "); handleLiveUpdate({ firstName: f, lastName: l.join(" ") }); }}>
                <span className="text-transparent uppercase" style={{ WebkitTextStroke: '2px var(--text-secondary)', opacity: 0.8 }}>
                  {displayValue(personalInfo.fullName, "User Name")}.
                </span>
              </InlineEdit>
            </span>
            <span className="block">
              I'm a Professional
            </span>
          </h1>

          <div className="w-full text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-[var(--text-secondary)] mt-4 min-h-[4rem] md:min-h-[5rem] flex items-start">
            <InlineEdit className="w-full" isOwner={isOwner} id="heroRole" value={personalInfo.jobTitle} multiline={true} onSave={(v) => handleLiveUpdate({ headline: v })}>
              <div className="w-full break-words leading-snug">
                <TypeAnimation
                  key={personalInfo.jobTitle} // Force re-render on live update
                  sequence={
                    slogans.length > 0 
                    ? slogans.flatMap(s => [s, 2000]) 
                    : (personalInfo.jobTitle 
                        ? personalInfo.jobTitle.split(",").map(s => s.trim()).filter(Boolean).flatMap(s => [s, 2000]) 
                        : ["Software Engineer", 2000])
                  }
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-[var(--text-secondary)]"
                />
              </div>
            </InlineEdit>
          </div>





          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap items-center gap-6 pt-6">
             <a href="#showcase" className="px-8 py-4 bg-[var(--primary-color)] text-[var(--bg-color)] rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_var(--primary-color)]/30 flex items-center gap-2">
               🚀 Journey
             </a>
             <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-full font-black text-xs uppercase tracking-widest hover:border-[var(--primary-color)]/50 transition-all flex items-center gap-2">
               📩 Contact
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
               <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute -left-4 bottom-1/4 p-3 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl text-[var(--primary-color)]">
                 <FaLayerGroup size={20} />
               </motion.div>

               {/* Background Accent */}
               <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--primary-color)] to-transparent opacity-20 blur-2xl -z-10 rounded-[3rem]" />
             </div>
           )}

           {/* Identity Label Pill (Relocated below image) */}
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1 }}
             className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-6 py-3 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-xl shadow-2xl whitespace-nowrap min-w-[200px] justify-center"
           >
             <div className="w-2 h-2 rounded-full bg-[var(--primary-color)] animate-pulse shadow-[0_0_10px_var(--primary-color)]" />
             <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[var(--text-primary)]">
                <InlineEdit isOwner={isOwner} id="heroStatusBadge" value={branding.identityLabel} onSave={(v) => handleLiveUpdate({ "branding.identityLabel": v })}>
                  {displayValue(branding.identityLabel, "Visionary Designer")}
                </InlineEdit>
             </span>
           </motion.div>
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
