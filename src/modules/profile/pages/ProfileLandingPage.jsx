import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Target,
  Cpu,
  BarChart3,
  HelpCircle,
  ChevronDown,
  Layers,
  Award,
  Globe,
  Gauge,
  FileText,
  ShieldCheck,
  Check,
  Lock,
  Eye,
  TrendingUp,
  RefreshCw,
  Palette,
  Bot,
  Laptop,
  Code2,
} from "lucide-react";
import UsernameClaimer from "../components/landing/UsernameClaimer";
import SectionHotspotExplorer from "../components/landing/SectionHotspotExplorer";
import ThemeShowcaseGallery from "../components/landing/ThemeShowcaseGallery";
import { manifest } from "../manifest";

export const ProfileLandingPage = () => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth?.user);
  const [openFaq, setOpenFaq] = useState(null);

  // 3-Step Pipeline
  const creationSteps = [
    {
      step: "01",
      title: "Input Experience & Proof",
      desc: "Fill in your projects, technical skills, quantified bullet points, and verified ATS score.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      step: "02",
      title: "Pick Theme & AI Voice",
      desc: "Choose from 11 responsive themes (Noir, Apex, Oriental Luxe) and configure your 24/7 AI chat guide.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      step: "03",
      title: "Share URL & Get Hired",
      desc: "Claim your custom slug (cvifypro.app/p/yourname) and share it with recruiters worldwide.",
      color: "from-purple-500 to-pink-500",
    },
  ];

  // 3 Key Differentiators (Live Digital Identity vs Static PDF)
  const differentiators = [
    {
      icon: Bot,
      title: "Autonomous 24/7 AI Recruiter Concierge",
      desc: "Static PDFs can't answer questions. Your digital portfolio embeds an AI agent trained on your actual experience to answer hiring manager queries in real-time.",
    },
    {
      icon: Gauge,
      title: "Verified ATS Compatibility & Data Scale",
      desc: "Prove your engineering caliber by displaying your verified resume audit score (e.g. 95% ATS) and quantified metrics directly on your hero banner.",
    },
    {
      icon: Palette,
      title: "11 Handcrafted Dynamic Themes",
      desc: "Switch between minimalist dark mode, executive emerald gold, or cyber terminal aesthetics instantly with zero keystroke lag and zero content loss.",
    },
  ];

  return (
    <div className="space-y-20 py-4 max-w-7xl mx-auto text-[var(--text-primary)]">
      
      {/* ── 1. HERO SECTION WITH USERNAME CLAIMER ── */}
      <section className="relative overflow-hidden rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-12 lg:p-16 shadow-2xl text-center">
        {/* Ambient Shaders */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 right-0 w-[400px] h-[300px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            DIGITAL IDENTITY & PORTFOLIO LAB v2.0
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-[1.12]">
            Turn Your Experience Into a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">
              Live AI-Powered Portfolio
            </span>
          </h1>

          <p className="text-[var(--text-secondary)] text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Stand out to global recruiters with 11 handcrafted themes, verified ATS proof points, project showcases, and an autonomous 24/7 AI chat guide.
          </p>

          {/* Username Claimer Input Bar */}
          <div className="pt-4">
            <UsernameClaimer />
          </div>

          {/* Direct CTA Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/profile/studio"
              className="px-6 py-3.5 rounded-xl bg-[var(--primary)] text-white text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[var(--primary-hover)] transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              <Laptop className="w-4 h-4" />
              <span>Launch Studio Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#studio-walkthrough"
              className="px-6 py-3.5 rounded-xl bg-[var(--surface-muted)] text-[var(--text-primary)] text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-[var(--surface-hover)] transition-all border border-[var(--border)]"
            >
              <Eye className="w-4 h-4 text-[var(--primary)]" />
              <span>View Field-by-Field Guide</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE MASTER STUDIO GUIDE & FIELD WALKTHROUGH ── */}
      <section>
        <SectionHotspotExplorer />
      </section>

      {/* ── 3. WHY DIGITAL PORTFOLIO VS STATIC PDF (3 Differentiators) ── */}
      <section className="space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            Next-Gen Candidate Experience
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
            Why Static Resumes Are Not Enough
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            A resume gets you through the ATS scanner. An interactive digital portfolio closes the hiring decision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentiators.map((diff) => {
            const Icon = diff.icon;
            return (
              <div
                key={diff.title}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-xl space-y-4 hover:border-[var(--primary)]/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[var(--text-primary)]">
                  {diff.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. 11-THEME LIVE SHOWCASE GALLERY ── */}
      <section>
        <ThemeShowcaseGallery />
      </section>

      {/* ── 5. HOW IT WORKS (3-Step Pipeline) ── */}
      <section className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
            3 Simple Steps to Your Live Digital Brand
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Go from zero to a live, high-converting portfolio website in under 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {creationSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-[var(--primary)]">
                  {step.step}
                </span>
                <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
              </div>
              <h4 className="text-base font-black text-[var(--text-primary)]">
                {step.title}
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. FAQ ACCORDION ── */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-3">
          {manifest.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[var(--text-primary)]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-[var(--primary)]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] pt-3 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 7. FINAL LAUNCH CTA BANNER ── */}
      <section className="rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden border border-emerald-500/20">
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Ready to Build Your High-Impact Digital Portfolio?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-normal">
            Join thousands of senior engineers, designers, and tech professionals showcasing their work with verified proof and 24/7 AI concierges.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/profile/studio"
              className="px-8 py-4 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-50 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Enter Identity Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProfileLandingPage;
