/**
 * manifest.js — AI Resume Builder Module Manifest
 * Constitution Chapter 15 & 22.2 compliant.
 *
 * This manifest is the single source of truth for the Resume module.
 * Used by: Sidebar, Dashboard, AppRouter, Analytics, Feature Flags.
 */

export const manifest = {
  id: "RESUME_BUILDER",
  name: "AI Resume Builder",
  version: "1.0.0",
  icon: "FaFileAlt",
  color: "#6366f1",
  status: "active", // active | beta | coming_soon

  /** Canonical route map (Constitution Ch.5 & ROUTING.md) */
  routes: {
    landing: "/resume-builder",          // Standalone product page
    library: "/resume/library",          // ← Canonical: My Resumes
    create: "/resume-builder/create",    // Multi-step wizard
    editor: "/resume-builder/editor/:id", // Full-screen builder
  },

  /** Sidebar navigation entry */
  navigation: {
    label: "Resume",
    icon: "FaFileAlt",
    children: [
      { path: "/resume/library", label: "My Resumes" },
      { path: "/resume-builder/create", label: "Resume Builder" },
      { path: "/ats", label: "Resume Checker" },
    ],
  },

  /** Feature flags — checked client-side before rendering optional UI */
  featureFlags: {
    pdfThumbnails: true,
    aiInsights: true,
    folderSupport: false,       // v2.0 — not yet built
    versionHistory: false,      // v2.0 — not yet built
    exportDocx: false,          // v2.0 — not yet built
    bulkActions: false,         // v2.0 — not yet built
  },

  /** Required user plan to access */
  requiredPlans: ["free", "pro", "enterprise"],

  /** Resume module features list */
  features: [
    "AI-powered resume creation",
    "ATS compatibility scoring",
    "PDF upload & parsing",
    "Resume sharing with custom slug",
    "Resume cloning & versioning",
    "Multiple template support",
    "Real-time autosave",
  ],

  /** Module FAQs (Constitution Ch.15 — minimum 5) */
  faqs: [
    {
      q: "How does ATS scoring work?",
      a: "Our AI engine parses your resume against industry keyword databases and provides a compatibility score with actionable improvement suggestions.",
    },
    {
      q: "Can I upload an existing resume?",
      a: "Yes. Upload any PDF (max 5MB) and our AI parser will extract your experience, skills, and education automatically.",
    },
    {
      q: "How do I share my resume publicly?",
      a: "Open the ••• menu on any resume card and click 'Share Link'. You can generate a public URL with a custom slug.",
    },
    {
      q: "Is my resume data private by default?",
      a: "Yes. All resumes are private by default. You explicitly enable public sharing per resume.",
    },
    {
      q: "Can I create multiple resumes for different roles?",
      a: "Absolutely. Create unlimited tailored resumes, each with its own ATS score and sharing settings.",
    },
  ],
};
