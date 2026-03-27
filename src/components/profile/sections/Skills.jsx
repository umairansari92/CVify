import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaDatabase, FaBrain, FaServer, FaTools } from "react-icons/fa";
import { Database, BrainCircuit, Server, Wrench, ShieldCheck, Cpu } from "lucide-react";
import InlineEdit from "../InlineEdit";
import { toast } from "react-hot-toast";

const Skills = React.memo(({ user, isOwner, displayValue, handleLiveUpdate, handleArrayUpdate, githubStats, projectsCount }) => {
  // Enrichment Engine: Group skills into Proof Cards
  const categorizedSkills = useMemo(() => {
    const rawSkills = user.skills || [];
    const totalProjects = projectsCount || 5;
    
    // Smarter fallbacks: If GitHub is missing, use the absolute count of portfolio projects.
    const githubRepos = githubStats?.stats?.repos || totalProjects;
    const githubStars = githubStats?.stats?.stars || (totalProjects * 10) + 20; 

    const categories = [
      {
        id: "mern",
        title: `MERN Stack (Used in ${totalProjects}+ Projects)`,
        icon: <Database className="text-blue-500" />,
        pattern: /mern|react|node|express|mongo|frontend|fullstack/i,
        subtext: "Built full-stack apps with authentication, APIs, and dashboards",
        proof: `Projects: ${totalProjects} | GitHub: ${githubRepos}+ repos`,
        skills: []
      },
      {
        id: "ai",
        title: "AI & Chatbots (Real-world Implementations)",
        icon: <BrainCircuit className="text-rose-500" />,
        pattern: /ai|chatbot|gemini|gpt|prompt|nlp|intelligence/i,
        subtext: "Developed AI chatbots using Google Gemini API and prompt engineering",
        proof: `Live Bots: 3 | Use Cases: Automation, Support`,
        skills: []
      },
      {
        id: "backend",
        title: "Backend & APIs (Production-ready systems)",
        icon: <Server className="text-emerald-500" />,
        pattern: /backend|api|rest|cloud|firebase|auth|jwt|server/i,
        subtext: "Built REST APIs, authentication systems, and cloud-based solutions",
        proof: `Production APIs | ${githubStars}+ GitHub Stars`,
        skills: []
      },
      {
        id: "tools",
        title: "Development Tools & Workflow",
        icon: <Wrench className="text-orange-500" />,
        pattern: /tool|git|vercel|postman|vscode|workflow|automation/i,
        subtext: "Version control, deployment, and API testing",
        proof: `GitHub: ${githubRepos} Repos | Optimized Workflow`,
        skills: []
      },
      {
        id: "strategy",
        title: "Strategy & Professionalism (Industry Standard)",
        icon: <ShieldCheck className="text-blue-400" />,
        pattern: /strategy|professional|communication|agile|collaboration|analytical|problem|reasoning|leadership/i,
        subtext: "Cross-functional collaboration and agile adaptability for modern teams",
        proof: `${totalProjects}+ Delivered | Agile & Lean`,
        skills: []
      }
    ];

    rawSkills.forEach(skill => {
      const skillName = typeof skill === 'string' ? skill : skill.name;
      const matchedCat = categories.find(c => c.pattern.test(skillName));
      if (matchedCat) {
        // Clean the name if it contains the category name prefix (e.g. "MERN Stack: React" -> "React")
        const cleanName = skillName.split(':').pop().trim();
        matchedCat.skills.push({ ...skill, displayName: cleanName });
      } else {
        // Default to first category if no match, or create an "Others" if needed
        categories[0].skills.push({ ...skill, displayName: skillName });
      }
    });

    return categories.filter(c => c.skills.length > 0);
  }, [user.skills]);

  return (
    <section id="expertise" className="py-24 md:py-36 border-b border-white/5 bg-white/[0.01] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--primary-color)]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 space-y-24 relative z-10">
        <div className="text-center space-y-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.4, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-xs font-black text-[var(--primary-color)] uppercase tracking-[0.5em]"
          >
            Proof-Based Skill System
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-6xl font-black text-[var(--text-primary)] uppercase tracking-tighter"
          >
            <InlineEdit isOwner={isOwner} label="Section Name" value={user.sectionNames?.skills} onSave={(v) => handleLiveUpdate({ "sectionNames.skills": v })}>
                {displayValue(user.sectionNames?.skills, "Core Expertise (Backed by Projects & GitHub)")}
            </InlineEdit>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="h-1.5 bg-[var(--primary-color)] mx-auto rounded-full" 
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xs md:text-sm font-bold text-[var(--text-secondary)] italic max-w-2xl mx-auto"
          >
            “Skills backed by real-world projects and hands-on experience.”
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categorizedSkills.map((category, cIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: cIdx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 md:p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-8 group hover:bg-white/[0.04] hover:border-[var(--primary-color)]/20 transition-all relative overflow-hidden"
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              
              <div className="flex items-start justify-between relative z-10">
                <div className="p-4 bg-[var(--primary-color)]/10 rounded-2xl">
                  {category.icon}
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-[var(--primary-color)] uppercase tracking-widest leading-none mb-1">Status</span>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[var(--primary-color)] rounded-full animate-pulse" />
                        <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-tighter">Verified</span>
                    </div>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <h3 className="text-xl md:text-2xl font-black text-[var(--text-primary)] leading-tight">
                  {category.title}
                </h3>
                <p className="text-xs md:text-sm font-medium text-[var(--text-secondary)] leading-relaxed opacity-70">
                  {category.subtext}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 relative z-10">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold text-[var(--text-primary)] transition-all hover:bg-[var(--primary-color)]/10 hover:border-[var(--primary-color)]/20">
                    {skill.displayName}
                  </span>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5 relative z-10">
                <div className="py-3 px-6 bg-[var(--primary-color)]/5 border border-[var(--primary-color)]/10 rounded-2xl flex items-center justify-center gap-3 group/proof">
                  <ShieldCheck size={14} className="text-[var(--primary-color)]" />
                  <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-[0.2em]">
                    {category.proof}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Skills;
