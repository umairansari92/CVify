import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Eye, Check, Palette } from "lucide-react";

export const THEMES_LIST = [
  {
    id: "NOIR",
    name: "Noir",
    vibe: "Minimalist High-Contrast Black",
    category: "Minimalist",
    accent: "#FF2E0C",
    bg: "#09090b",
    tag: "Most Popular for Developers",
    desc: "Ultra-sleek monochrome palette with vibrant red accents and distraction-free typography.",
  },
  {
    id: "ORIENTAL LUXE",
    name: "Oriental Luxe",
    vibe: "Emerald & Brushed Gold Elegance",
    category: "Glassmorphism",
    accent: "#B58953",
    bg: "#0e1a14",
    tag: "Executive & Consulting",
    desc: "Opulent emerald backdrop with gold foil accents, frosted glass containers, and smooth serif headings.",
  },
  {
    id: "APEX",
    name: "Apex",
    vibe: "Clean Modern SaaS Portfolio",
    category: "Classic",
    accent: "#3B82F6",
    bg: "#0B0F19",
    tag: "Tech Leads & Engineers",
    desc: "Vercel/Linear inspired typography with dynamic metric badges, interactive timelines, and crisp dividers.",
  },
  {
    id: "CYBERNEON",
    name: "Cyberneon",
    vibe: "Futuristic Cyberpunk Terminal",
    category: "Glassmorphism",
    accent: "#00FF9D",
    bg: "#050811",
    tag: "Web3 & AI Specialists",
    desc: "Glowing neon borders, interactive retro terminal elements, and particle shader backdrops.",
  },
  {
    id: "MIDNIGHT DEV",
    name: "Midnight Dev",
    vibe: "Deep Indigo & Electric Cyan",
    category: "Minimalist",
    accent: "#06B6D4",
    bg: "#030712",
    tag: "Full Stack & DevOps",
    desc: "Deep space blue background with cyan code chips and glowing action buttons.",
  },
  {
    id: "CORPORATE GOLD",
    name: "Corporate Gold",
    vibe: "Structured Enterprise Leadership",
    category: "Classic",
    accent: "#F59E0B",
    bg: "#111827",
    tag: "Managers & C-Suite",
    desc: "Stately golden accents with structured portfolio tables and executive summary hero styling.",
  },
  {
    id: "CREATIVE SUNSET",
    name: "Creative Sunset",
    vibe: "Warm Amber & Rose Gradients",
    category: "Glassmorphism",
    accent: "#F43F5E",
    bg: "#180D1B",
    tag: "Designers & Product Managers",
    desc: "Rich sunset gradient glows with smooth frosted cards and artistic typography.",
  },
  {
    id: "EMERALD LEADER",
    name: "Emerald Leader",
    vibe: "Sage Green & Growth Accents",
    category: "Classic",
    accent: "#10B981",
    bg: "#061A14",
    tag: "Fintech & Data Science",
    desc: "Growth-inspired emerald tones with quantitative metric rings and proof-point counters.",
  },
];

export const ThemeShowcaseGallery = () => {
  const [selectedTheme, setSelectedTheme] = useState(THEMES_LIST[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
          <Palette className="w-3.5 h-3.5" />
          11 Handcrafted Visual Themes
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
          One Click Transforms Your Entire Portfolio.
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Switch skins instantly with zero content loss. Every theme includes responsive mobile layouts, 60fps animations, and custom color override support.
        </p>
      </div>

      {/* Theme Picker Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {THEMES_LIST.map((theme) => {
          const isSelected = selectedTheme.id === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme)}
              className={`p-4 rounded-2xl text-left border transition-all duration-300 relative group overflow-hidden ${
                isSelected
                  ? "bg-[var(--surface-elevated)] border-[var(--primary)] shadow-xl ring-2 ring-[var(--primary)]/20 scale-[1.02]"
                  : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: theme.accent }}
                />
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-[10px] font-bold">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>

              <h4 className="text-xs sm:text-sm font-black text-[var(--text-primary)] mb-1">
                {theme.name}
              </h4>
              <p className="text-[11px] text-[var(--text-secondary)] truncate">
                {theme.category}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Theme Preview Card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none"
          style={{ backgroundColor: selectedTheme.accent }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[var(--surface-muted)] border border-[var(--border)] text-xs font-bold text-[var(--text-secondary)]">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: selectedTheme.accent }}
              />
              {selectedTheme.tag}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
              Theme: {selectedTheme.name}
            </h3>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-normal">
              {selectedTheme.desc}
            </p>

            <div className="space-y-2 pt-2 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Zero Keystroke Parent State Pollution (React Hook Form)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Responsive from 320px to 1920px (Mobile-First)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>60fps Framer Motion Hardware-Accelerated Transitions</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/profile/studio"
                className="px-6 py-3 rounded-xl bg-[var(--primary)] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[var(--primary-hover)] transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                <Palette className="w-4 h-4" />
                <span>Customize in Studio</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              className="rounded-2xl p-6 border shadow-2xl relative overflow-hidden transition-all duration-500 space-y-4"
              style={{
                backgroundColor: selectedTheme.bg,
                borderColor: `${selectedTheme.accent}33`,
              }}
            >
              {/* Simulated Theme Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center font-bold text-white text-xs"
                    style={{ borderColor: selectedTheme.accent }}
                  >
                    UA
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-white">Umair Ahmed</h5>
                    <p className="text-[10px] text-white/60">Full Stack & AI Engineer</p>
                  </div>
                </div>
                <span
                  className="text-[10px] font-black px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: selectedTheme.accent }}
                >
                  OPEN TO WORK
                </span>
              </div>

              {/* Simulated Value Prop */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <p className="text-[11px] font-bold text-white/90">
                  "Architecting scalable MERN systems and autonomous AI recruiter concierges."
                </p>
                <div className="flex items-center gap-2 text-[10px] text-white/60">
                  <span>ATS Score: 95%</span>
                  <span>•</span>
                  <span>Data Scale: 6.4M</span>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["React", "Node.js", "MongoDB", "AI Agent", "Tailwind"].map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeShowcaseGallery;
