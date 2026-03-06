import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../api/axios";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaGlobe,
  FaDownload,
  FaGem,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const PublicProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await api.get(`/auth/public/${username}`);
      setUser(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Profile not found.");
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleTrackInteraction = async (type) => {
    try {
      await api.post("/auth/track-interaction", { username, type });
    } catch (err) {
      console.error("Interaction failed:", err);
    }
  };

  const ensureAbsoluteUrl = (url) => {
    if (!url || typeof url !== "string") return "";
    const trimmed = url.trim();
    if (!trimmed) return "";
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("mailto:") ||
      trimmed.startsWith("tel:")
    ) {
      return trimmed;
    }
    if (trimmed.startsWith("//")) return `https:${trimmed}`;
    return `https://${trimmed}`;
  };

  if (loading)
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-action border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error || !user)
    return (
      <div className="min-h-screen bg-midnight text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-6xl font-black mb-4">404</h1>
        <p className="text-xl text-text-muted mb-8">
          {error || "This profile is private or does not exist."}
        </p>
        <a
          href="/"
          className="px-8 py-3 bg-action rounded-2xl font-black uppercase text-sm"
        >
          Go Home
        </a>
      </div>
    );

  const featuredProject = user.projects?.find((p) => p.isFeatured);
  const otherProjects = user.projects?.filter((p) => !p.isFeatured) || [];
  const sectionNames = user.sectionNames || {
    experience: "Professional Experience",
    education: "Education History",
    skills: "Expertise & Skills",
    projects: "Key Accomplishments",
    services: "Professional Services",
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-midnight transition-colors duration-500 pb-40">
      <Helmet>
        <title>{`${user.firstName} ${user.lastName} | ${user.headline || "Unstoppable Professional"} | Portfolio on CVify`}</title>
        <meta
          name="description"
          content={`${user.firstName} ${user.lastName}'s professional portfolio. ${user.bio?.substring(0, 150)}... View experiences, skills, and projects.`}
        />
        <link rel="canonical" href={`https://cvify.pro/p/${username}`} />

        {/* OpenGraph */}
        <meta property="og:type" content="profile" />
        <meta
          property="og:title"
          content={`${user.firstName} ${user.lastName} | ${user.headline}`}
        />
        <meta property="og:description" content={user.bio?.substring(0, 160)} />
        <meta property="og:url" content={`https://cvify.pro/p/${username}`} />
        <meta
          property="og:image"
          content={user.profileImage || "/og-profile.png"}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${user.firstName} ${user.lastName} - Portfolio`}
        />
        <meta name="twitter:description" content={user.headline} />
        <meta name="twitter:image" content={user.profileImage} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: `${user.firstName} ${user.lastName}`,
            jobTitle: user.headline,
            description: user.bio,
            image: user.profileImage,
            url: `https://cvify.pro/p/${username}`,
            address: {
              "@type": "PostalAddress",
              addressLocality: user.location || "Pakistan",
            },
            sameAs: [
              user.socialLinks?.linkedin,
              user.socialLinks?.github,
              user.socialLinks?.twitter,
            ].filter(Boolean),
          })}
        </script>
      </Helmet>

      {/* Hero 2.0 */}
      <header className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-action via-violet-600 to-indigo-900 animate-gradient opacity-95">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center lg:items-start lg:flex-row gap-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-[2.5rem] overflow-hidden border-4 border-white/20 shadow-2xl relative z-10">
                <img
                  src={user.profileImage}
                  alt={user.firstName}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-midnight p-3 rounded-2xl shadow-xl flex items-center gap-2 border border-border-subtle z-20">
                <FaMapMarkerAlt className="text-action" />
                <span className="text-xs font-black text-text-primary">
                  {user.location || "Available Remote"}
                </span>
              </div>
            </motion.div>

            <div className="text-center lg:text-left text-white flex-1">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-6xl font-black tracking-tight"
              >
                {user.firstName} {user.lastName}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl font-bold opacity-90 mt-3 max-w-3xl"
              >
                {user.headline || "Professional Member"}
              </motion.p>

              {user.phoneNumber && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center lg:justify-start gap-4 mt-6"
                >
                  <a
                    href={`https://wa.me/${user.phoneNumber.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleTrackInteraction("contact")}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl transition-all group"
                  >
                    <FaWhatsapp className="text-green-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-black text-white">
                      {user.phoneNumber}
                    </span>
                  </a>
                  <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-white/50">
                    Available on WhatsApp
                  </span>
                </motion.div>
              )}

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">
                {user.socialLinks?.linkedin && (
                  <a
                    href={ensureAbsoluteUrl(user.socialLinks.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/10 hover:bg-white text-white hover:text-blue-600 rounded-2xl transition-all backdrop-blur-md border border-white/10"
                    onClick={() => handleTrackInteraction("contact")}
                  >
                    <FaLinkedin size={22} />
                  </a>
                )}
                {user.socialLinks?.github && (
                  <a
                    href={ensureAbsoluteUrl(user.socialLinks.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl transition-all backdrop-blur-md border border-white/10"
                    onClick={() => handleTrackInteraction("contact")}
                  >
                    <FaGithub size={22} />
                  </a>
                )}
                {user.socialLinks?.twitter && (
                  <a
                    href={ensureAbsoluteUrl(user.socialLinks.twitter)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/10 hover:bg-white text-white hover:text-blue-400 rounded-2xl transition-all backdrop-blur-md border border-white/10"
                    onClick={() => handleTrackInteraction("contact")}
                  >
                    <FaTwitter size={22} />
                  </a>
                )}
                {user.socialLinks?.portfolio && (
                  <a
                    href={ensureAbsoluteUrl(user.socialLinks.portfolio)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/10 hover:bg-white text-white hover:text-action rounded-2xl transition-all backdrop-blur-md border border-white/10"
                    onClick={() => handleTrackInteraction("contact")}
                    title="Portfolio"
                  >
                    <FaGlobe size={22} />
                  </a>
                )}
                {user.email && (
                  <a
                    href={`mailto:${user.email}?subject=${encodeURIComponent("Professional Inquiry")}`}
                    className="p-4 bg-white/10 hover:bg-white text-white hover:text-red-500 rounded-2xl transition-all backdrop-blur-md border border-white/10"
                    onClick={() => handleTrackInteraction("contact")}
                    title="Email Me"
                  >
                    <FaEnvelope size={22} />
                  </a>
                )}
                {user.phoneNumber && (
                  <a
                    href={`tel:${user.phoneNumber}`}
                    className="p-4 bg-white/10 hover:bg-white text-white hover:text-green-500 rounded-2xl transition-all backdrop-blur-md border border-white/10"
                    onClick={() => handleTrackInteraction("contact")}
                    title="Call Me"
                  >
                    <FaBriefcase size={22} />
                  </a>
                )}
                <button
                  onClick={() => {
                    handleTrackInteraction("contact");
                    // Dynamic Download logic would go here
                    alert("Preparing Resume for Download...");
                  }}
                  className="px-8 py-4 bg-white text-action rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-3"
                >
                  <FaDownload /> Get Professional Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (Bio & Experience) */}
          <div className="lg:col-span-8 space-y-10">
            {/* About Section */}
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="bg-white dark:bg-slate-800/80 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-white/50 dark:border-white/10"
            >
              <h3 className="text-sm font-black text-text-muted uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                Professional Overview{" "}
                <span className="flex-1 h-px bg-border-subtle"></span>
              </h3>
              <p className="text-text-primary text-lg leading-relaxed font-medium whitespace-pre-wrap">
                {user.bio ||
                  "Crafting excellence and delivering results in my field."}
              </p>
            </motion.section>

            {/* Experience Timeline */}
            <section className="space-y-6">
              <h3 className="text-sm font-black text-text-muted uppercase tracking-[0.3em] flex items-center gap-4">
                {sectionNames.experience}{" "}
                <span className="flex-1 h-px bg-border-subtle"></span>
              </h3>
              <div className="space-y-12 relative before:absolute before:left-0 md:before:left-0 before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-action before:via-violet-500 before:to-indigo-500 before:rounded-full ml-4">
                {(user.experience || []).map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="relative pl-10"
                  >
                    <div className="absolute left-[-22px] top-1 w-10 h-10 rounded-2xl bg-white dark:bg-midnight border-4 border-action z-10 flex items-center justify-center shadow-lg shadow-action/20">
                      <FaBriefcase className="text-action text-xs" />
                    </div>

                    <div className="bg-white dark:bg-slate-800/40 p-8 rounded-[2rem] border border-border-subtle shadow-xl hover:shadow-action/5 transition-all group overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-action/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-action/10 transition-colors"></div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 relative z-10">
                        <div>
                          <h4 className="text-2xl font-black text-text-primary group-hover:text-action transition-colors">
                            {exp.role}
                          </h4>
                          <p className="text-violet-500 font-black text-lg">
                            {exp.company}
                          </p>
                        </div>
                        <div className="text-left md:text-right">
                          <span className="px-4 py-1.5 bg-foreground/5 rounded-full text-[10px] font-black uppercase tracking-widest text-text-muted border border-border-subtle">
                            {exp.startDate} —{" "}
                            {exp.isCurrent ? "Present" : exp.endDate}
                          </span>
                        </div>
                      </div>

                      <p className="text-base font-medium text-text-muted leading-relaxed whitespace-pre-wrap relative z-10">
                        {exp.achievements}
                      </p>

                      {exp.tools && exp.tools.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6 relative z-10">
                          {exp.tools.map((tool) => (
                            <span
                              key={tool}
                              className="text-[10px] font-black bg-action/10 text-action px-3 py-1.5 rounded-xl uppercase tracking-wider border border-action/10"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Skills & Stats) */}
          <div className="lg:col-span-4 space-y-10">
            {/* Community Impact & Analytics Widget */}
            <section className="bg-white dark:bg-slate-800/80 p-8 rounded-[2.5rem] border border-border-subtle shadow-xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-action/5 rounded-full blur-3xl group-hover:bg-action/10 transition-colors"></div>

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">
                  Community Impact
                </h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full border border-blue-500/20">
                  <FaGem size={12} className="animate-pulse" />
                  <span className="text-[10px] font-black uppercase">
                    Skill Diamonds Badge
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-foreground/5 dark:bg-midnight/30 rounded-3xl border border-border-subtle hover:border-action/30 transition-all text-center">
                  <p className="text-3xl font-black text-text-primary">
                    {user.stats?.profileViews || 0}
                  </p>
                  <p className="text-[9px] font-bold uppercase text-text-muted mt-1 tracking-widest">
                    Profile Views
                  </p>
                </div>
                <div className="p-6 bg-foreground/5 dark:bg-midnight/30 rounded-3xl border border-border-subtle hover:border-action/30 transition-all text-center">
                  <p className="text-3xl font-black text-text-primary">
                    {user.stats?.contactClicks || 0}
                  </p>
                  <p className="text-[9px] font-bold uppercase text-text-muted mt-1 tracking-widest">
                    Recruiter Interests
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-action/5 rounded-2xl border border-action/10 text-center">
                <p className="text-[10px] font-medium text-action flex items-center justify-center gap-2">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-action opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-action"></span>
                  </span>
                  Currently trending in {user.headline || "your industry"}
                </p>
              </div>
            </section>

            {/* Hybrid Skill Cloud */}
            <section className="bg-white dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-border-subtle shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-text-muted">
                {sectionNames.skills}
              </h3>

              <div className="space-y-8">
                <div>
                  <label className="text-[9px] font-black uppercase text-action mb-4 block">
                    Core Competencies
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {user.skills?.technical?.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-action/5 text-action rounded-xl text-xs font-black border border-action/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase text-violet-500 mb-4 block">
                    Professional Services
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {user.skills?.professional?.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-violet-500/5 text-violet-600 rounded-xl text-xs font-black border border-violet-500/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Education Timeline */}
            <section className="bg-white dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-border-subtle shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-text-muted flex items-center gap-3">
                {sectionNames.education}
                <span className="flex-1 h-px bg-border-subtle"></span>
              </h3>
              <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-orange-500/20">
                {(user.education || []).map((edu, i) => (
                  <div key={i} className="relative pl-12">
                    <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 z-10">
                      <FaGraduationCap size={18} />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-text-primary leading-tight">
                        {edu.degree}
                      </h4>
                      <p className="text-sm font-bold text-text-muted mt-1">
                        {edu.institution}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-black text-orange-600 bg-orange-500/5 px-2 py-0.5 rounded-lg border border-orange-500/10 uppercase tracking-tighter">
                          {edu.graduationDate}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Languages Card */}
            {user.languages && user.languages.length > 0 && (
              <section className="bg-white dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-border-subtle shadow-xl hover:shadow-action/10 transition-all">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-text-muted">
                  {sectionNames.languages || "Languages"}
                </h3>
                <div className="space-y-4">
                  {user.languages.map((lang, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-foreground/5 dark:bg-midnight/30 rounded-2xl border border-border-subtle group hover:border-action/30 transition-all"
                    >
                      <div>
                        <h4 className="text-sm font-black text-text-primary">
                          {lang.name}
                        </h4>
                        <div className="flex gap-1 mt-1">
                          {[1, 2, 3, 4].map((step) => {
                            const levels = [
                              "Beginner",
                              "Professional",
                              "Advanced",
                              "Native",
                            ];
                            const currentLevelIdx = levels.indexOf(
                              lang.proficiency,
                            );
                            const isActive = step <= currentLevelIdx + 1;
                            return (
                              <div
                                key={step}
                                className={`h-1 w-6 rounded-full transition-all duration-500 ${isActive ? "bg-action" : "bg-foreground/10"}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <span className="text-[8px] font-black bg-action/10 text-action px-2 py-1 rounded-lg uppercase tracking-widest border border-action/20">
                        {lang.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Projects Section 2.0 */}
        <div className="mt-20 space-y-10">
          <h3 className="text-sm font-black text-text-muted uppercase tracking-[0.3em] flex items-center gap-4">
            {sectionNames.projects}{" "}
            <span className="flex-1 h-px bg-border-subtle"></span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {user.projects?.map((proj, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group bg-white dark:bg-slate-800/50 rounded-[2rem] overflow-hidden border border-border-subtle shadow-xl"
              >
                <div className="h-52 relative overflow-hidden">
                  <img
                    src={
                      proj.thumbnail ||
                      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
                    }
                    alt={proj.title || "Project Snapshot"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent p-6 flex flex-col justify-end">
                    <div className="flex flex-wrap gap-2">
                      {proj.techStack?.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[8px] font-black bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded-lg border border-white/10 uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-black text-text-primary mb-2 line-clamp-1">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-text-muted font-medium line-clamp-2 leading-relaxed mb-6">
                    {proj.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      {proj.liveLink && (
                        <a
                          href={ensureAbsoluteUrl(proj.liveLink)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-action hover:scale-110 transition-transform"
                        >
                          <FaGlobe size={18} />
                        </a>
                      )}
                      {proj.githubLink && (
                        <a
                          href={ensureAbsoluteUrl(proj.githubLink)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-primary hover:scale-110 transition-transform"
                        >
                          <FaGithub size={18} />
                        </a>
                      )}
                    </div>
                    {proj.isFeatured && (
                      <span className="text-[8px] bg-amber-500 text-white px-3 py-1 rounded-full font-black uppercase">
                        Starred
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Recruiter Sticky Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-white/80 dark:bg-midnight/80 backdrop-blur-2xl border-2 border-white/20 dark:border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] px-4 py-3 md:px-8 md:py-4 flex items-center gap-4 md:gap-8 w-full max-w-2xl pointer-events-auto"
        >
          {/* Quick Stats (Mobile Hide) */}
          <div className="hidden md:flex flex-col border-right pr-8 border-border-subtle">
            <span className="text-[9px] font-black text-text-muted uppercase tracking-tighter">
              Active Status
            </span>
            <span className="text-xs font-black text-action flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Open to Hire
            </span>
          </div>

          <div className="flex items-center gap-3 flex-1">
            {user.phoneNumber && (
              <a
                href={`https://wa.me/${user.phoneNumber.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleTrackInteraction("contact")}
                className="p-4 bg-[#25D366] text-white rounded-2xl hover:bg-[#20ba5c] transition-all hover:-translate-y-1 shadow-lg shadow-green-500/20"
                title="WhatsApp Candidate"
              >
                <FaWhatsapp size={20} />
              </a>
            )}
            {user.email && (
              <a
                href={`mailto:${user.email}?subject=${encodeURIComponent(`Hiring Inquiry: ${user.firstName} ${user.lastName}`)}&body=${encodeURIComponent(`Hello ${user.firstName},\n\nI viewed your professional portfolio on CVify and I am interested in discussing a potential opportunity with you.\n\nBest regards.`)}`}
                onClick={() => handleTrackInteraction("contact")}
                className="flex-1 px-6 py-4 bg-action text-white rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:bg-blue-600 transition-all hover:-translate-y-1 shadow-lg shadow-action/20 text-center relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                Hire {user.firstName} Now
              </a>
            )}
          </div>

          {/* Social Icons (Mobile Hide) */}
          <div className="hidden sm:flex items-center gap-4">
            {user.socialLinks?.linkedin && (
              <a
                href={ensureAbsoluteUrl(user.socialLinks.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-blue-600 transition-colors"
                onClick={() => handleTrackInteraction("contact")}
                title="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            )}
            {user.socialLinks?.github && (
              <a
                href={ensureAbsoluteUrl(user.socialLinks.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-black dark:hover:text-white transition-colors"
                onClick={() => handleTrackInteraction("contact")}
                title="GitHub"
              >
                <FaGithub size={20} />
              </a>
            )}
            {user.socialLinks?.twitter && (
              <a
                href={ensureAbsoluteUrl(user.socialLinks.twitter)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-blue-400 transition-colors"
                onClick={() => handleTrackInteraction("contact")}
                title="Twitter / X"
              >
                <FaTwitter size={20} />
              </a>
            )}
            {user.socialLinks?.portfolio && (
              <a
                href={ensureAbsoluteUrl(user.socialLinks.portfolio)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-action transition-colors"
                onClick={() => handleTrackInteraction("contact")}
                title="Personal Portfolio"
              >
                <FaGlobe size={20} />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PublicProfile;
