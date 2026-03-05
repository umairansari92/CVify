import { useState, useEffect } from "react";
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
} from "react-icons/fa";
import { motion } from "framer-motion";

const PublicProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/auth/public/${username}`);
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Profile not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

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
    <div className="min-h-screen bg-foreground dark:bg-midnight transition-colors duration-500 pb-20">
      <Helmet>
        <title>{`${user.firstName} ${user.lastName} | CVify Portfolio`}</title>
        <meta name="description" content={user.headline || user.bio} />
        <meta
          property="og:title"
          content={`${user.firstName} ${user.lastName} - ${user.headline}`}
        />
        <meta property="og:image" content={user.profileImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero Section */}
      <header className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-action via-violet-600 to-indigo-800 animate-gradient">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-foreground dark:from-midnight to-transparent"></div>

        <div className="max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center md:items-end gap-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-110"></div>
              <img
                src={user.profileImage}
                alt={user.firstName}
                className="w-32 h-32 md:w-44 md:h-44 rounded-3xl object-cover object-top border-4 border-white shadow-2xl relative z-10"
              />
            </div>

            <div className="text-center md:text-left text-white flex-1 mb-2">
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter drop-shadow-lg">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-lg md:text-xl font-bold opacity-90 mt-2 max-w-2xl">
                {user.headline}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                {user.socialLinks?.linkedin && (
                  <a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    className="p-3 bg-white/15 hover:bg-white text-white hover:text-blue-600 rounded-xl transition-all backdrop-blur-md"
                  >
                    <FaLinkedin size={20} />
                  </a>
                )}
                {user.socialLinks?.github && (
                  <a
                    href={user.socialLinks.github}
                    target="_blank"
                    className="p-3 bg-white/15 hover:bg-white text-white hover:text-slate-900 rounded-xl transition-all backdrop-blur-md"
                  >
                    <FaGithub size={20} />
                  </a>
                )}
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-action rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95">
                  <FaDownload /> Download CV
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Col: Bio & Skills */}
        <div className="lg:col-span-4 space-y-10">
          <section className="animate-slideIn">
            <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
              About <span className="flex-1 h-px bg-border-subtle"></span>
            </h3>
            <p className="text-text-primary leading-relaxed font-medium whitespace-pre-wrap">
              {user.bio || "No professional bio provided yet."}
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
              Impact <span className="flex-1 h-px bg-border-subtle"></span>
            </h3>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-3xl border border-white/20 shadow-sm flex items-center gap-6">
              <div className="w-16 h-16 bg-action/10 rounded-2xl flex items-center justify-center text-action">
                <FaGem size={28} />
              </div>
              <div>
                <p className="text-2xl font-black text-text-primary">
                  {user.diamonds || "100"}
                </p>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">
                  Skill Diamonds Earned
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Col: Projects */}
        <div className="lg:col-span-8 space-y-12">
          {featuredProject && (
            <section>
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                Featured Work{" "}
                <span className="flex-1 h-px bg-primary/20"></span>
              </h3>
              <div className="group relative overflow-hidden rounded-[2.5rem] bg-midnight border-4 border-action/20 shadow-2xl hover:shadow-action/20 transition-all duration-500 h-[400px]">
                {featuredProject.thumbnail && (
                  <img
                    src={featuredProject.thumbnail}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700"
                    title={featuredProject.title}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-transparent p-10 flex flex-col justify-end">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredProject.techStack?.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-black bg-action text-white px-3 py-1 rounded-full uppercase tracking-tighter"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-4xl font-black text-white mb-4">
                    {featuredProject.title}
                  </h2>
                  <p className="text-white/80 text-lg font-medium mb-6 line-clamp-3">
                    {featuredProject.description}
                  </p>
                  <div className="flex gap-4">
                    {featuredProject.liveLink && (
                      <a
                        href={featuredProject.liveLink}
                        target="_blank"
                        className="px-6 py-2.5 bg-white text-midnight rounded-xl font-black text-sm flex items-center gap-2 hover:bg-action hover:text-white transition-colors"
                      >
                        Live Demo <FaGlobe />
                      </a>
                    )}
                    {featuredProject.githubLink && (
                      <a
                        href={featuredProject.githubLink}
                        target="_blank"
                        className="px-6 py-2.5 bg-white/10 text-white rounded-xl font-black text-sm flex items-center gap-2 backdrop-blur-md hover:bg-white/20 transition-colors"
                      >
                        GitHub <FaGithub />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          <section>
            <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
              Project Gallery{" "}
              <span className="flex-1 h-px bg-border-subtle"></span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((p) => (
                <div
                  key={p._id}
                  className="bg-white dark:bg-slate-800/30 rounded-3xl p-5 border border-white/20 hover:border-action/30 transition-all group overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden rounded-2xl mb-4">
                    {p.thumbnail ? (
                      <img
                        src={p.thumbnail}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        title={p.title}
                      />
                    ) : (
                      <div className="w-full h-full bg-foreground/50 flex items-center justify-center text-4xl">
                        🛠️
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      {p.liveLink && (
                        <a
                          href={p.liveLink}
                          target="_blank"
                          className="p-3 bg-white text-action rounded-full hover:scale-110 transition-all"
                        >
                          <FaGlobe />
                        </a>
                      )}
                      {p.githubLink && (
                        <a
                          href={p.githubLink}
                          target="_blank"
                          className="p-3 bg-white text-slate-900 rounded-full hover:scale-110 transition-all"
                        >
                          <FaGithub />
                        </a>
                      )}
                    </div>
                  </div>
                  <h4 className="font-black text-text-primary text-xl mb-1">
                    {p.title}
                  </h4>
                  <p className="text-[10px] font-black text-action uppercase tracking-widest mb-3 line-clamp-1">
                    {p.techStack?.join(", ")}
                  </p>
                  <p className="text-xs text-text-muted font-bold line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
            {otherProjects.length === 0 && !featuredProject && (
              <p className="text-center py-20 text-text-muted font-bold italic">
                This storyteller hasn't added projects yet.
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default PublicProfile;
