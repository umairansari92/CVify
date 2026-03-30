import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase, FaNpm, FaGitAlt, FaGithub, FaFire, FaServer, FaCode, FaLaptopCode, FaLink, FaJava, FaLayerGroup, FaServicestack, FaAws, FaDocker, FaPython, FaPhp, FaRust, FaFigma, FaSwift, FaGem, FaBrain, FaTerminal
} from "react-icons/fa";
import { 
  SiNextdotjs, SiRedux, SiExpress, SiMongodb, SiPostman, SiTailwindcss, SiBootstrap, SiMui, SiFirebase, SiSupabase, SiReacthookform, SiNodemon, SiVercel, SiTypescript,
  SiVuedotjs, SiAngular, SiSvelte, SiJquery, SiHtmx, SiSass, SiLess, SiChakraui, SiShadcnui, SiNestjs, SiDjango, SiFlask, SiFastapi, SiLaravel, SiSpringboot,
  SiPostgresql, SiMysql, SiRedis, SiSqlite, SiNetlify, SiDigitalocean, SiKubernetes, SiJenkins, SiTerraform, SiAnsible, SiGitlab, SiArduino
} from "react-icons/si";
import InlineEdit from "../InlineEdit";

const ICON_MAP = {
  // Frontend
  react: <FaReact className="text-[#61DAFB]" />,
  next: <SiNextdotjs className="text-white" />,
  redux: <SiRedux className="text-[#764ABC]" />,
  vue: <SiVuedotjs className="text-[#4FC08D]" />,
  angular: <SiAngular className="text-[#DD0031]" />,
  svelte: <SiSvelte className="text-[#FF3E00]" />,
  jquery: <SiJquery className="text-[#0769AD]" />,
  htmx: <SiHtmx className="text-[#3366CC]" />,
  // Styling
  tailwind: <SiTailwindcss className="text-[#06B6D4]" />,
  bootstrap: <SiBootstrap className="text-[#7952B3]" />,
  sass: <SiSass className="text-[#CC6699]" />,
  less: <SiLess className="text-[#1D365D]" />,
  mui: <SiMui className="text-[#007FFF]" />,
  chakra: <SiChakraui className="text-[#319795]" />,
  shadcn: <SiShadcnui className="text-white" />,
  // Backend
  node: <FaNodeJs className="text-[#339933]" />,
  express: <SiExpress className="text-white" />,
  nest: <SiNestjs className="text-[#E0234E]" />,
  django: <SiDjango className="text-[#092E20]" />,
  flask: <SiFlask className="text-white" />,
  fastapi: <SiFastapi className="text-[#05998B]" />,
  laravel: <SiLaravel className="text-[#FF2D20]" />,
  spring: <SiSpringboot className="text-[#6DB33F]" />,
  // Databases
  mongo: <SiMongodb className="text-[#47A248]" />,
  postgre: <SiPostgresql className="text-[#4169E1]" />,
  mysql: <SiMysql className="text-[#4479A1]" />,
  redis: <SiRedis className="text-[#DC382D]" />,
  sqlite: <SiSqlite className="text-[#003B57]" />,
  firebase: <SiFirebase className="text-[#FFCA28]" />,
  supabase: <SiSupabase className="text-[#3ECF8E]" />,
  // Cloud
  aws: <FaAws className="text-[#FF9900]" />,
  googlecloud: <FaServer className="text-[#4285F4]" />,
  vercel: <SiVercel className="text-white" />,
  netlify: <SiNetlify className="text-[#00C7B7]" />,
  digitalocean: <SiDigitalocean className="text-[#0080FF]" />,
  // DevOps
  docker: <FaDocker className="text-[#2496ED]" />,
  kubernetes: <SiKubernetes className="text-[#326CE5]" />,
  jenkins: <SiJenkins className="text-[#D24939]" />,
  terraform: <SiTerraform className="text-[#7B42BC]" />,
  ansible: <SiAnsible className="text-[#EE0000]" />,
  github: <FaGithub className="text-white" />,
  gitlab: <SiGitlab className="text-[#FC6D26]" />,
  // Languages
  javascript: <FaJs className="text-[#F7DF1E]" />,
  js: <FaJs className="text-[#F7DF1E]" />,
  typescript: <SiTypescript className="text-[#3178C6]" />,
  ts: <SiTypescript className="text-[#3178C6]" />,
  python: <FaPython className="text-[#3776AB]" />,
  java: <FaJava className="text-[#007396]" />,
  php: <FaPhp className="text-[#777BB4]" />,
  rust: <FaRust className="text-white" />,
  go: <FaTerminal className="text-[#00ADD8]" />,
  cpp: <FaCode className="text-[#00599C]" />,
  csharp: <FaCode className="text-[#239120]" />,
  ruby: <FaGem className="text-[#CC342D]" />,
  swift: <FaSwift className="text-[#F05138]" />,
  kotlin: <FaCode className="text-[#7F52FF]" />,
  // AI
  openai: <FaBrain className="text-[#412991]" />,
  linkchain: <FaLink className="text-[#2D3341]" />,
  tensorflow: <FaBrain className="text-[#FF6F00]" />,
  pytorch: <FaBrain className="text-[#EE4C2C]" />,
  // Specialty
  figma: <FaFigma className="text-[#F24E1E]" />,
  arduino: <SiArduino className="text-[#00979D]" />,
  vscode: <FaLaptopCode className="text-[#007ACC]" />,
};

const Skills = React.memo(({ user, isOwner, displayValue, handleLiveUpdate }) => {
  // ROBUST DATA NORMALIZATION: Handle both Object {technical, strategic} and Array [{name, category}] formats
  const normalizedData = useMemo(() => {
    let tech = [];
    let strat = [];

    // 1. Handle Object format (new dashboard structure)
    if (user.skills && !Array.isArray(user.skills)) {
      tech = user.skills.technical || [];
      strat = user.skills.strategic || [];
    } 
    // 2. Handle Array format (legacy / Mongoose schema default)
    else if (Array.isArray(user.skills)) {
      user.skills.forEach(skill => {
        const name = typeof skill === 'string' ? skill : (skill.name || "");
        const category = skill.category?.toLowerCase() || "";
        
        if (category === 'strategic' || category === 'soft skills' || category === 'administrative') {
          strat.push(name);
        } else {
          tech.push(name);
        }
      });
    }

    return { tech, strat };
  }, [user.skills]);

  const technicalSkills = normalizedData.tech;
  const strategicSkills = normalizedData.strat;
  const services = useMemo(() => {
    const rawServices = user.services || [];
    return Array.isArray(rawServices) ? rawServices : [];
  }, [user.services]);

  const getSkillIcon = (name) => {
    if (!name || typeof name !== 'string') return <FaCode className="text-gray-400" />;
    const rawName = name.toLowerCase().replace(/[\s\-_.]/g, "");
    
    // Exact or partial match in ICON_MAP
    const matchedKey = Object.keys(ICON_MAP).find(key => rawName.includes(key));
    if (matchedKey) return ICON_MAP[matchedKey];
    
    return <FaCode className="text-gray-400" />;
  };

  const SkillPill = ({ name, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, type: "spring", stiffness: 100 }}
      whileHover={{ 
          scale: 1.05, 
          y: -5,
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
          borderColor: "var(--primary-color)"
      }}
      className="group relative flex items-center gap-3 px-6 py-4 bg-white/[0.05] dark:bg-white/[0.02] border border-white/10 dark:border-white/5 rounded-2xl cursor-default transition-all duration-500 hover:bg-white dark:hover:bg-white hover:text-slate-900 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
      <div className="relative z-10 text-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
        {getSkillIcon(name)}
      </div>
      <div className="flex flex-col relative z-10">
        <span className="text-[11px] md:text-sm font-black text-[var(--text-primary)] group-hover:text-slate-900 uppercase tracking-tighter leading-none transition-colors">
          {name}
        </span>
        <span className="text-[7px] font-bold text-[var(--primary-color)] uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          Verified
        </span>
      </div>
    </motion.div>
  );

  return (
    <section id="expertise" className="py-24 md:py-36 border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--primary-color)]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 space-y-32 relative z-10">
        
        {/* --- EXPERIENCE & SKILLS SECTION --- */}
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20 mb-4"
            >
              <FaLayerGroup className="text-[var(--primary-color)] text-xs" />
              <span className="text-[10px] font-black text-[var(--primary-color)] uppercase tracking-widest">Expertise Engine</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-black text-[var(--text-primary)] uppercase tracking-tighter"
            >
              <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.skills} onSave={(v) => handleLiveUpdate({ "sectionNames.skills": v })}>
                  {user.sectionNames?.skills ? user.sectionNames.skills : (
                    <>My <span className="text-[var(--primary-color)]">Skills</span></>
                  )}
              </InlineEdit>
            </motion.h2>
          </div>

          <div className="space-y-12">
            {/* Technical Group */}
            {technicalSkills.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-[9px] font-black text-[var(--primary-color)] text-center uppercase tracking-[0.5em] opacity-40">Technical Arsenal</h3>
                <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto">
                  {technicalSkills.map((skill, idx) => <SkillPill key={idx} name={skill} index={idx} />)}
                </div>
              </div>
            )}

            {/* Strategic Group */}
            {strategicSkills.length > 0 && (
              <div className="space-y-8">
                <h3 className="text-[9px] font-black text-[var(--primary-color)] text-center uppercase tracking-[0.5em] opacity-40">Strategic Mindset</h3>
                <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto">
                  {strategicSkills.map((skill, idx) => <SkillPill key={idx} name={skill} index={idx + technicalSkills.length} />)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- PROFESSIONAL SERVICES SECTION --- */}
        {(isOwner || services.length > 0) && (
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4"
              >
                <FaServicestack className="text-violet-500 text-xs" />
                <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest">Solutions Factory</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter"
              >
                <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.services} onSave={(v) => handleLiveUpdate({ "sectionNames.services": v })}>
                    {user.sectionNames?.services ? user.sectionNames.services : (
                      <>Professional <span className="text-violet-500">Services</span></>
                    )}
                </InlineEdit>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-6 hover:bg-white/[0.04] hover:border-violet-500/20 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 blur-[50px] rounded-full pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-500">
                      <FaServicestack size={20} />
                    </div>
                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/5 px-4 py-1.5 rounded-full uppercase tracking-widest">Ready to Deploy</span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">{service.title}</h3>
                    <p className="text-xs md:text-sm text-[var(--text-secondary)] opacity-70 leading-relaxed italic line-clamp-3">
                      “{service.description}”
                    </p>
                  </div>
                </motion.div>
              ))}
              {services.length === 0 && (
                <div className="col-span-full py-20 text-center opacity-20 italic">No services listed yet.</div>
              )}
            </div>
          </div>
        )}

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-10 flex flex-col items-center gap-4"
        >
            <div className="h-px w-20 bg-white/10" />
            <p className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] opacity-30">
                Verified Expertise & Value Propositions
            </p>
        </motion.div>
      </div>
    </section>
  );
});

export default Skills;
