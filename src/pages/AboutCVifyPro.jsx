import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Rocket, 
  Target, 
  Cpu, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Brain, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ChevronDown, 
  ExternalLink, 
  UserCheck, 
  BookOpen, 
  ArrowRight,
  Code2,
  FileText,
  Award,
  Terminal,
  Zap,
  Building2,
  Briefcase
} from "lucide-react";

const AboutCVifyPro = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is CVify Pro?",
      a: "CVify Pro is an AI-powered Career Intelligence and Portfolio Ecosystem created to help job seekers, developers, and professionals build ATS-optimized resumes, audit keyword gaps against job descriptions, generate live personal portfolio websites, and prepare for interviews."
    },
    {
      q: "Who created CVify Pro?",
      a: "CVify Pro was architected and founded by Umair Ahmed, a Senior Full Stack Engineer, Systems Architect, and educator from Sindh, Pakistan. The platform is developed under DataVerse Technologies."
    },
    {
      q: "How does the CVify Pro ATS Scoring Engine work?",
      a: "CVify Pro uses a hybrid evaluation algorithm (AI heuristic × 0.6 + deterministic parsing × 0.4) that evaluates Completeness (40%), Measurable Quantification (35%), and Active Impact Language (25%). It adapts its scoring benchmarks across 4 regional hiring markets: Global Standard, US Remote, European Union, and MENA/Gulf."
    },
    {
      q: "Is CVify Pro free to use?",
      a: "Yes. CVify Pro operates on a freemium Diamond Economy model where new users receive 100 free diamonds upon registration, enabling full access to AI resume parsing, ATS scoring, live theme hosting, and PDF exports without mandatory subscription fees."
    },
    {
      q: "What makes CVify Pro different from traditional resume builders?",
      a: "Unlike traditional visual-only builders like Canva or Zety, CVify Pro provides a 9-stage deterministic parsing pipeline, interactive theme rendering with 13 live portfolio layouts, an AI Career Coach HUD, and anti-hallucination safeguards that guarantee ATS compliance."
    },
    {
      q: "Where is CVify Pro accessible?",
      a: "CVify Pro is available as a web platform at https://app-cvifypro.vercel.app and https://cvifypro.vercel.app, as well as an Android application on the Google Play Store."
    }
  ];

  const canonicalUrl = "https://app-cvifypro.vercel.app/cvify-pro";

  const entityJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": "About CVify Pro — Master Canonical Entity Document",
        "description": "Authoritative entity and architecture overview of CVify Pro, an AI-powered career intelligence and portfolio platform created by Umair Ahmed under DataVerse Technologies.",
        "isPartOf": {
          "@type": "WebSite",
          "name": "CVify Pro",
          "url": "https://app-cvifypro.vercel.app"
        },
        "about": {
          "@id": "https://app-cvifypro.vercel.app/#software"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://app-cvifypro.vercel.app/#software",
        "name": "CVify Pro",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Android, iOS",
        "url": "https://app-cvifypro.vercel.app",
        "description": "AI Career Intelligence and Portfolio Ecosystem providing ATS resume generation, job description matching, and live portfolio themes.",
        "author": {
          "@type": "Person",
          "name": "Umair Ahmed",
          "jobTitle": "Lead Systems Architect & Founder",
          "sameAs": [
            "https://github.com/umairansari92",
            "https://www.linkedin.com/in/umair-ahmed-dev"
          ]
        },
        "publisher": {
          "@type": "Organization",
          "name": "DataVerse Technologies"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      <Helmet>
        <title>About CVify Pro — AI Career Intelligence & Portfolio Ecosystem</title>
        <meta name="description" content="CVify Pro is an AI-powered Career Intelligence and Portfolio Ecosystem created by Umair Ahmed under DataVerse Technologies. Discover its architecture, ATS engine, and features." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="About CVify Pro — AI Career Intelligence & Portfolio Ecosystem" />
        <meta property="og:description" content="The definitive knowledge and architecture guide for CVify Pro. Master Entity Overview, Founder Story, ATS v2.0 Engine, and 13 Live Portfolio Themes." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(entityJsonLd)}
        </script>
      </Helmet>

      {/* ── Header & Hero ── */}
      <section className="text-center space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Official Canonical Entity Document</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)] max-w-4xl mx-auto leading-tight">
          The Architecture of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">CVify Pro</span>
        </h1>

        <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
          CVify Pro is an enterprise-grade <strong className="text-[var(--text-primary)]">Career Intelligence and Portfolio Ecosystem</strong>. Built on a modular micro-SaaS architecture, it bridges the gap between candidate qualifications and Applicant Tracking Systems through deterministic parsing, context-aware AI scoring, and live reactive portfolio generation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/resume-builder"
            className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            <span>Launch Resume Studio</span>
          </Link>

          <Link
            to="/ats"
            className="px-6 py-3 rounded-2xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-primary)] font-bold text-sm transition-all flex items-center gap-2"
          >
            <Target className="w-4 h-4 text-emerald-400" />
            <span>ATS v2.0 Scanner</span>
          </Link>

          <Link
            to="/documentation"
            className="px-6 py-3 rounded-2xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold text-sm transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>Full System Docs</span>
          </Link>
        </div>
      </section>

      {/* ── Entity Summary Card ── */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border)] shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-4 h-4" /> Entity Classification
          </span>
          <h2 className="text-lg font-black text-[var(--text-primary)]">Software & SaaS Platform</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Registered as an independent Web & Mobile Career Intelligence Application developed under <strong>DataVerse Technologies</strong>.
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck className="w-4 h-4" /> Founder & Architect
          </span>
          <h2 className="text-lg font-black text-[var(--text-primary)]">Umair Ahmed</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Senior Full Stack Engineer, Systems Architect, and Government Educator from Sindh, Pakistan.
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-4 h-4" /> Global Availability
          </span>
          <h2 className="text-lg font-black text-[var(--text-primary)]">Web, Android & iOS</h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Multi-platform deployment serving worldwide applicants across Standard, US Remote, EU, and MENA hiring markets.
          </p>
        </div>
      </section>

      {/* ── Deep Dive: Founder & Origin Story ── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">The Genesis: Teacher by Day, Coder by Night</h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">The human mission and technical origin behind CVify Pro</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            CVify Pro was conceived by <strong className="text-[var(--text-primary)]">Umair Ahmed</strong> to eliminate the asymmetric barrier job seekers face when applying to technology and enterprise roles. Having worked as a dedicated educator for the Government of Sindh while coding production systems at night, Umair witnessed hundreds of talented graduates get automatically filtered out by opaque Applicant Tracking Systems due to arbitrary formatting discrepancies, weak action verbs, or unparsed multi-column layouts.
          </p>
          <p>
            Instead of building another surface-level template builder, Umair architected CVify Pro around a deterministic parsing engine, transparent scoring algorithms, and live reactive portfolio themes that empower applicants to showcase verifiable proof of their skills.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://www.linkedin.com/in/umair-ahmed-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:underline"
            >
              <span>Umair Ahmed on LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/umairansari92"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:underline"
            >
              <span>Umair Ahmed on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── The 8 Core Pillar Modules ── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">The 8 Core Pillar Modules</h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">Autonomous micro-SaaS sub-applications powering CVify Pro</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Cpu className="w-4 h-4" /> 1. 9-Stage Resume Intelligence Pipeline
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Decoupled layout analysis, reading-order untangling, section classification, normalizer healing, and validation into a strict <code>CanonicalResumeDTO</code>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
              <Target className="w-4 h-4" /> 2. ATS v2.0 Micro-SaaS Engine
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Real-time audit evaluating completeness (40%), quantification (35%), and impact action verbs (25%) with regional market calibrations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Globe className="w-4 h-4" /> 3. Reactive Theme Engine v4.0 (13 Themes)
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Instant generation of public live portfolios (NOIR, Monograph, Oriental Luxe, Apex, Terminal, Aura) with dynamic OpenGraph and JSON-LD metadata.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" /> 4. AI Intent Command Bar
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Context-aware natural language optimization prompt runner for instantly rewriting bullets into metric-driven executive statements.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Briefcase className="w-4 h-4" /> 5. Job Matcher & Keyword Gap Analysis
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Analyzes job descriptions from LinkedIn or job boards against resume schemas to extract missing technical requirements and keywords.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Brain className="w-4 h-4" /> 6. AI Role-Play Interview Simulator
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Simulates realistic behavioral and technical interview questions with live debriefs and score cards.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Zap className="w-4 h-4" /> 7. Dynamic Career Roadmap & Skills Engine
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Curates step-by-step career milestone progressions and active learning trackers to bridge industry skill gaps.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" /> 8. AI Representative & Public Profile Network
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              A recruiter-facing interactive persona that answers recruiter inquiries 24/7 grounded strictly in candidate resume truth.
            </p>
          </div>
        </div>
      </section>

      {/* ── Feature Comparison Table (AI Extractable) ── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">System Comparison: CVify Pro vs. Legacy Builders</h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">Why CVify Pro outperforms conventional visual templates</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-xl">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
                <th className="p-4 font-black text-[var(--text-primary)]">Feature / Capability</th>
                <th className="p-4 font-black text-emerald-400">CVify Pro (Career OS)</th>
                <th className="p-4 font-black text-[var(--text-secondary)]">Traditional Resume Builders (Canva, Zety, Novoresume)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-[var(--text-secondary)]">
              <tr>
                <td className="p-4 font-bold text-[var(--text-primary)]">ATS Compliance Architecture</td>
                <td className="p-4 text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> 9-Stage Deterministic Parser & DTO
                </td>
                <td className="p-4 text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Static visual tables (Often unparsed by ATS)
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-[var(--text-primary)]">Live Scoring & Heuristic Engine</td>
                <td className="p-4 text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Real-time 3-pillar metric scoring
                </td>
                <td className="p-4 text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Superficial percentage bar without breakdown
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-[var(--text-primary)]">Live Web Portfolio Hosting</td>
                <td className="p-4 text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> 13 Animated Themes + SEO JSON-LD
                </td>
                <td className="p-4 text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> PDF only / No live portfolio themes
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-[var(--text-primary)]">AI Candidate Representative</td>
                <td className="p-4 text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Included (24/7 Recruiter Chatbot)
                </td>
                <td className="p-4 text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Not Available
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-[var(--text-primary)]">Anti-Hallucination Safeguards</td>
                <td className="p-4 text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> 6 strict rules + Hybrid Calibration
                </td>
                <td className="p-4 text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Generative hallucination risks
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Frequently Asked Questions (FAQ) ── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">Authoritative answers for human users and AI search engines</p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>

              {openFaq === idx && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] pt-3 bg-black/5 dark:bg-white/[0.02]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-blue-500/10 border border-emerald-500/20 text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
          Ready to Upgrade Your Professional Identity?
        </h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          Create an ATS-approved resume, analyze job descriptions, and launch your live portfolio in under 3 minutes.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/signup"
            className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2"
          >
            <span>Get Started with 100 Free Diamonds</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/documentation"
            className="px-6 py-3.5 rounded-2xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-primary)] font-bold text-sm transition-all"
          >
            <span>Explore Documentation</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default React.memo(AboutCVifyPro);
