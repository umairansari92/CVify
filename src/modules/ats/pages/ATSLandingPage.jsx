import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Target, 
  FileSearch, 
  Cpu, 
  BarChart3, 
  HelpCircle, 
  ChevronDown,
  Layers,
  Award,
  Globe,
  Gauge,
  Upload,
  FileText,
  ShieldCheck,
  Check,
  Lock,
  Eye,
  TrendingUp,
  RefreshCw,
  Search,
  Gem
} from "lucide-react";

const ATSLandingPage = () => {
  const navigate = useNavigate();
  const [heroTab, setHeroTab] = useState("quick"); // 'quick' | 'jd'
  const [demoState, setDemoState] = useState("after"); // 'before' | 'after'
  const [openFaq, setOpenFaq] = useState(null);

  // 5-Step Candidate Journey
  const journeySteps = [
    {
      step: "01",
      title: "Upload Resume",
      desc: "Drag & drop your PDF or select a saved platform resume.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      step: "02",
      title: "Target Market",
      desc: "Choose US Remote, EU, Freelance/PK, or Global Tech.",
      color: "from-blue-500 to-teal-500"
    },
    {
      step: "03",
      title: "AI Parser Scan",
      desc: "Gemini 2.5 Flash vector extraction & layout audit.",
      color: "from-emerald-500 to-teal-400"
    },
    {
      step: "04",
      title: "Mission Debrief",
      desc: "Review recruiter impression, missing keywords & AI fixes.",
      color: "from-amber-500 to-orange-500"
    },
    {
      step: "05",
      title: "Apply & Win",
      desc: "Iterative 24-hr rescan & apply with 85%+ score confidence.",
      color: "from-pink-500 to-rose-500"
    }
  ];

  // Capabilities Bento Grid
  const capabilities = [
    {
      icon: Cpu,
      title: "ATS DOM & Parsing Safety",
      badge: "Tier 1 Deterministic",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      desc: "Tests structural table safety, font encodings, and standard section header parsing across Workday, Taleo, and Greenhouse."
    },
    {
      icon: Target,
      title: "Semantic Keyword Distance",
      badge: "Tier 2 AI Intelligence",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      desc: "Calculates mathematical distance vectors between target Job Description requirements and candidate technical & soft skills."
    },
    {
      icon: Gauge,
      title: "Metric Quantification Rate",
      badge: "High-Impact Signal",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      desc: "Measures percentage of bullet points containing concrete business metrics ($, %, DAU scale, team sizes, latency reductions)."
    },
    {
      icon: Zap,
      title: "Action Verb Power",
      badge: "Recruiter Hook",
      badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20",
      desc: "Evaluates sentence initiation strength (e.g. 'Engineered, Spearheaded' vs 'Worked on, Responsible for') to maximize impact."
    },
    {
      icon: Globe,
      title: "Regional Market Adaptability",
      badge: "Market Engine",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      desc: "Adapts scoring criteria for US Remote ($80k+), European Union GDPR, Freelance/Pakistan Local, or Global Tech standards."
    },
    {
      icon: Award,
      title: "Recruiter 3-Sec Impression",
      badge: "Hiring Manager View",
      badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      desc: "Simulates top-of-page visual positioning and provides a concise 3-bullet hiring manager summary."
    }
  ];

  const faqs = [
    {
      q: "How does CVify ATS Intelligence differ from standard resume checkers?",
      a: "Standard checkers only match basic exact spelling or keyword lists. CVify ATS Intelligence uses a Two-Tier Engine combining deterministic DOM structural parsing with Gemini 2.5 Flash semantic distance algorithms to evaluate work impact, bullet quantification rates, and regional recruiter expectations."
    },
    {
      q: "What are the 4 Regional Market Modes?",
      a: "Different regions evaluate resumes differently: US Remote market requires extreme bullet quantification ($ and %) and 1-page length; EU market requires GDPR compliance and clean structure; Freelance/Pakistan market requires high client ROI metrics and tech stack density; Global Tech is standard."
    },
    {
      q: "Will my resume data be stored securely or used for AI training?",
      a: "Your data is strictly encrypted and isolated. We never sell candidate personal data or use confidential resumes for public LLM training."
    },
    {
      q: "What is the 24-Hour Smart Pricing window?",
      a: "Re-scanning the same resume within 24 hours is either FREE or heavily discounted (50% less), encouraging iterative bullet point optimization without wasting your diamond credits."
    }
  ];

  return (
    <div className="space-y-20 py-4 max-w-7xl mx-auto">
      
      {/* ── 1. HERO SECTION WITH DUAL-MODE SCANNER CARD ── */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 lg:p-12">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline & Dual-Tab Scanner Box (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              AI RECRUITER DECODING SYSTEM v2.0
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-[1.15]">
              Upload your resume, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">earn score + unlock AI tips</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Score 85%+ to unlock recruiter recommendations and land interviews for global tech, US remote, EU, and agency roles.
            </p>

            {/* Interactive Hero Upload Card */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xl shadow-emerald-950/20">
              
              {/* Dual Tab Switcher */}
              <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800/80">
                <button
                  onClick={() => setHeroTab("quick")}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    heroTab === "quick"
                      ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  Quick Score Check
                </button>

                <button
                  onClick={() => setHeroTab("jd")}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    heroTab === "jd"
                      ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Target className="w-3.5 h-3.5" />
                  Score + Match with JD
                </button>
              </div>

              <div className="text-xs text-slate-400">
                {heroTab === "quick" ? (
                  <span>Instant structural layout, font safety, and core skill density evaluation.</span>
                ) : (
                  <span>Paste target Job Description for deep 4-factor distance vector matching.</span>
                )}
              </div>

              {/* Direct Launch Button */}
              <Link
                to="/ats/scan"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Upload className="w-4 h-4" />
                Launch Scanner & Upload Resume (PDF)
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Encrypted & Private
                </span>
                <span>Supports PDF, DOCX (Max 5MB)</span>
                <span className="text-emerald-400 font-semibold">24-Hr Free Rescan</span>
              </div>
            </div>

          </div>

          {/* Right Column: Simulated Live Score HUD Preview Card (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
              
              {/* Card Top Ribbon */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-slate-200">Power of 8 Metrics</span>
                </div>
                <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/20">
                  RECRUITER READY
                </span>
              </div>

              {/* Main Score Ring Simulation */}
              <div className="flex items-center justify-center py-2">
                <div className="relative w-36 h-36 rounded-full border-8 border-slate-900 flex flex-col items-center justify-center text-center shadow-inner">
                  <div className="absolute inset-0 rounded-full border-8 border-emerald-400 border-t-transparent animate-spin-slow" />
                  <span className="text-4xl font-black text-slate-100 tracking-tight">88%</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">ATS Score</span>
                </div>
              </div>

              {/* Sub Score Meters */}
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300 font-medium">
                    <span>Keyword Distance Match</span>
                    <span className="text-emerald-400 font-bold">92%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[92%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300 font-medium">
                    <span>Metric Quantification Rate</span>
                    <span className="text-teal-400 font-bold">84%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-teal-400 h-full w-[84%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300 font-medium">
                    <span>DOM Formatting Safety</span>
                    <span className="text-emerald-400 font-bold">96%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[96%]" />
                  </div>
                </div>
              </div>

              {/* Bottom Impression Snippet */}
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-normal flex items-start gap-2">
                <Eye className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Hiring Manager View:</strong> Candidate demonstrates strong senior leadership and verified MERN quantification metrics.
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 2. CANDIDATE JOURNEY TIMELINE (5-STEP PATH) ── */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/20">
            <TrendingUp className="w-3.5 h-3.5" />
            THE CANDIDATE ROADMAP
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Your 5-Step Path to Interview Calls
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            From initial upload to executive interview readiness in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {journeySteps.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 transition-all relative group"
            >
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${item.color} text-slate-950 font-black text-xs flex items-center justify-center shadow-md`}>
                {item.step}
              </div>
              <h3 className="font-bold text-slate-200 text-sm group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. TWO-TIER INTELLIGENCE ENGINE EXPLANATION ── */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider">
            Dual Architecture System
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
            CVify Pro builds its score using a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Two-Tier System</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Conventional checkers only scan keywords. We combine deterministic DOM layout validation with Gemini 2.5 Flash semantic distance intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Tier 1 Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 relative overflow-hidden group hover:border-purple-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">TIER 1</span>
              <h3 className="text-lg font-extrabold text-slate-100">Deterministic Layout & DOM Audit</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Validates structural document readability. Tests font encodings, margin safety, table column stability, and section header parsing against Workday, Taleo, and Greenhouse standards.
            </p>
            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-purple-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              100% Parsing Compatibility Protection
            </div>
          </div>

          {/* Tier 2 Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">TIER 2</span>
              <h3 className="text-lg font-extrabold text-slate-100">Gemini 2.5 Flash AI Intelligence</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates semantic vector distances between Job Description requirements and candidate technical skills. Evaluates action verb power, metric quantification, and recruiter first impressions.
            </p>
            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-emerald-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Deep Semantic Matching & AI Bullet Fixes
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BEYOND TYPOS & PUNCTUATION (BENTO CAPABILITIES GRID) ── */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Our AI-powered engine goes <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">beyond typos and punctuation</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Conventional checkers give basic grammar hints. CVify Pro gives deep recruiter intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/40 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-4 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-200 group-hover:text-emerald-400 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 5. REGIONAL MARKET MODES BREAKDOWN ── */}
      <section className="space-y-8 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 sm:p-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <Globe className="w-3.5 h-3.5" />
            TARGET MARKET ADAPTABILITY
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            How ATS Scoring Adapts to Regional Markets
          </h2>
          <p className="text-slate-400 text-sm">
            Recruiter expectations and ATS filtering rules differ drastically across global regions. Select your target market for tailored intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          {/* Market 1: Global Tech Standard */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              🌐
            </div>
            <h3 className="font-bold text-slate-100 text-sm">Global Tech Standard</h3>
            <p className="text-slate-400 leading-relaxed">
              Universal keyword vector matching, DOM layout safety, standard experience extraction across international remote job boards.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-medium">
              Key Focus: Layout Safety & Keyword Match
            </div>
          </div>

          {/* Market 2: US Remote Market */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
              🇺🇸
            </div>
            <h3 className="font-bold text-slate-100 text-sm">US Remote ($80k+)</h3>
            <p className="text-slate-400 leading-relaxed">
              Extreme bullet point quantification required ($, %, DAU scale, latency numbers), strict 1-page length, and aggressive action verbs.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-blue-400 font-medium">
              Key Focus: Metric Density & Action Verbs
            </div>
          </div>

          {/* Market 3: European Union Market */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              🇪🇺
            </div>
            <h3 className="font-bold text-slate-100 text-sm">European Union</h3>
            <p className="text-slate-400 leading-relaxed">
              GDPR data privacy compliance, clean single-column structure, support for European CV conventions (optional photo & language levels).
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-amber-400 font-medium">
              Key Focus: GDPR Safety & Clear Structure
            </div>
          </div>

          {/* Market 4: Freelance / Pakistan Local Market */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              🇵🇰
            </div>
            <h3 className="font-bold text-slate-100 text-sm">Freelance & Pakistan</h3>
            <p className="text-slate-400 leading-relaxed">
              Client ROI metrics, project turnaround velocity, agency vs direct client signals, and high tech stack density for remote agency hiring.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-purple-400 font-medium">
              Key Focus: Client ROI & Tech Stack Density
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. INTERACTIVE BEFORE/AFTER DEMO ── */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">
              Interactive Intelligence Demo
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              See how transforming bullet points elevates your overall ATS score.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setDemoState("before")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                demoState === "before"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Before Fix (42%)
            </button>
            <button
              onClick={() => setDemoState("after")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                demoState === "after"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              After AI Fix (94%)
            </button>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold">Bullet Point Impact Audit</span>
            <span className={`font-bold px-2 py-0.5 rounded ${
              demoState === "before" ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
            }`}>
              {demoState === "before" ? "Score: 42% - High Rejection Risk" : "Score: 94% - Recruiter Ready"}
            </span>
          </div>

          <p className="text-sm font-mono p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed">
            {demoState === "before"
              ? `"Worked on web applications using React and Node.js for company client."`
              : `"Engineered 4 enterprise MERN micro-services handling 15,000 daily active users, reducing API query latency by 35%."`}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block">Action Verb Power</span>
              <span className={`font-bold ${demoState === "before" ? "text-red-400" : "text-emerald-400"}`}>
                {demoState === "before" ? "Weak ('Worked on')" : "Strong ('Engineered')"}
              </span>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block">Quantification Rate</span>
              <span className={`font-bold ${demoState === "before" ? "text-red-400" : "text-emerald-400"}`}>
                {demoState === "before" ? "0% (No metrics)" : "100% (15k DAU, 35% latency)"}
              </span>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block">Recruiter Decision</span>
              <span className={`font-bold ${demoState === "before" ? "text-red-400" : "text-emerald-400"}`}>
                {demoState === "before" ? "Skip / Drop" : "Shortlist for Interview"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. SECONDARY UPLOAD CTA CARD ── */}
      <section className="bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
            <Upload className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
            Get your resume score now!
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Upload your resume and boost your interview callback rate across global tech jobs.
          </p>

          <Link
            to="/ats/scan"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition-all active:scale-95"
          >
            Launch Scanner Workspace
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="text-[11px] text-slate-500 pt-2">
            No credit card required. Encrypted PDF parsing.
          </div>
        </div>
      </section>

      {/* ── 8. FAQ SECTION ── */}
      <section className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-100">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-xs">
            Everything you need to know about CVify ATS Intelligence.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-slate-200 hover:text-emerald-400"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? "rotate-180 text-emerald-400" : "text-slate-500"}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ATSLandingPage;
