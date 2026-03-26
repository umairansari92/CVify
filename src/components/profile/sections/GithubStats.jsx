const GithubStats = React.memo(({ githubUrl, userSkills = [], data, loading }) => {
  const error = !data && !loading && githubUrl;

  // Extract username from URL: https://github.com/username
  const githubUsername = githubUrl?.split("github.com/")[1]?.split("/")[0];

  if (!githubUsername) return null;

  const Skeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
      <div className="space-y-8">
        <div className="h-4 w-32 bg-white/5 rounded-full" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-white/5 rounded-[2rem]" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="h-4 w-48 bg-white/5 rounded-full" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-white/5 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <section className="py-20 border-b border-[var(--card-border)] bg-[var(--bg-primary)]/10">
      <div className="max-w-7xl mx-auto px-6">
        <Skeleton />
      </div>
    </section>
  );

  if (error || !data) return (
    <section className="py-12 border-b border-[var(--card-border)] opacity-30 text-center italic text-sm">
      GitHub data unavailable right now.
    </section>
  );

  const { stats, languages } = data;

  return (
    <section id="github-snapshot" className="py-20 lg:py-32 border-b border-[var(--card-border)] bg-[var(--bg-primary)]/30 relative overflow-hidden group">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary-color)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* LEFT COLUMN: STATS & TECH */}
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20 rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-[var(--primary-color)] rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--primary-color)]">
                  My Tech Stack & GitHub Activity
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] uppercase tracking-tight mb-6">
                Technical <span className="text-[var(--primary-color)]">Snapshot</span>
              </h3>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed max-w-lg mb-8">
                Building real-world projects with modern technologies and clean architecture. Focused on scalable and production-ready applications.
              </p>
            </div>

            {/* Core Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-[2rem] bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--primary-color)]/30 transition-all group/card">
                <Star className="text-yellow-500 mb-3" size={20} />
                <div className="text-2xl font-black text-[var(--text-primary)] mb-1">{stats.stars}+</div>
                <div className="text-[8px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">
                  Stars across projects
                </div>
              </div>

              <div className="p-6 rounded-[2rem] bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--primary-color)]/30 transition-all group/card">
                <Package className="text-blue-500 mb-3" size={20} />
                <div className="text-2xl font-black text-[var(--text-primary)] mb-1">{stats.repos}+</div>
                <div className="text-[8px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">
                  Repos built & maintained
                </div>
              </div>

              {stats.isActive ? (
                <div className="p-6 rounded-[2rem] bg-[var(--card-bg)] border border-[var(--card-border)] border-orange-500/20 hover:border-orange-500/40 transition-all group/card">
                  <Activity className="text-orange-500 mb-3 animate-pulse" size={20} />
                  <div className="text-lg font-black text-[var(--text-primary)] mb-1 uppercase tracking-tighter">Active</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-orange-500/80">
                    Open-source contributor
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-[2rem] bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--primary-color)]/30 transition-all group/card">
                  <Users className="text-emerald-500 mb-3" size={20} />
                  <div className="text-2xl font-black text-[var(--text-primary)] mb-1">{stats.followers}+</div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">
                    Community Followers
                  </div>
                </div>
              )}
            </div>

            {/* Tech Tags from Profile */}
            {userSkills.length > 0 && (
              <div className="pt-8 border-t border-[var(--card-border)]">
                <div className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-6 opacity-40">Main Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {userSkills.slice(0, 10).map((skill, i) => (
                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold text-[var(--text-primary)]">
                      {skill.name || skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: LANGUAGES & CTA */}
          <div className="flex flex-col justify-center space-y-12">
            <div className="space-y-8">
              <div className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] mb-2 opacity-40">
                Most Used Technologies
              </div>
              <div className="space-y-6">
                {languages.map((lang, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">{lang.name}</span>
                      <span className="text-[10px] font-black text-[var(--primary-color)]">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-[var(--primary-color)] to-blue-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12">
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/btn inline-flex flex-col items-center gap-1"
              >
                <div className="px-10 py-5 bg-[var(--primary-color)] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl hover:shadow-[var(--primary-color)]/30 hover:-translate-y-1 flex items-center gap-4">
                  View My GitHub Profile
                  <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </div>
                <span className="text-[8px] font-bold uppercase tracking-widest opacity-30 mt-3 group-hover/btn:opacity-60 transition-opacity">
                  Explore code, projects, and contributions
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default GithubStats;
