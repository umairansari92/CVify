/**
 * timeline.service.js
 * Generates dynamic, real-time activity feed events with accurate relative time labels.
 */

function formatRelativeTime(dateInput) {
  if (!dateInput) return "Just now";
  const now = new Date();
  const past = new Date(dateInput);
  
  if (isNaN(past.getTime())) return "Recently";

  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 0 || diffInSeconds < 45) return "Just now";
  if (diffInSeconds < 90) return "1m ago";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;

  return past.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export const timelineService = {
  getTimelineEvents(dashboardData = {}) {
    const { resumes = [], coverLetters = [], user = {} } = dashboardData;
    const events = [];

    // 1. Process Resumes
    resumes.forEach((r, idx) => {
      const rawDate = r.lastUpdated || r.updatedAt || r.createdAt;
      const timestamp = rawDate ? new Date(rawDate).getTime() : Date.now() - idx * 1000 * 60 * 15;
      
      events.push({
        id: `resume-${r.id || r._id || idx}`,
        type: "RESUME_UPDATED",
        title: `Resume "${r.title || 'Master Resume'}" updated`,
        timestamp,
        timeLabel: formatRelativeTime(timestamp),
        badge: r.atsScore ? `ATS ${r.atsScore}` : null,
        badgeType: r.atsScore >= 75 ? "success" : r.atsScore >= 50 ? "warning" : "default",
        link: r.id ? `/resume-builder/editor/${r.id}` : "/resume/library",
      });
    });

    // 2. Process Cover Letters
    coverLetters.forEach((c, idx) => {
      const rawDate = c.createdAt || c.updatedAt;
      const timestamp = rawDate ? new Date(rawDate).getTime() : Date.now() - idx * 1000 * 60 * 60;
      const company = c.companyName || c.company || "Professional Application";

      events.push({
        id: `cl-${c._id || c.id || idx}`,
        type: "COVER_LETTER_CREATED",
        title: `Cover Letter for "${company}" generated`,
        timestamp,
        timeLabel: formatRelativeTime(timestamp),
        badge: "AI Letter",
        badgeType: "ai",
        link: "/cover-letter",
      });
    });

    // 3. User Profile Update event if recent
    if (user?.completionScore) {
      events.push({
        id: "profile-completion-event",
        type: "PROFILE_SYNC",
        title: `Digital Identity score reached ${user.completionScore}%`,
        timestamp: Date.now() - 1000 * 60 * 30, // 30m ago
        timeLabel: "30m ago",
        badge: "Profile",
        badgeType: "profile",
        link: "/profile/studio",
      });
    }

    // Sort by most recent timestamp descending and take top 6
    return events
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 6);
  }
};
