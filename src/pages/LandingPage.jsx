import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  Sparkles, 
  Zap, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ShieldCheck, 
  BarChart3, 
  FileText, 
  Award, 
  Target, 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Globe, 
  Layers, 
  UserCheck, 
  Cpu, 
  Star 
} from "lucide-react";
import { FaGem, FaGoogle, FaMicrosoft, FaAmazon, FaSpotify } from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [activeTemplateTab, setActiveTemplateTab] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);
  const [simulatedScore, setSimulatedScore] = useState(72);
  const [simulatedBullet, setSimulatedBullet] = useState("Managed a team of developers and wrote code for the website.");
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulateAI = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimulatedBullet("Spearheaded 8-engineer fullstack team to deliver cloud microservices, increasing uptime to 99.9% and driving $1.4M ARR growth.");
      setSimulatedScore(94);
      setIsSimulating(false);
    }, 800);
  };

  const templates = [
    { id: "classic", name: "Executive Classic", tag: "Executive", desc: "Traditional, dense layout for senior leaders & management." },
    { id: "modern", name: "Tech Minimalist", tag: "Developer", desc: "Clean single-column structure for software engineers & tech." },
    { id: "professional", name: "ATS Safe Essential", tag: "ATS", desc: "Monochrome, 100% parse-proof layout for corporate portals." },
    { id: "creative", name: "Modern Studio", tag: "Creative", desc: "Subtle accent highlights for designers & product managers." },
    { id: "minimal", name: "Clean Minimalist", tag: "Minimal", desc: "Sleek typography focus for remote job seekers & general roles." },
    { id: "bold", name: "Bold Career", tag: "Manager", desc: "High impact section headers for aggressive growth roles." },
  ];

  const filteredTemplates = activeTemplateTab === "All" 
    ? templates 
    : templates.filter(t => t.tag.toLowerCase() === activeTemplateTab.toLowerCase());

  const aiFeatures = [
    { title: "Executive Rewrite", icon: Sparkles, desc: "Transforms basic work descriptions into authoritative executive achievements." },
    { title: "ATS Scanner & Simulator", icon: Cpu, desc: "Audits your resume against 2026 parsing algorithms used by Fortune 500 portals." },
    { title: "Job Description Matcher", icon: Target, desc: "Scans any job URL to identify missing keywords and alignment gaps." },
    { title: "Achievement Quantifier", icon: BarChart3, desc: "Automatically converts generic statements into measurable metric data points." },
    { title: "AI Cover Letter Writer", icon: FileText, desc: "Generates tailored cover letters in seconds aligned directly with your CV." },
    { title: "Live Portfolio Builder", icon: Globe, desc: "Converts your resume into an interactive custom web portfolio (cvify.me/name)." },
    { title: "Recruiter Mode Insight", icon: UserCheck, desc: "Simulates a recruiter's 6-second scan to highlight visual focus areas." },
    { title: "Skill Gap Detection", icon: Award, desc: "Identifies trending industry skills missing from your experience history." },
    { title: "Future Career Roadmap", icon: Layers, desc: "Generates tailored milestone paths for your target role and salary goals." },
  ];

  const faqs = [
    { q: "What makes CVifyPro different from traditional resume builders?", a: "Traditional resume builders are formatting tools that produce static PDFs. CVifyPro is an AI Career Operating System that actively rewrites bullet points, matches keywords against job links, and guarantees 100% ATS compatibility." },
    { q: "Will my resume pass ATS systems like Greenhouse, Lever, and Workday?", a: "Yes. 100% of CVifyPro templates are engineered to comply with strict international ATS parsing standards, keeping HTML/PDF semantic layers clean." },
    { q: "How does the AI Intent Engine work?", a: "Type any natural language command like 'Make my summary sound like a VP of Product', and CVifyPro rewrites your section while preserving factual accuracy." },
    { q: "Is my candidate data kept private and secure?", a: "Absolutely. We encrypt candidate data end-to-end and never sell or distribute your personal profile to third-party data brokers." },
    { q: "How does the Diamond Credit Economy work?", a: "Diamonds power deep AI execution (e.g. ATS scans or AI rewrites). You receive free diamonds upon sign-up and can top up as needed without subscription traps." },
    { q: "Can I tailor my resume for multiple different job applications?", a: "Yes. CVifyPro allows you to create unlimited tailored versions optimized for different job postings in one click." },
    { q: "What file formats can I export?", a: "You can export high-resolution, vector-rendered ATS-compliant PDFs ready for immediate application submit." },
    { q: "What is the Live Public Portfolio feature?", a: "CVifyPro automatically converts your resume into an interactive online web portfolio (e.g. cvify.me/username) that you can share with recruiters." },
    { q: "Does CVifyPro write Cover Letters?", a: "Yes. CVifyPro generates custom AI cover letters tailored directly to your resume and your target job description." },
    { q: "Can I import my existing PDF CV or LinkedIn profile?", a: "Yes. You can upload any existing PDF CV or LinkedIn text for instant parsing into the CVify workspace." },
    { q: "Will AI hallucinate or invent fake work experience?", a: "No. CVifyPro enhances and quantifies your actual experience rather than inventing fictitious work history." },
    { q: "How does the Job Matcher work?", a: "Paste any job posting URL or job description text. CVifyPro compares your resume against it and shows exact missing keywords." },
    { q: "Is CVifyPro mobile responsive?", a: "Yes. CVifyPro features a dedicated mobile architecture with sticky section carousels, progressive disclosure forms, and bottom preview drawers." },
    { q: "Do I need design skills to build a great resume?", a: "Zero. CVifyPro handles typography, margins, spacing, and visual hierarchy automatically." },
    { q: "Can I try CVifyPro for free?", a: "Yes! You can start building, editing, and previewing your resume immediately for free." },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-primary selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Top Header Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5 px-4 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-black text-sm shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            CV
          </div>
          <span className="font-black text-xl tracking-tighter text-white">CVify<span className="text-primary">Pro</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
          <a href="#why-cvify" className="hover:text-white transition-colors">Why CVifyPro</a>
          <a href="#features" className="hover:text-white transition-colors">AI Features</a>
          <a href="#templates" className="hover:text-white transition-colors">Templates</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            // ── Authenticated: show user identity + workspace link ──
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
              >
                ← Dashboard
              </button>
              <button
                onClick={() => navigate("/resume/library")}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-white hover:bg-white/10 transition-all"
              >
                {user.profileImage ? (
                  <img src={user.profileImage} alt="avatar" className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-[10px] font-black">
                    {(user.firstName?.[0] || user.username?.[0] || "U").toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline">
                  {user.firstName || user.username || "Account"}
                </span>
              </button>
            </>
          ) : (
            // ── Unauthenticated: public Sign In / Create Resume ──
            <>
              <Link to="/login" className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/resume-builder/create" className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-glow-primary hover:scale-[1.03] transition-all">
                Create Resume
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-primary/20 text-primary text-[10px] sm:text-xs font-black uppercase tracking-widest mb-8 animate-fadeIn">
          <Sparkles size={14} className="animate-pulse" />
          <span>The Next Generation AI Career Operating System</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white max-w-5xl leading-[1.1] mb-6">
          Build resumes that recruiters <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-500">actually read.</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-3xl font-medium leading-relaxed mb-10">
          Traditional resume builders help you write resumes. CVifyPro combines AI content rewriting, real-time ATS optimization, recruiter psychology, and career intelligence to get you hired.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <Link to="/resume-builder/create" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-glow-primary hover:scale-105 transition-all flex items-center justify-center gap-3">
            <span>Start Building Free</span>
            <ArrowRight size={16} />
          </Link>
          <button onClick={() => navigate("/resume-builder/create")} className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-white/10 text-slate-300 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2">
            <Play size={14} className="text-primary" />
            <span>Interactive Demo</span>
          </button>
        </div>

        {/* Live Interactive Hero Simulator Canvas */}
        <div className="w-full max-w-5xl bg-bg-secondary border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 px-6 py-2 bg-primary/10 border-b border-l border-primary/20 text-primary text-[9px] font-black uppercase tracking-widest rounded-bl-2xl">
            Live AI Optimization Sandbox
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-4">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Input Raw Bullet Point:</span>
              <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-sm text-slate-300 font-mono">
                "{simulatedBullet}"
              </div>
              <button 
                onClick={handleSimulateAI}
                disabled={isSimulating}
                className="w-full py-3 bg-primary/20 border border-primary/30 text-primary rounded-xl text-xs font-black uppercase tracking-wider hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Zap size={14} />
                <span>{isSimulating ? "AI Processing..." : "Enhance With AI Intent (30 💎)"}</span>
              </button>
            </div>

            <div className="space-y-4 bg-slate-900 p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">ATS Readiness Metric</span>
                <span className={`text-sm font-black ${simulatedScore >= 90 ? "text-emerald-400" : "text-amber-400"}`}>
                  {simulatedScore}/100 {simulatedScore >= 90 ? "EXCELLENT" : "AVERAGE"}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-700" style={{ width: `${simulatedScore}%` }} />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                • Action verb strength: <span className="text-emerald-400 font-bold">Strong</span> <br />
                • Quantified result: <span className="text-emerald-400 font-bold">$1.4M ARR</span> <br />
                • ATS keyword alignment: <span className="text-emerald-400 font-bold">100% Parsed</span>
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof Logomark Grid */}
        <div className="mt-16 pt-12 border-t border-white/5 w-full max-w-5xl">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-8">Candidates Hired At Top Global Companies</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="flex items-center gap-2 text-slate-300 font-bold"><FaGoogle size={20} /> Google</span>
            <span className="flex items-center gap-2 text-slate-300 font-bold"><FaMicrosoft size={20} /> Microsoft</span>
            <span className="flex items-center gap-2 text-slate-300 font-bold"><FaAmazon size={20} /> Amazon</span>
            <span className="flex items-center gap-2 text-slate-300 font-bold"><FaSpotify size={20} /> Spotify</span>
          </div>
        </div>
      </section>

      {/* Why Traditional Builders Fail Section */}
      <section id="why-cvify" className="py-20 px-4 sm:px-6 lg:px-12 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">The Harsh Hiring Reality</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
              Why traditional resume builders fail candidates in 2026.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-medium">
              Most resume builders focus purely on colors and PDF layouts while ignoring the algorithms and recruiters that stand between you and your next offer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-bg-secondary border border-white/5 rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                <XCircle size={24} />
              </div>
              <h3 className="text-xl font-black text-white">The 75% ATS Black Hole</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Traditional templates use complex columns, graphics, and unparsed text tables that crash ATS screeners, causing your application to be rejected instantly.
              </p>
            </div>

            <div className="bg-bg-secondary border border-white/5 rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <XCircle size={24} />
              </div>
              <h3 className="text-xl font-black text-white">The 6-Second Recruiter Filter</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Recruiters glance at resumes for only 6 seconds. Generic summaries and unquantified bullet points fail to capture executive attention.
              </p>
            </div>

            <div className="bg-bg-secondary border border-white/5 rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <XCircle size={24} />
              </div>
              <h3 className="text-xl font-black text-white">Zero Job Alignment</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Sending the same generic CV to 50 jobs yields zero callbacks. Modern hiring requires real-time keyword matching for every specific application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">The Paradigm Shift</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
            Resume Builder vs. AI Career Operating System
          </h2>
        </div>

        <div className="bg-bg-secondary border border-white/5 rounded-3xl overflow-x-auto shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/5 bg-slate-900/60">
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Capability</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-500">Traditional Builders</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-primary bg-primary/5">CVifyPro Career OS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-medium">
              <tr>
                <td className="p-6 font-bold text-white">AI Content Optimization</td>
                <td className="p-6 text-slate-500">❌ None (Manual typing)</td>
                <td className="p-6 text-emerald-400 font-bold bg-primary/5">✓ Real-time AI Intent Engine</td>
              </tr>
              <tr>
                <td className="p-6 font-bold text-white">ATS Parsing Guarantee</td>
                <td className="p-6 text-slate-500">❌ Breaks in Workday/Greenhouse</td>
                <td className="p-6 text-emerald-400 font-bold bg-primary/5">✓ 100% Vector Parsed Standard</td>
              </tr>
              <tr>
                <td className="p-6 font-bold text-white">Job Description Matcher</td>
                <td className="p-6 text-slate-500">❌ Static single CV</td>
                <td className="p-6 text-emerald-400 font-bold bg-primary/5">✓ 1-Click Keyword Matching</td>
              </tr>
              <tr>
                <td className="p-6 font-bold text-white">Impact & Achievement Scoring</td>
                <td className="p-6 text-slate-500">❌ No metric feedback</td>
                <td className="p-6 text-emerald-400 font-bold bg-primary/5">✓ Real-Time 0-100 Impact Index</td>
              </tr>
              <tr>
                <td className="p-6 font-bold text-white">Live Web Portfolio</td>
                <td className="p-6 text-slate-500">❌ PDF download only</td>
                <td className="p-6 text-emerald-400 font-bold bg-primary/5">✓ Custom Shareable Web Profile</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-12 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">6-Step Velocity Pipeline</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
              How CVifyPro turns applications into interviews.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Choose Starting Point", desc: "Start fresh, import an existing PDF CV, or sync your LinkedIn profile." },
              { step: "02", title: "Select Proven Template", desc: "Pick from 12+ ATS-safe, executive, or modern developer layouts." },
              { step: "03", title: "AI Intent Rewrite", desc: "Let AI rewrite your experience bullets to highlight quantifiable impact." },
              { step: "04", title: "Real-Time ATS Audit", desc: "Audit formatting, verb density, and readability score live while editing." },
              { step: "05", title: "Match Target Job URL", desc: "Paste your target job post link to fill keyword gaps in seconds." },
              { step: "06", title: "Export & Land Interviews", desc: "Download high-res PDF CV + publish your live custom web portfolio." },
            ].map((s) => (
              <div key={s.step} className="bg-bg-secondary border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all">
                <span className="text-4xl font-black text-primary/20 group-hover:text-primary/40 transition-colors">{s.step}</span>
                <h3 className="text-lg font-black text-white mt-2 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase Section */}
      <section id="templates" className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">Recruiter Tested</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
              ATS-Proof Templates built for modern careers.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {["All", "ATS", "Executive", "Developer", "Minimal", "Creative"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTemplateTab(tab)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                  tab === activeTemplateTab
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-slate-900 text-slate-400 border border-white/5 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((tmpl) => (
            <div key={tmpl.id} className="bg-bg-secondary border border-white/5 rounded-3xl p-6 group hover:border-primary/40 transition-all flex flex-col justify-between">
              <div className="w-full h-48 bg-slate-950 rounded-2xl border border-white/5 flex items-center justify-center mb-6 group-hover:scale-[1.02] transition-transform">
                <div className="w-24 h-32 bg-white rounded shadow-2xl p-2 flex flex-col gap-1.5 opacity-90">
                  <div className="w-full h-2 bg-slate-800 rounded-xs" />
                  <div className="w-3/4 h-1.5 bg-slate-400 rounded-xs" />
                  <div className="w-full h-px bg-slate-200 my-1" />
                  <div className="w-full h-1 bg-slate-300 rounded-xs" />
                  <div className="w-full h-1 bg-slate-300 rounded-xs" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-black text-white">{tmpl.name}</h3>
                  <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full">
                    {tmpl.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium mb-6 leading-relaxed">{tmpl.desc}</p>
                <Link to="/resume-builder/create" className="w-full py-3 bg-slate-900 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all flex items-center justify-center gap-2">
                  <span>Use This Template</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Features Grid Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-12 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">Engineered Intelligence</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
              9 Deep AI Modules designed for career growth.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-bg-secondary border border-white/5 rounded-3xl p-6 space-y-3 hover:border-primary/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base font-black text-white">{feat.title}</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">Frequently Asked Questions</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">
            Everything you need to know about CVifyPro.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-bg-secondary border border-white/5 rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-black text-sm text-white hover:text-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={16} className="text-primary shrink-0" /> : <ChevronDown size={16} className="text-slate-500 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-slate-400 font-medium leading-relaxed border-t border-white/5 pt-4 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final High-Converting CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-primary/20 via-slate-900 to-indigo-950 border border-primary/30 rounded-3xl p-8 sm:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={12} /> Start Your Career Upgrade
          </div>

          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tighter max-w-4xl mx-auto">
            Ready to build a resume that actually lands interviews?
          </h2>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-medium">
            Join thousands of developers, designers, and executives using CVifyPro to bypass ATS algorithms and secure top remote and international roles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/resume-builder/create" className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-glow-primary hover:scale-105 transition-all">
              Build Your Resume Free ⚡
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400 pt-6">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-400" /> No Credit Card Required</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-400" /> 100% ATS Guaranteed</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-12 text-slate-500 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-black text-[10px]">CV</div>
            <span className="font-black text-white text-sm tracking-tighter">CVifyPro</span>
            <span className="text-[10px] text-slate-500">© 2026 CVify Inc. All rights reserved.</span>
          </div>

          <div className="flex gap-6 text-[10px] font-black uppercase tracking-wider text-slate-400">
            <Link to="/documentation" className="hover:text-white">Documentation</Link>
            <Link to="/login" className="hover:text-white">Sign In</Link>
            <Link to="/resume-builder/create" className="hover:text-white">Create Resume</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
