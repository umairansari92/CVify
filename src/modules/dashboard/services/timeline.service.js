export const timelineService = {
  getTimelineEvents(dashboardData = {}) {
    const { resumes = [], coverLetters = [] } = dashboardData;
    const events = [];

    resumes.forEach((r) => {
      events.push({
        id: `resume-${r.id}`,
        type: "RESUME_UPDATED",
        title: `Resume "${r.title}" updated`,
        timestamp: r.updatedAt || Date.now(),
        timeLabel: "Recent",
        badge: r.atsScore ? `ATS ${r.atsScore}` : null,
      });
    });

    coverLetters.forEach((c) => {
      events.push({
        id: `cl-${c._id || c.id}`,
        type: "COVER_LETTER_CREATED",
        title: `Cover Letter for "${c.company || 'Company'}" generated`,
        timestamp: c.createdAt || Date.now(),
        timeLabel: "Recent",
      });
    });

    return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);
  }
};
