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
  Award,
  Zap,
  Target
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
    <section className="py-12 opacity-30 text-center italic text-sm text-[var(--text-secondary)]">
      GitHub Decision Engine offline.
    </section>
  );

  const { stats, scores, signals, verdict, topLanguages, topRepos, pulse, dna } = data;

  const signalConfig = {
    Reliability: { icon: Activity, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
    ProblemSolving: { icon: Cpu, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
    Collaboration: { icon: Users2, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
    Complexity: { icon: ShieldCheck, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" }
  };

  return (
    <section id="github-snapshot" className="py-20 lg:py-32 border-b border-[var(--card-border)] bg-[var(--bg-primary)]/30 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--primary-color)]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- PHASE 1: THE DECISION HUD (VERDICT BAR) --- */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-14 rounded-[4rem] bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 backdrop-blur-3xl relative overflow-hidden group shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
          >
             {/* HUD Decorative Background */}
             <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <Target className="w-64 h-64 animate-pulse" />
             </div>

             <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20 rounded-full">
                    <Zap size={14} className="text-[var(--primary-color)] fill-[var(--primary-color)]" />
                    <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[var(--primary-color)]">
                      Intelligence Report: {dna || "Developer"}
                    </span>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border ${pulse?.includes("Hot") ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"}`}>
                    <span className={`w-2 h-2 rounded-full ${pulse?.includes("Hot") ? "bg-red-500 animate-pulse" : "bg-emerald-500"}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{pulse || "Active Pulse"}</span>
                  </div>
                </div>

                <div className="max-w-4xl">
                  <h2 className="text-4xl md:text-7xl font-black text-[var(--text-primary)] uppercase tracking-tighter leading-[0.85] mb-10 italic">
                    Hiring <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-color)] to-blue-400">Verdict</span>
                  </h2>

                  <div className="p-8 md:p-12 bg-white/5 border border-white/5 rounded-[3rem] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[var(--primary-color)] shadow-[0_0_20px_var(--primary-color)]" />
                    <p className="text-2xl md:text-4xl font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight">
                      "{verdict}"
                    </p>
                  </div>
                </div>
             </div>
          </motion.div>
        </div>

        {/* --- PHASE 2: THE FOUR PILLARS (INTERPRETED SIGNALS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {Object.entries(signalConfig).map(([key, config], idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`p-10 rounded-[3.5rem] bg-[var(--card-bg)] border ${config.border} hover:scale-[1.03] transition-all group relative overflow-hidden`}
            >
              <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <config.icon size={140} />
              </div>
              
              <div className={`w-16 h-16 ${config.bg} rounded-[1.5rem] flex items-center justify-center ${config.color} mb-8`}>
                <config.icon size={28} />
              </div>

              <div className="space-y-1 mb-8">
                <span className="text-[11px] font-black uppercase tracking-[0.25em] opacity-40 leading-none">{key}</span>
                <div className="flex items-center gap-3">
                  <h4 className="text-3xl font-black text-[var(--text-primary)] tracking-tighter">
                    {signals?.[key.charAt(0).toLowerCase() + key.slice(1)] || (loading ? "Analyzing..." : "Standard")}
                  </h4>
                  {(signals?.[key.charAt(0).toLowerCase() + key.slice(1)] === "High" || signals?.[key.charAt(0).toLowerCase() + key.slice(1)] === "Exceptional") && (
                    <Award size={18} className="text-[var(--primary-color)]" />
                  )}
                </div>
              </div>

              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${scores?.[key.charAt(0).toLowerCase() + key.slice(1)] || 0}%` }}
                  className={`h-full bg-current ${config.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- PHASE 3: TECHNICAL VELOCITY & IMPACT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Engineering Proof (Repos) */}
          <div className="lg:col-span-7 space-y-10">
            <div className="flex items-center justify-between px-4">
               <h4 className="text-2xl font-black uppercase tracking-tight flex items-center gap-4 text-[var(--text-primary)]">
                  <Package className="text-[var(--primary-color)]" size={24} />
                  Top Engineered Solutions
               </h4>
               <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">
                  <TrendingUp size={12} />
                  Intelligence Rank
               </div>
            </div>

            <div className="grid gap-6">
              {topRepos?.map((repo, i) => (
                <div key={i} className="group/repo p-8 bg-white/[0.02] border border-white/5 hover:border-[var(--primary-color)]/30 rounded-[3rem] transition-all flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h5 className="text-xl font-black text-[var(--text-primary)] group-hover/repo:text-[var(--primary-color)] transition-colors tracking-tight">
                        {repo.name}
                      </h5>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase text-[var(--text-secondary)]">
                        {repo.language || "Engine"}
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-[var(--text-secondary)] line-clamp-1 max-w-md opacity-70">
                      {repo.description || "Sophisticated engineering implementation with clean architecture."}
                    </p>
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="text-center">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-xl font-black text-[var(--text-primary)]">{repo.stars}</span>
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-tighter opacity-30">Impact</p>
                    </div>
                    <a href={repo.url} target="_blank" rel="noreferrer" className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-white transition-all shadow-xl group/link">
                      <ChevronRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DNA & Language Synthesis */}
          <div className="lg:col-span-5 space-y-12">
             <div className="p-12 rounded-[4rem] bg-white/[0.03] border border-white/10 space-y-10 shadow-2xl">
                <div>
                   <h4 className="text-base font-black uppercase tracking-[0.25em] text-[var(--text-primary)] mb-2">Engineering Activity</h4>
                   <p className="text-[11px] font-bold opacity-30 uppercase tracking-[0.2em]">Verified Lifecycle Proof</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 hover:border-[var(--primary-color)]/30 transition-all group/stat">
                    <p className="text-3xl font-black text-white group-hover/stat:text-[var(--primary-color)] transition-colors">{stats.journey?.totalCommits || stats.commits90d || 0}</p>
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-40 mt-1">Total Lifetime</p>
                  </div>
                  <div className="p-6 bg-[var(--primary-color)]/10 rounded-[2rem] border border-[var(--primary-color)]/20">
                    <p className="text-3xl font-black text-[var(--primary-color)]">{stats.journey?.thisMonth || 0}</p>
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--primary-color)] mt-1">This Month</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                    <p className="text-2xl font-black text-white">{stats.journey?.thisWeek || 0}</p>
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-40 mt-1">This Week</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                    <p className="text-2xl font-black text-white">{stats.journey?.lastWeek || 0}</p>
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-40 mt-1">Last Week</p>
                  </div>
                </div>

                <div className="space-y-8">
                   {topLanguages?.map((lang, i) => (
                     <div key={i} className="space-y-3">
                        <div className="flex justify-between items-end">
                           <span className="text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)]">{lang.name}</span>
                           <span className="text-xs font-bold text-[var(--primary-color)]">{lang.percentage}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div
                             initial={{ width: 0 }}
                             whileInView={{ width: `${lang.percentage}%` }}
                             transition={{ duration: 1, ease: "easeOut" }}
                             className="h-full bg-gradient-to-r from-[var(--primary-color)] to-blue-500"
                           />
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="pt-4">
               <a 
                 href={githubUrl} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-full py-7 bg-[var(--primary-color)] text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-5 hover:scale-[1.02] transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] group/btn"
               >
                 Explore Full Code DNA
                 <ExternalLink size={18} className="group-hover/btn:rotate-12 transition-transform" />
               </a>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default GithubStats;
