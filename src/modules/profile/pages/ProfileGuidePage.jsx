import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Target,
  Zap,
  Layers,
  Award,
  Bot,
  Palette,
  Lightbulb,
  ExternalLink,
  BookOpen,
} from "lucide-react";

export const ProfileGuidePage = () => {
  const masterRules = [
    {
      num: "01",
      title: "Lead With Value, Not Just Job Titles",
      desc: "Instead of just writing 'Software Developer', craft a crisp value proposition: 'Architecting high-scale MERN web applications and generative AI systems with 99.9% uptime.'",
      icon: Target,
    },
    {
      num: "02",
      title: "Quantify Every Bullet Point",
      desc: "Formula: Action Verb + Task Performed + Quantifiable Business Impact ($ or % or scale). Example: 'Engineered Redis caching layer reducing API response latency by 45% for 200k daily users.'",
      icon: Zap,
    },
    {
      num: "03",
      title: "Highlight 3–6 Production-Grade Projects",
      desc: "Recruiters favor 3 deep, fully working systems over 15 unfinished tutorials. Always include live demo URLs, screenshots, clean tech stacks, and source repositories.",
      icon: Layers,
    },
    {
      num: "04",
      title: "Enable 24/7 AI Concierge with High Context",
      desc: "Keep the AI Portfolio Guide active so international recruiters can query your specific skills, system scale, and architectural decisions even while you are asleep.",
      icon: Bot,
    },
    {
      num: "05",
      title: "Match Your Theme to Your Career Persona",
      desc: "Developers love 'NOIR' or 'CYBERNEON'; Executives and Consultants thrive on 'ORIENTAL LUXE'; Tech leads prefer 'APEX'. Pick a theme that mirrors your professional caliber.",
      icon: Palette,
    },
  ];

  return (
    <div className="space-y-12 py-6 max-w-5xl mx-auto text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          Candidate Masterclass
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
          How to Build a 100% Score Digital Portfolio
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl font-normal">
          Follow these 5 architectural principles to turn your CVify profile into an inbound interview magnet.
        </p>

        <div className="pt-2 flex items-center gap-4">
          <Link
            to="/profile/studio"
            className="px-6 py-3 rounded-xl bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[var(--primary-hover)] transition-all shadow-md"
          >
            <span>Open Studio Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/profile"
            className="px-5 py-3 rounded-xl bg-[var(--surface-muted)] text-[var(--text-primary)] text-xs font-bold border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-all"
          >
            <span>View Field-by-Field Breakdown</span>
          </Link>
        </div>
      </div>

      {/* 5 Core Rules */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-[var(--text-primary)]">
          The 5 Pillars of High-Converting Profiles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {masterRules.map((rule) => {
            const Icon = rule.icon;
            return (
              <div
                key={rule.num}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 shadow-lg space-y-4 hover:border-[var(--primary)]/40 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-[var(--primary)]">
                    {rule.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-base font-black text-[var(--text-primary)]">
                  {rule.title}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                  {rule.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pro Advice Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
        <div className="flex items-center gap-2 text-sm font-black text-emerald-600 dark:text-emerald-400">
          <Lightbulb className="w-5 h-5" />
          Pro Recruiter Advice: The 3-Second Rule
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
          When hiring managers open your public URL (`/p/yourname`), they immediately scan three elements: your profile picture for professionalism, your value proposition for relevance, and your featured projects for architectural proof. Make sure those 3 tabs are 100% completed.
        </p>
      </div>

    </div>
  );
};

export default ProfileGuidePage;
