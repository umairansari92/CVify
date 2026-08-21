/**
 * manifest.js — Digital Identity & Portfolio Lab Module Manifest
 * Constitution Chapter 15 & 22.2 compliant.
 *
 * Single source of truth for the Profile / Digital Identity module.
 * Used by: Sidebar, Dashboard, AppRouter, Analytics, Feature Flags.
 */

export const manifest = {
  id: "PROFILE_STUDIO",
  name: "Digital Identity & Portfolio Lab",
  tagline: "Turn your experience into an interactive, AI-powered public portfolio website.",
  version: "2.0.0",
  icon: "FaUser",
  color: "#66907D", // Sage brand color
  status: "active", // active | beta | coming_soon

  /** Canonical route map (Constitution Ch.5 & ROUTING.md) */
  routes: {
    landing: "/profile",           // Standalone product guide & showcase page
    studio: "/profile/studio",      // Full 11-tab Digital Identity Studio
    guide: "/profile/guide",        // Educational onboarding & portfolio masterclass
    analytics: "/profile/analytics",// Visitor stats, recruiter impressions & ATS analytics
    publicProfile: "/p/:username",  // Live public portfolio theme output
  },

  /** Sidebar navigation entry */
  navigation: {
    label: "Digital Identity",
    icon: "FaUser",
    children: [
      { path: "/profile", label: "Studio Overview & Guide" },
      { path: "/profile/studio", label: "Identity Studio" },
      { path: "/profile/analytics", label: "Profile Analytics" },
      { path: "/profile/guide", label: "Optimization Masterclass" },
    ],
  },

  /** Feature flags — checked client-side */
  featureFlags: {
    customDomain: false,          // v2.2
    aiRecruiterAgent: true,       // 24/7 AI chat guide
    realtimeSync: true,           // Live sync to /p/:username
    multiThemeEngine: true,       // 11 Themes supported
    atsVerificationBadge: true,   // Verified ATS Score on live portfolio
    customPalettes: true,         // Custom hex brand colors
  },

  /** Required user plans */
  requiredPlans: ["free", "pro", "enterprise"],

  /** Module features list */
  features: [
    "11 One-Click Handcrafted Themes (Noir, Oriental Luxe, Apex, Cyberneon, etc.)",
    "24/7 Autonomous AI Recruiter Concierge with custom replies quota",
    "Verified ATS Compatibility & Measurable Proof Points",
    "Interactive Project Showcase with Live & Repo Deep Links",
    "Technical Arsenal & Strategic Mindset categorization",
    "Real-time Instant Synchronization with Public Portfolio URL (/p/:username)",
    "Comprehensive Recruiter & Visitor Impression Analytics",
  ],

  /** Module FAQs (Constitution Ch.15 — minimum 5) */
  faqs: [
    {
      q: "What is the difference between CVify Digital Identity and a standard PDF resume?",
      a: "A PDF resume is static and linear, while your CVify Digital Identity is a live, interactive web application featuring 11 bespoke themes, verified ATS proof points, project showcase links, and an autonomous 24/7 AI agent that pitches your skills to recruiters directly.",
    },
    {
      q: "How does the public portfolio URL work?",
      a: "Every user claims a unique slug (e.g. cvifypro.app/p/yourname). Any edits you make in the 11 Studio tabs are synchronized instantly without needing manual redeployments or server builds.",
    },
    {
      q: "How does the AI Portfolio Guide interact with recruiters?",
      a: "Your profile embeds an intelligent AI chat concierge powered by your actual experience, skills, and projects. When recruiters visit your portfolio, they can ask specific questions like 'Does Umair have experience scaling MongoDB to 1M users?' and receive verified, accurate responses.",
    },
    {
      q: "Can I customize the colors and fonts of my selected theme?",
      a: "Yes! In the Theme Designer tab, you can choose from 11 presets and fine-tune your Hero Gradients, Primary Accent color, Typography (Outfit, Inter, JetBrains Mono), and Component Aesthetics (Glassmorphism, Minimalist, Classic).",
    },
    {
      q: "Is my personal contact information safe from scrapers?",
      a: "Yes. Your email and phone are protected, and recruiter outreach is channeled through a verified contact form with optional anti-spam filtering and rate controls.",
    },
    {
      q: "How do the ATS score and verified data points appear on my portfolio?",
      a: "When you run an ATS audit on your resume, you can feature your verified ATS compatibility badge (e.g., 95% ATS Score) and quantifiable data scale (e.g., 6.4M records processed) directly in your hero branding header.",
    },
  ],
};
