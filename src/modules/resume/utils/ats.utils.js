/**
 * ats.utils.js — Resume Module ATS Display Utilities
 * Pure functions. No Redux. No side effects.
 */

/**
 * Returns a human-readable label and color for a given ATS score.
 * @param {number} score
 */
export const getAtsLabel = (score) => {
  if (!score || score === 0) return { label: "Not Scanned", color: "text-text-muted", bg: "bg-white/5", border: "border-border-subtle" };
  if (score >= 85) return { label: "Excellent", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
  if (score >= 70) return { label: "Good", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" };
  if (score >= 50) return { label: "Needs Work", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
  return { label: "Critical", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" };
};

/**
 * Estimates ATS improvement potential based on score.
 * @param {number} score
 */
export const getAtsPotential = (score) => {
  if (!score || score === 0) return null;
  if (score >= 90) return null;
  if (score >= 75) return `+${100 - score} possible`;
  if (score >= 50) return `+${Math.round((85 - score) * 0.8)} possible`;
  return `+${Math.round((70 - score) * 0.9)} possible`;
};

/**
 * Returns an AI insight suggestion based on ATS score.
 * @param {number} score
 */
export const getAiInsight = (score) => {
  if (!score || score === 0) return { text: "Run ATS scan to unlock insights", cta: "Scan Now →" };
  if (score >= 85) return null; // no insight needed
  if (score >= 70) return { text: "Add measurable achievements to boost score", cta: "Fix Now →" };
  if (score >= 50) return { text: "Missing key skills & metrics", cta: "Improve →" };
  return { text: "Resume needs significant improvements", cta: "Fix Critical Issues →" };
};

/**
 * Compute executive metrics from resumes array.
 * @param {Array} resumes
 */
export const computeMetrics = (resumes = []) => {
  const total = resumes.length;
  const scoredResumes = resumes.filter((r) => typeof r.atsScore === "number" && r.atsScore > 0);
  const avgAts = scoredResumes.length > 0
    ? Math.round(scoredResumes.reduce((acc, r) => acc + r.atsScore, 0) / scoredResumes.length)
    : 0;
  const bestAts = scoredResumes.length > 0
    ? Math.max(...scoredResumes.map((r) => r.atsScore))
    : 0;
  const bestResume = scoredResumes.find((r) => r.atsScore === bestAts) || null;
  const publicCount = resumes.filter((r) => r.sharing?.enabled).length;
  const privateCount = total - publicCount;

  return { total, avgAts, bestAts, bestResume, publicCount, privateCount };
};

/**
 * Format a timestamp into a human-friendly relative string.
 * @param {string|Date} date
 */
export const formatRelativeTime = (date) => {
  if (!date) return "Unknown";
  const now = Date.now();
  const diff = now - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
};
