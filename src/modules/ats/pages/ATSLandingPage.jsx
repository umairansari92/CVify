import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  Gauge
} from "lucide-react";

const ATSLandingPage = () => {
  const [demoState, setDemoState] = useState("after"); // 'before' | 'after'
  const [openFaq, setOpenFaq] = useState(null);

  const pillars = [
    {
      icon: Cpu,
      title: "ATS Parsing Compatibility",
      desc: "Tests structural DOM safety, font encoding, and standard header detection across Workday, Taleo, and Greenhouse."
    },
    {
      icon: Target,
      title: "Keyword & Semantic Matching",
      desc: "Calculates distance vectors between JD requirements and candidate technical & soft skills."
    },
    {
      icon: Gauge,
      title: "Experience Quantification Rate",
      desc: "Measures metrics, percentages, team scale, and dollar impacts embedded across bullet points."
    },
    {
      icon: Zap,
      title: "Action Verb Power",
      desc: "Evaluates sentence initiation strength (e.g., 'Engineered' vs 'Worked on') to maximize recruiter impact."
    },
    {
      icon: Layers,
      title: "Seniority & Role Alignment",
      desc: "Scores experience depth and leadership responsibility against target role level requirements."
    },
    {
      icon: FileSearch,
      title: "Formatting Compliance",
      desc: "Detects dangerous tables, multi-column blocks, headers, footers, and unreadable custom graphics."
    },
    {
      icon: Globe,
      title: "Market Vector Alignment",
      desc: "Adapts scoring weights to specific markets: US Remote, European Union, MENA, or Enterprise Global."
    },
    {
      icon: Award,
      title: "Recruiter 3-Sec Impression",
      desc: "Simulates the hiring manager's initial visual scan summary and top-of-page candidate positioning."
    }
  ];

  const faqs = [
    {
      q: "How does CVify ATS Intelligence differ from standard resume checkers?",
      a: "Standard checkers only match basic exact keywords. CVify ATS Intelligence uses Gemini 2.5 Flash semantic distance algorithms to evaluate work impact, bullet quantification rates, layout compatibility, and market-specific recruiter expectations."
    },
    {
      q: "Will my resume data be stored securely or used for AI training?",
      a: "Your data is strictly encrypted and isolated. We never sell your personal information or use confidential candidate resumes for public LLM training."
    },
    {
      q: "Can I scan an existing resume built on CVify Pro?",
      a: "Yes! You can choose to upload a local PDF/Docx or directly select any saved resume from your CVify Pro library without uploading files."
    },
    {
      q: "What is the 24-Hour Smart Pricing window?",
      a: "Re-scanning the same resume within 24 hours is either FREE or heavily discounted (50% less), encouraging iterative optimization without wasting your credits."
    }
  ];

  return (
    <div className="space-y-16 py-4">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12 lg:p-16 text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI-POWERED RECRUITER DECODING SYSTEM
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            Know Exactly Why Your Resume Gets <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Rejected</span> Before a Recruiter Sees It
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
            75% of candidate resumes are discarded by ATS parsers before reaching a human. Decode Workday & Greenhouse algorithms, spot critical keyword gaps, and optimize your impact score.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/ats/scan"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              Launch Intelligence Scanner
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-semibold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              See How Parsing Works
            </a>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div>
              <div className="text-2xl font-extrabold text-slate-100">75%</div>
              <div className="text-xs text-slate-400">ATS Rejection Rate</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-emerald-400">85%+</div>
              <div className="text-xs text-slate-400">Target Interview Ready</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-100">6 Secs</div>
              <div className="text-xs text-slate-400">Avg Recruiter Review</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-emerald-400">24-Hr</div>
              <div className="text-xs text-slate-400">Smart Price Rescan</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PROBLEM VISUALIZER SECTION ── */}
      <section id="how-it-works" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            How ATS Systems Process Your PDF
          </h2>
          <p className="text-slate-400 text-sm">
            Enterprise systems don't read human design—they strip formatting into plain text. If your layout breaks, your application is silently dropped.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Human PDF View */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-emerald-400" />
                Human PDF View (What You See)
              </span>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                Visual PDF
              </span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300 font-sans">
              <div className="font-bold text-slate-100 text-sm">Senior Full Stack Engineer</div>
              <div className="text-slate-400">TechCorp Solutions | 2021 - Present</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-300">
                <li>Designed complex React micro-frontends and Node.js APIs.</li>
                <li>Improved system throughput by 40% and reduced cloud costs.</li>
              </ul>
            </div>
          </div>

          {/* ATS Raw DOM View */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Raw ATS Parser Output (What Workday Sees)
              </span>
              <span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
                Stripped Text
              </span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 space-y-1 overflow-x-auto">
              <p className="text-red-400">// ERROR: Table layout unreadable</p>
              <p>[POSITION]: Senior Full Stack Engineer</p>
              <p>[DATES]: NULL (Failed date parsing)</p>
              <p>[UNREADABLE_OBJECT]: Icon_React.png</p>
              <p>[PARSED_VERBS]: Designed, Improved</p>
              <p className="text-yellow-400">// MISSING_METRIC: Cloud cost savings ($ value unparsed)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. THE 8 INTELLIGENCE PILLARS ── */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            The 8 Intelligence Audit Pillars
          </h2>
          <p className="text-slate-400 text-sm">
            We don't just count words. Our Gemini 2.5 Flash engine evaluates your profile against 8 critical recruitment dimensions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 space-y-3 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-emerald-500/20 text-emerald-400 flex items-center justify-center transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-all">
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

      {/* ── 3.5 REGIONAL MARKET MODES BREAKDOWN ── */}
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

      {/* ── 4. INTERACTIVE BEFORE/AFTER DEMO ── */}
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

      {/* ── 5. FAQ SECTION ── */}
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

      {/* ── 6. FINAL BOTTOM CTA ── */}
      <section className="text-center bg-gradient-to-tr from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/20 rounded-3xl p-8 sm:p-12 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
          Ready to Decode Your Resume Score?
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Start your ATS scan in under 60 seconds. Fix hidden loopholes and get interview-ready.
        </p>
        <Link
          to="/ats/scan"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all active:scale-95"
        >
          Launch Intelligence Scanner Now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
};

export default ATSLandingPage;
