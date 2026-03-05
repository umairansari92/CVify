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

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-midnight transition-colors duration-500 pb-32">
      <Helmet>
        <title>{`${user.firstName} ${user.lastName} | ${user.headline || "Portfolio"}`}</title>
        <meta name="description" content={user.bio?.substring(0, 160)} />
        <meta
          property="og:title"
          content={`${user.firstName} ${user.lastName} - ${user.headline}`}
        />
        <meta property="og:image" content={user.profileImage} />
        <meta name="twitter:card" content="summary_large_image" />
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
                {user.headline || "Full Stack Developer"}
              </motion.p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">
                {user.socialLinks?.linkedin && (
                  <a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    className="p-4 bg-white/10 hover:bg-white text-white hover:text-blue-600 rounded-2xl transition-all backdrop-blur-md border border-white/10"
                  >
                    <FaLinkedin size={22} />
                  </a>
                )}
                {user.socialLinks?.github && (
                  <a
                    href={user.socialLinks.github}
                    target="_blank"
                    className="p-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl transition-all backdrop-blur-md border border-white/10"
                  >
                    <FaGithub size={22} />
                  </a>
                )}
                <button
                  onClick={() => {
                    handleTrackInteraction("contact");
                    window.location.href = `mailto:${user.email}`;
                  }}
                  className="px-8 py-4 bg-white text-action rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-3"
                >
                  <FaDownload /> Download Resume
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
                Professional Story{" "}
                <span className="flex-1 h-px bg-border-subtle"></span>
              </h3>
              <p className="text-text-primary text-lg leading-relaxed font-medium whitespace-pre-wrap">
                {user.bio ||
                  "Crafting digital experiences and solving complex problems."}
              </p>
            </motion.section>

            {/* Experience Timeline */}
            <section className="space-y-6">
              <h3 className="text-sm font-black text-text-muted uppercase tracking-[0.3em] flex items-center gap-4">
                Career Timeline{" "}
                <span className="flex-1 h-px bg-border-subtle"></span>
              </h3>
              <div className="space-y-8 relative before:absolute before:left-4 md:before:left-1/2 before:top-4 before:bottom-4 before:w-1 before:bg-action/20 before:-translate-x-1/2">
                {(user.experience || []).map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${idx % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                  >
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-midnight border-4 border-action z-10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-action animate-ping"></div>
                    </div>

                    <div
                      className={`${idx % 2 === 0 ? "md:text-right md:pr-12 ml-10 md:ml-0" : "md:order-last md:pl-12 ml-10 md:ml-0"}`}
                    >
                      <h4 className="text-2xl font-black text-text-primary">
                        {exp.role}
                      </h4>
                      <p className="text-action font-black text-lg">
                        {exp.company}
                      </p>
                      <p className="text-text-muted font-bold text-sm mt-1">
                        {exp.startDate} —{" "}
                        {exp.isCurrent ? "Present" : exp.endDate}
                      </p>
                    </div>

                    <div
                      className={`bg-white dark:bg-midnight/40 p-6 rounded-3xl border border-border-subtle shadow-lg hover:shadow-action/10 transition-all ${idx % 2 === 0 ? "md:pl-12 ml-10 md:ml-0" : "md:pr-12 ml-10 md:ml-0 md:text-right"}`}
                    >
                      <p className="text-sm font-medium text-text-muted leading-relaxed whitespace-pre-wrap">
                        {exp.achievements}
                      </p>
                      <div
                        className={`flex flex-wrap gap-2 mt-4 ${idx % 2 === 0 ? "" : "md:justify-end"}`}
                      >
                        {exp.tools?.map((tool) => (
                          <span
                            key={tool}
                            className="text-[9px] font-black bg-foreground/10 px-2 py-1 rounded-lg uppercase"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Skills & Stats) */}
          <div className="lg:col-span-4 space-y-10">
            {/* Impact Widget */}
            <section className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                <FaGem size={100} />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-80">
                Community Impact
              </h3>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <FaGem size={28} />
                </div>
                <div>
                  <p className="text-4xl font-black">{user.diamonds || 100}</p>
                  <p className="text-[10px] font-bold uppercase opacity-70">
                    Diamonds Earned
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xl font-black">
                    {user.stats?.profileViews || 0}
                  </p>
                  <p className="text-[8px] font-bold uppercase opacity-60 italic">
                    Profile Views
                  </p>
                </div>
                <div>
                  <p className="text-xl font-black">
                    {user.stats?.contactClicks || 0}
                  </p>
                  <p className="text-[8px] font-bold uppercase opacity-60 italic">
                    Interests
                  </p>
                </div>
              </div>
            </section>

            {/* Hybrid Skill Cloud */}
            <section className="bg-white dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-border-subtle shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-text-muted">
                Expertise
              </h3>

              <div className="space-y-8">
                <div>
                  <label className="text-[9px] font-black uppercase text-action mb-4 block">
                    Development & Technical
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

            {/* Education Card */}
            <section className="bg-white dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-border-subtle shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-text-muted">
                Education
              </h3>
              <div className="space-y-6">
                {(user.education || []).map((edu, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                      <FaGraduationCap size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-text-primary leading-tight">
                        {edu.degree}
                      </h4>
                      <p className="text-[11px] font-bold text-text-muted">
                        {edu.institution}
                      </p>
                      <p className="text-[9px] font-black text-action uppercase mt-1">
                        {edu.graduationDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Projects Section 2.0 */}
        <div className="mt-20 space-y-10">
          <h3 className="text-sm font-black text-text-muted uppercase tracking-[0.3em] flex items-center gap-4">
            Featured Projects{" "}
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
                          href={proj.liveLink}
                          target="_blank"
                          className="text-action hover:scale-110 transition-transform"
                        >
                          <FaGlobe size={18} />
                        </a>
                      )}
                      {proj.githubLink && (
                        <a
                          href={proj.githubLink}
                          target="_blank"
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

      {/* Floating Contact Row */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
        <div className="bg-white/80 dark:bg-midnight/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-4 pl-4">
            <div className="w-10 h-10 rounded-full bg-action/10 flex items-center justify-center text-action">
              <FaBriefcase />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-action">
                Hire now
              </p>
              <p className="text-xs font-bold text-text-primary">
                Interest tracking active
              </p>
            </div>
          </div>

          <div className="flex-1 flex justify-end gap-3">
            <button
              onClick={() => {
                handleTrackInteraction("contact");
                window.open(
                  `https://wa.me/?text=Hi ${user.firstName}, I saw your profile on CVify and I'm interested in your services!`,
                  "_blank",
                );
              }}
              className="p-4 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-colors shadow-lg"
            >
              <FaWhatsapp size={20} />
            </button>
            <button
              onClick={() => {
                handleTrackInteraction("contact");
                window.location.href = `mailto:${user.email}`;
              }}
              className="px-8 py-4 bg-action text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg hover:bg-indigo-600 transition-colors"
            >
              <FaEnvelope /> Hire {user.firstName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
