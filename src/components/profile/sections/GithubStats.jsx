import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Package, 
  Activity, 
  ExternalLink, 
  Code2, 
  Users, 
  Settings, 
  ShieldCheck, 
  Cpu, 
  Users2, 
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";

/**
 * GithubStats: The "Decision Engine" for recruiters.
 * Transforms raw GitHub data into high-fidelity hiring signals.
 */
const GithubStats = React.memo(({ githubUrl, userSkills = [], data, loading }) => {
  const error = !data && !loading && githubUrl;
  const githubUsername = githubUrl?.split("github.com/")[1]?.split("/")[0];

  if (!githubUsername) return null;

  const Skeleton = () => (
    <div className="space-y-12 animate-pulse">
      <div className="h-48 bg-white/5 rounded-[3rem]" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-40 bg-white/5 rounded-[2.5rem]" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="h-64 bg-white/5 rounded-[3rem]" />
        <div className="h-64 bg-white/5 rounded-[3rem]" />
      </div>
    </div>
  );

  if (loading) return (
    <section className="py-20 bg-[var(--bg-primary)]/10">
      <div className="max-w-7xl mx-auto px-6">
        <Skeleton />
      </div>
    </section>
  );

  if (error || !data) return (
    <section className="py-12 opacity-30 text-center italic text-sm">
      GitHub Decision Engine offline.
    </section>
  );

  const { stats, scores, signals, verdict, topLanguages, topRepos } = data;

  const signalConfig = {
    Reliability: { icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    ProblemSolving: { icon: Cpu, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    Collaboration: { icon: Users2, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    Complexity: { icon: ShieldCheck, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" }
  };

  return (
    <section id="github-snapshot" className="py-20 lg:py-32 border-b border-[var(--card-border)] bg-[var(--bg-primary)]/30 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--primary-color)]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- PHASE 1: THE EXECUTIVE HOOK --- */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-[3.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 backdrop-blur-3xl relative overflow-hidden group shadow-2xl"
          >
             {/* Animating HUD overlay */}
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                <Settings className="w-40 h-40 animate-spin-slow" />
             </div>

             <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20 rounded-full mb-8">
                  <span className="w-2 h-2 bg-[var(--primary-color)] rounded-full animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--primary-color)]">
                    Developer Intelligence Summary
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] uppercase tracking-tighter leading-[0.95] mb-8">
                  Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-blue-400">Decision Engine</span>
                </h2>

                <div className="p-6 md:p-8 bg-white/5 border border-white/5 rounded-[2.5rem] mb-10">
                  <p className="text-xl md:text-2xl font-bold text-[var(--text-primary)] leading-tight italic">
                    "{verdict}"
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
                    <TrendingUp size={16} className="text-[var(--primary-color)]" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">High Velocity Profile</span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
                    <Award size={16} className="text-yellow-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Architecture Specialist</span>
                  </div>
                </div>
             </div>
          </motion.div>
        </div>

        {/* --- PHASE 2: THE THREE PILLARS (SIGNALS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {Object.entries(signalConfig).map(([key, config], idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[3rem] bg-[var(--card-bg)] border ${config.border} hover:scale-[1.02] transition-all group relative overflow-hidden`}
            >
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <config.icon size={120} />
              </div>
              
              <div className={`w-14 h-14 ${config.bg} rounded-2xl flex items-center justify-center ${config.color} mb-6`}>
                <config.icon size={24} />
              </div>

              <div className="space-y-1 mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{key}</span>
                <h4 className="text-2xl font-black text-[var(--text-primary)]">
                  {signals[key.charAt(0).toLowerCase() + key.slice(1)]}
                </h4>
              </div>

              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${scores[key.charAt(0).toLowerCase() + key.slice(1)]}%` }}
                  className={`h-full bg-current ${config.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- PHASE 3: SUPPORTING EVIDENCE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Top Repos (Recruiter Evidence) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between">
               <h4 className="text-xl font-black uppercase tracking-widest flex items-center gap-4">
                  <Package className="text-[var(--primary-color)]" size={20} />
                  High Impact Projects
               </h4>
               <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">Ranked by Complexity</span>
            </div>

            <div className="space-y-4">
              {topRepos.map((repo, i) => (
                <div key={i} className="group/repo p-6 bg-white/[0.02] border border-white/5 hover:border-[var(--primary-color)]/30 rounded-[2.5rem] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h5 className="text-lg font-black text-[var(--text-primary)] group-hover/repo:text-[var(--primary-color)] transition-colors">
                      {repo.name}
                    </h5>
                    <p className="text-xs font-medium text-[var(--text-secondary)] line-clamp-1 max-w-md">
                      {repo.description || "Sophisticated engineering implementation."}
                    </p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-base font-black text-[var(--text-primary)]">{repo.stars}</p>
                      <p className="text-[8px] font-black uppercase tracking-tighter opacity-30">Pulse</p>
                    </div>
                    <div className="text-center">
                      <p className="text-base font-black text-[var(--text-primary)]">{repo.forks}</p>
                      <p className="text-[8px] font-black uppercase tracking-tighter opacity-30">Scale</p>
                    </div>
                    <a href={repo.url} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-all">
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity & Tech Stack */}
          <div className="lg:col-span-5 space-y-12">
             <div className="p-10 rounded-[3.5rem] bg-white/[0.03] border border-white/10 space-y-8">
                <div>
                   <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-2">Technical Velocity</h4>
                   <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Commits per day average</p>
                </div>
                
                <div className="flex items-end gap-2">
                   <span className="text-7xl font-black text-[var(--primary-color)] tracking-tighter">{scores.velocity}</span>
                   <span className="text-xs font-black uppercase tracking-widest mb-4 opacity-40">Code / Pulse</span>
                </div>

                <div className="space-y-6">
                   {topLanguages.map((lang, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex justify-between items-end">
                           <span className="text-[10px] font-black uppercase tracking-widest">{lang.name}</span>
                           <span className="text-[10px] opacity-40">{lang.percentage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div
                             initial={{ width: 0 }}
                             whileInView={{ width: `${lang.percentage}%` }}
                             className="h-full bg-[var(--primary-color)]"
                           />
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="pt-6">
               <a 
                 href={githubUrl} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-full py-6 bg-[var(--primary-color)] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:scale-[1.02] transition-all shadow-2xl shadow-[var(--primary-color)]/20"
               >
                 View Full Engineering Proof
                 <ChevronRight size={16} />
               </a>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default GithubStats;
