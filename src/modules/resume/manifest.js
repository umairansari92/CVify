export const manifest = {
  id: "RESUME_BUILDER",
  name: "AI Resume Builder",
  description: "Create ATS-optimized resumes with AI-powered content generation.",
  version: "1.0.0",
  icon: "HiOutlineDocumentText", // We'll map this string to a React icon component in the UI
  color: "#3B82F6", // Tailwind blue-500 equivalent
  status: "active",
  owner: "career-tools-team",
  permissions: ["user", "premium"],
  routes: {
    main: "/resume",
    workspace: "/resume/editor",
    history: "/resume/history"
  },
  navigation: {
    sidebarGroup: "Career Tools",
    order: 1
  },
  features: ["AI Writing", "PDF Export", "Smart Formatting"],
  analytics: {
    events: ["RESUME_CREATED", "PDF_DOWNLOADED"]
  },
  aiCapabilities: ["Text Generation", "Grammar Check"],
  dependencies: ["pdf-worker"],
  requiredPlans: ["free", "pro"],
  featureFlags: {
    useNewEngine: true
  }
};
