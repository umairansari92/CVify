export const copilotService = {
  getRecommendations(dashboardData = {}) {
    return [
      {
        id: "rec-1",
        title: "Improve React & Node.js achievements",
        description: "Adding quantified metrics to experience increases ATS score by +8%.",
        impact: "+8 ATS Boost",
        estTime: "12 min",
        path: "/resume-builder",
        actionText: "Start",
      },
      {
        id: "rec-2",
        title: "Generate Tailored Cover Letter",
        description: "Cover letters increase callback rates by 40% for Senior MERN roles.",
        impact: "+40% Callbacks",
        estTime: "5 min",
        path: "/cover-letter",
        actionText: "Generate",
      },
      {
        id: "rec-3",
        title: "Scan Target Job Description",
        description: "Your profile matches 88% of Karachi MERN roles. Target job scan recommended.",
        impact: "Target Match",
        estTime: "3 min",
        path: "/ats",
        actionText: "Scan Now",
      },
    ];
  }
};
