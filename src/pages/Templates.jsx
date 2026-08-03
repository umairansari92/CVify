import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ResumePreview from "../components/ResumePreview";
import { FaEye, FaTimes, FaHeart, FaRegHeart, FaCheck, FaBalanceScale, FaMagic, FaSearch } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { initResumeWithData } from "../features/resume/resumeSlice";

// ─── Dummy Sample Data ─────────────────────────────────────────────────────────
const dummyResume = {
  personalInfo: {
    fullName: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 012-3456",
    location: "San Francisco, CA",
    jobTitle: "Senior Full Stack Engineer",
    linkedin: "https://linkedin.com/in/alexrivera",
    github: "https://github.com/arivera-dev",
    portfolio: "https://alexrivera.dev",
    profileSummary:
      "Innovative Senior Full Stack Engineer with 8+ years of experience designing scalable web applications. Expert in React, Node.js, and cloud architecture (AWS/GCP). Proven track record leading cross-functional teams to deliver high-impact products.",
  },
  experience: [
    {
      company: "TechNexus Solutions",
      position: "Lead Software Architect",
      startDate: "Jan 2021",
      endDate: "Present",
      responsibilities: [
        "Architected a microservices-based e-commerce platform handling 1M+ daily active users.",
        "Reduced system latency by 35% through Redis caching and PostgreSQL optimization.",
        "Mentored a team of 15 engineers, establishing best practices for code reviews and testing.",
        "Spearheaded the migration from monolithic to serverless architecture using AWS Lambda.",
      ],
    },
    {
      company: "CloudCore Systems",
      position: "Senior Frontend Developer",
      startDate: "Jun 2017",
      endDate: "Dec 2020",
      responsibilities: [
        "Led the frontend overhaul of the main customer portal using React and TypeScript.",
        "Implemented real-time data visualization dashboards with D3.js and WebSockets.",
        "Collaborated with UI/UX designers to build a comprehensive design system (Storybook).",
        "Improved web performance scores by 25 points through lazy loading and image optimization.",
      ],
    },
  ],
  education: [
    { institution: "Stanford University", degree: "M.S. in Computer Science", startDate: "2015", endDate: "2017" },
    { institution: "UC Berkeley", degree: "B.S. in Software Engineering", startDate: "2011", endDate: "2015" },
  ],
  technicalSkills: {
    technical: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "GraphQL"],
    backend: ["Node.js", "Python (Django)", "Go", "gRPC", "RESTful APIs"],
    database: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"],
    aiDevOps: ["Docker", "Kubernetes", "AWS", "CI/CD (GitHub Actions)", "TensorFlow"],
    tools: ["Git", "Jira", "Figma", "Postman", "Sentry"],
  },
  projects: [
    {
      name: "LifeSync Hub (Productivity App)",
      link: "https://github.com/arivera-dev/lifesync",
      description: [
        "Built a full-stack productivity app with real-time sync across devices.",
        "Implemented a custom Gantt chart component for project management.",
        "Integrated Google Calendar and Slack APIs for seamless workflow integration.",
      ],
    },
    {
      name: "CryptoPulse Analytics",
      link: "https://cryptopulse.live",
      description: [
        "Developed a real-time cryptocurrency tracking platform using WebSocket streams.",
        "Created complex charting libraries to visualize market sentiment.",
        "Deployed a highly reactive interface supporting 500+ coins concurrently.",
      ],
    },
  ],
  competencies: ["System Architecture", "Agile Methodology", "Test-Driven Development (TDD)", "Cloud Computing", "Team Leadership"],
  softwareProficiency: ["Visual Studio Code", "AWS Management Console", "Docker Desktop", "MongoDB Atlas", "Tableau"],
};

// ─── Template Registry ─────────────────────────────────────────────────────────
const TEMPLATES = [
  {
    id: "modern",
    name: "Modern Tech",
    layout: "Single Column",
    category: "tech",
    tags: ["ATS Friendly", "AI Optimized"],
    bestFor: ["Software Engineers", "Tech Leads", "Startups"],
    description: "Clean, modern layout with strong typography hierarchy. Built for technical roles.",
    aiMatchRoles: ["engineer", "developer", "fullstack", "backend", "frontend"],
  },
  {
    id: "professional",
    name: "Professional",
    layout: "Single Column",
    category: "ats",
    tags: ["ATS Friendly", "Recruiter Preferred"],
    bestFor: ["All Industries", "Career Changers", "General Use"],
    description: "Balanced, timeless design trusted by recruiters across all sectors.",
    aiMatchRoles: ["manager", "analyst", "consultant", "general"],
  },
  {
    id: "technical",
    name: "Technical Focus",
    layout: "Two Column",
    category: "tech",
    tags: ["AI Optimized", "Skills Focused"],
    bestFor: ["DevOps", "Data Engineers", "System Architects"],
    description: "Two-column format with dedicated skills sidebar — ideal for deep technical profiles.",
    aiMatchRoles: ["devops", "data", "architect", "technical"],
  },
  {
    id: "executive",
    name: "Executive Tier",
    layout: "Single Column",
    category: "executive",
    tags: ["Recruiter Preferred", "Leadership Focus"],
    bestFor: ["C-Suite", "Directors", "Senior Management"],
    description: "Authoritative, high-impact layout designed for senior-level leadership profiles.",
    aiMatchRoles: ["director", "cto", "vp", "ceo", "head", "lead"],
  },
  {
    id: "minimal",
    name: "Minimalist",
    layout: "Single Column",
    category: "minimal",
    tags: ["ATS Friendly", "Clean Design"],
    bestFor: ["Designers", "Researchers", "Academics"],
    description: "Whitespace-driven minimalism — lets your experience speak for itself.",
    aiMatchRoles: ["designer", "researcher", "academic", "writer"],
  },
  {
    id: "traditional",
    name: "Traditional",
    layout: "Single Column",
    category: "ats",
    tags: ["ATS Friendly", "Government Ready"],
    bestFor: ["Government Roles", "Banking", "Legal"],
    description: "Classic formal layout optimized for traditional institutions and compliance environments.",
    aiMatchRoles: ["government", "banking", "legal", "finance"],
  },
  {
    id: "classic",
    name: "Classic Style",
    layout: "Single Column",
    category: "minimal",
    tags: ["ATS Friendly", "Time-Tested"],
    bestFor: ["All Experience Levels", "Corporate", "Education"],
    description: "Proven structure used by millions. Reliable and professionally trusted globally.",
    aiMatchRoles: ["teacher", "corporate", "education", "hr"],
  },
  {
    id: "bold",
    name: "Bold Impact",
    layout: "Two Column",
    category: "creative",
    tags: ["Visually Distinct", "Brand-Forward"],
    bestFor: ["Product Managers", "Growth Marketers", "Founders"],
    description: "High-contrast design with strong visual hierarchy for roles that demand bold presence.",
    aiMatchRoles: ["product", "marketing", "founder", "growth"],
  },
  {
    id: "elegant",
    name: "Elegant Style",
    layout: "Single Column",
    category: "minimal",
    tags: ["Recruiter Preferred", "Sophisticated"],
    bestFor: ["Finance", "Consulting", "Legal"],
    description: "Sophisticated typographic treatment with refined spacing — built for prestige sectors.",
    aiMatchRoles: ["finance", "consulting", "legal", "accountant"],
  },
  {
    id: "clear",
    name: "Clear Layout",
    layout: "Two Column",
    category: "tech",
    tags: ["AI Optimized", "Skills Focused"],
    bestFor: ["Data Scientists", "ML Engineers", "QA Engineers"],
    description: "Dual-panel layout with smart skills grouping for data and ML-heavy profiles.",
    aiMatchRoles: ["data scientist", "ml", "qa", "testing"],
  },
  {
    id: "global",
    name: "Global Minimalist",
    layout: "Single Column",
    category: "minimal",
    tags: ["International Friendly", "ATS Friendly"],
    bestFor: ["UAE Market", "Europe", "Remote Roles"],
    description: "Locale-neutral design compatible with international ATS systems and hiring pipelines.",
    aiMatchRoles: ["remote", "international", "uae", "europe"],
  },
  {
    id: "elite",
    name: "Corporate Elite",
    layout: "Two Column",
    category: "executive",
    tags: ["Leadership Focus", "Recruiter Preferred"],
    bestFor: ["Big 4", "Fortune 500", "Investment Banking"],
    description: "Premium corporate layout engineered for elite-tier recruitment pipelines.",
    aiMatchRoles: ["investment", "banking", "big4", "fortune500", "corporate"],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Templates" },
  { id: "ats", label: "ATS Friendly" },
  { id: "tech", label: "Modern Tech" },
  { id: "executive", label: "Executive" },
  { id: "minimal", label: "Minimalist" },
  { id: "creative", label: "Creative" },
];

// ─── AI Match Engine (client-side heuristic) ──────────────────────────────────
function getAIRecommendation(user, resumes) {
  const jobTitle = (user?.jobTitle || resumes?.[0]?.personalInfo?.jobTitle || "").toLowerCase();
  const expCount = resumes?.[0]?.experience?.length || 0;

  let best = TEMPLATES[0];
  let matchReason = "Versatile layout for your current profile.";
  let matchScore = 72;

  for (const tpl of TEMPLATES) {
    const hit = tpl.aiMatchRoles.some((role) => jobTitle.includes(role));
    if (hit) {
      best = tpl;
      const level = expCount >= 5 ? "Senior" : expCount >= 2 ? "Mid-level" : "Fresher";
      matchReason = `Optimized for ${level} ${jobTitle || "Professional"} — matches your experience density.`;
      matchScore = 88 + Math.floor(Math.random() * 8);
      break;
    }
  }

  return { template: best, reason: matchReason, score: matchScore };
}

// ─── Tag Badge ────────────────────────────────────────────────────────────────
const Badge = ({ label }) => {
  const colorMap = {
    "ATS Friendly": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    "AI Optimized": "bg-violet-500/15 text-violet-400 border-violet-500/30",
    "Recruiter Preferred": "bg-sky-500/15 text-sky-400 border-sky-500/30",
    "Skills Focused": "bg-amber-500/15 text-amber-400 border-amber-500/30",
    "Leadership Focus": "bg-rose-500/15 text-rose-400 border-rose-500/30",
    default: "bg-white/8 text-text-muted border-white/10",
  };
  const cls = colorMap[label] || colorMap.default;
  return (
    <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${cls}`}>
      {label}
    </span>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Templates = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((s) => s.auth);
  const { resumes, currentResume } = useSelector((s) => s.resume);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cv_fav_templates") || "[]"); }
    catch { return []; }
  });
  const [compareList, setCompareList] = useState([]);
  const [compareMode, setCompareMode] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // AI Recommendation (memoized — never recomputes on search/filter)
  const aiRec = useMemo(() => getAIRecommendation(user, resumes), [user, resumes]);

  // Currently active template id from last edited resume
  const activeTemplateId = currentResume?.templateId || resumes?.[0]?.templateId || null;

  // Filtered templates
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return TEMPLATES.filter((tpl) => {
      const matchCat = category === "all" || tpl.category === category;
      const matchSearch = !q || tpl.name.toLowerCase().includes(q) || tpl.bestFor.some((b) => b.toLowerCase().includes(q)) || tpl.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [search, category]);

  // Handlers
  const handleUseTemplate = useCallback((templateId) => {
    dispatch(initResumeWithData({ data: dummyResume, templateId }));
    navigate("/create");
  }, [dispatch, navigate]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem("cv_fav_templates", JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleCompare = useCallback((id) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  }, []);

  const compareTemplates = useMemo(() => TEMPLATES.filter((t) => compareList.includes(t.id)), [compareList]);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      {/* ── Page Header ── */}
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-black text-text-primary tracking-tight">
          Resume Templates
        </h1>
        <p className="mt-1 text-sm text-text-muted font-medium opacity-70">
          Professionally engineered templates optimized for ATS, recruiters, and AI screening systems.
        </p>
      </header>

      {/* ── AI Recommendation Banner ── */}
      <div className="mb-8 relative overflow-hidden rounded-2xl border border-violet-500/25 bg-gradient-to-r from-violet-500/10 via-violet-500/5 to-transparent p-5 flex items-center gap-5">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
          <FaMagic size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-0.5">
            AI Recommended For You · {aiRec.score}% Match
          </p>
          <p className="text-text-primary font-bold text-sm truncate">
            {aiRec.template.name}
          </p>
          <p className="text-text-muted text-xs mt-0.5 leading-relaxed line-clamp-1">
            {aiRec.reason}
          </p>
        </div>
        <button
          onClick={() => handleUseTemplate(aiRec.template.id)}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all duration-200 shadow-lg shadow-violet-900/30"
        >
          Use This <FiArrowRight size={12} />
        </button>
      </div>

      {/* ── Recently Used Banner ── */}
      {activeTemplateId && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-secondary border border-border-subtle">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <p className="text-xs text-text-muted font-medium">
            Currently editing with{" "}
            <span className="text-text-primary font-bold">
              {TEMPLATES.find((t) => t.id === activeTemplateId)?.name || activeTemplateId}
            </span>
          </p>
          <button
            onClick={() => navigate("/create")}
            className="ml-auto text-xs text-primary font-bold hover:underline flex items-center gap-1"
          >
            Continue Editing <FiArrowRight size={10} />
          </button>
        </div>
      )}

      {/* ── Search + Compare Bar ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" size={12} />
          <input
            type="text"
            placeholder="Search by name, role, or industry…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-bg-secondary border border-border-subtle text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
        {compareList.length > 0 && (
          <button
            onClick={() => setCompareMode(true)}
            disabled={compareList.length < 2}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              compareList.length >= 2
                ? "bg-primary text-white border-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                : "bg-bg-secondary text-text-muted border-border-subtle cursor-not-allowed"
            }`}
          >
            <FaBalanceScale size={12} />
            Compare ({compareList.length}/2)
          </button>
        )}
      </div>

      {/* ── Category Filters ── */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 ${
              category === cat.id
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                : "bg-bg-secondary text-text-muted border-border-subtle hover:border-primary/40 hover:text-text-primary"
            }`}
          >
            {cat.label}
            {cat.id === "all" && (
              <span className="ml-1.5 opacity-60">{TEMPLATES.length}</span>
            )}
          </button>
        ))}
        {favorites.length > 0 && (
          <button
            onClick={() => setCategory(category === "favorites" ? "all" : "favorites")}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 flex items-center gap-1.5 ${
              category === "favorites"
                ? "bg-rose-500 text-white border-rose-500"
                : "bg-bg-secondary text-rose-400 border-rose-500/30 hover:border-rose-500/60"
            }`}
          >
            <FaHeart size={9} /> Favorites ({favorites.length})
          </button>
        )}
      </div>

      {/* ── Template Grid ── */}
      {(() => {
        const list = category === "favorites"
          ? TEMPLATES.filter((t) => favorites.includes(t.id))
          : filtered;
        if (list.length === 0) {
          return (
            <div className="text-center py-20 text-text-muted">
              <p className="text-lg font-bold">No templates found</p>
              <p className="text-sm mt-1 opacity-60">Try a different search or category.</p>
            </div>
          );
        }
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((tpl) => {
              const isFav = favorites.includes(tpl.id);
              const isCompared = compareList.includes(tpl.id);
              const isActive = tpl.id === activeTemplateId;
              const isAIRec = tpl.id === aiRec.template.id;

              return (
                <div
                  key={tpl.id}
                  className="group relative flex flex-col rounded-2xl overflow-hidden border border-border-subtle bg-bg-secondary hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 hover:border-primary/20"
                >
                  {/* AI / Active Badges */}
                  <div className="absolute top-3 left-3 z-20 flex gap-1.5 flex-wrap">
                    {isAIRec && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-600 text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                        <FaMagic size={7} /> AI Pick
                      </span>
                    )}
                    {isActive && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success text-white text-[9px] font-black uppercase tracking-widest">
                        <FaCheck size={7} /> Active
                      </span>
                    )}
                    {isCompared && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-white text-[9px] font-black uppercase tracking-widest">
                        Comparing
                      </span>
                    )}
                  </div>

                  {/* Favorite + Compare Controls */}
                  <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
                    <button
                      onClick={() => toggleFavorite(tpl.id)}
                      title={isFav ? "Remove from favorites" : "Add to favorites"}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border shadow-md ${
                        isFav
                          ? "bg-rose-500 border-rose-400 text-white"
                          : "bg-bg-primary/80 border-border-subtle text-text-muted hover:text-rose-400 hover:border-rose-400"
                      }`}
                    >
                      {isFav ? <FaHeart size={10} /> : <FaRegHeart size={10} />}
                    </button>
                    <button
                      onClick={() => toggleCompare(tpl.id)}
                      title={isCompared ? "Remove from compare" : compareList.length >= 2 ? "Compare limit reached" : "Add to compare"}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border shadow-md ${
                        isCompared
                          ? "bg-primary border-primary text-white"
                          : compareList.length >= 2
                          ? "bg-bg-primary/40 border-border-subtle text-text-muted/40 cursor-not-allowed"
                          : "bg-bg-primary/80 border-border-subtle text-text-muted hover:text-primary hover:border-primary"
                      }`}
                    >
                      <FaBalanceScale size={9} />
                    </button>
                  </div>

                  {/* Preview Container */}
                  <div
                    className="relative h-[320px] overflow-hidden cursor-pointer bg-bg-primary"
                    onClick={() => setPreviewTemplate(tpl)}
                  >
                    <div className="absolute inset-x-0 top-0 flex justify-center scale-[0.52] origin-top transition-transform duration-500 group-hover:scale-[0.55]">
                      <ResumePreview resume={dummyResume} templateId={tpl.id} />
                    </div>
                    {/* Fade overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg-secondary to-transparent z-10 pointer-events-none" />
                    {/* Hover eye icon */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20 pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white">
                        <FaEye size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 flex flex-col gap-3 bg-bg-secondary border-t border-border-subtle">
                    {/* Name + Layout */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-black text-text-primary tracking-tight">{tpl.name}</h3>
                        <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mt-0.5">{tpl.layout}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2">{tpl.description}</p>

                    {/* Factual Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {tpl.tags.map((tag) => <Badge key={tag} label={tag} />)}
                    </div>

                    {/* Best For */}
                    <div className="flex flex-wrap gap-1">
                      {tpl.bestFor.map((role) => (
                        <span key={role} className="text-[9px] text-text-muted font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/8">
                          {role}
                        </span>
                      ))}
                    </div>

                    {/* Primary CTA */}
                    <button
                      onClick={() => handleUseTemplate(tpl.id)}
                      className="mt-1 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/10 border border-primary/25 text-primary text-xs font-bold hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
                    >
                      Use Template <FiArrowRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}

      {/* ── Full Preview Modal ── */}
      {previewTemplate && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center p-6 lg:p-10 overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) setPreviewTemplate(null); }}
        >
          <div className="max-w-4xl w-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">{previewTemplate.name}</h2>
                <p className="text-text-muted text-xs mt-1">{previewTemplate.description}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { handleUseTemplate(previewTemplate.id); setPreviewTemplate(null); }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                >
                  Use Template <FiArrowRight size={12} />
                </button>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            </div>

            {/* Template switcher inside modal */}
            <div className="flex gap-2 flex-wrap mb-6">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setPreviewTemplate(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    t.id === previewTemplate.id
                      ? "bg-primary text-white border-primary"
                      : "bg-white/5 text-text-muted border-white/10 hover:border-white/25"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>

            <div className="bg-white shadow-2xl rounded-sm mx-auto w-fit">
              <ResumePreview resume={dummyResume} templateId={previewTemplate.id} />
            </div>
          </div>
        </div>
      )}

      {/* ── Compare Modal ── */}
      {compareMode && compareTemplates.length === 2 && (
        <div className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col p-6 overflow-y-auto">
          <div className="max-w-7xl w-full mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-white tracking-tight">Side-by-Side Comparison</h2>
              <button
                onClick={() => setCompareMode(false)}
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <FaTimes size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {compareTemplates.map((tpl) => (
                <div key={tpl.id} className="flex flex-col gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h3 className="text-white font-black text-sm">{tpl.name}</h3>
                    <p className="text-text-muted text-xs mt-1">{tpl.layout} · {tpl.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {tpl.tags.map((tag) => <Badge key={tag} label={tag} />)}
                    </div>
                    <button
                      onClick={() => { handleUseTemplate(tpl.id); setCompareMode(false); }}
                      className="mt-3 w-full py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                    >
                      Use This Template <FiArrowRight size={10} />
                    </button>
                  </div>
                  <div className="bg-white rounded-sm shadow-2xl overflow-hidden">
                    <ResumePreview resume={dummyResume} templateId={tpl.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
