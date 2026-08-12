export const manifest = {
  id: "ATS_INTELLIGENCE",
  name: "ATS Intelligence",
  description: "Scan and score your resume against any Job Description using advanced AI.",
  version: "1.0.0",
  icon: "HiOutlineChartBar", // We'll map this string to a React icon component in the UI
  color: "#10B981", // Tailwind emerald-500 equivalent
  status: "active",
  owner: "career-tools-team",
  permissions: ["user", "premium"],
  routes: {
    main: "/ats",
    workspace: "/ats/scan",
    reports: "/ats/reports",
    history: "/ats/history",
    guide: "/ats/guide"
  },
  navigation: {
    sidebarGroup: "Career Tools",
    order: 2
  },
  features: ["Keyword Gap Analysis", "ATS Score", "AI Recommendations"],
  analytics: {
    events: ["ATS_SCAN_RUN", "REPORT_VIEWED"]
  },
  aiCapabilities: ["Semantic Matching", "Keyword Extraction"],
  dependencies: ["ai-client"],
  requiredPlans: ["free", "pro"],
  featureFlags: {
    useDeepSeekModel: true
  }
};
