export const metricsService = {
  getMetricsData(dashboardData = {}) {
    const { resumes = [], coverLetters = [], stats = {}, user = {} } = dashboardData;
    const healthScore = user?.completionScore || 0;
    const hiringProbability = user?.completionScore ? Math.min(Math.round(user.completionScore * 1.1), 99) : 45;

    return {
      healthScore,
      hiringProbability,
      resumesCount: resumes.length,
      atsScansCount: stats?.totalScans || 0,
      coverLettersCount: coverLetters.length,
      credits: user?.diamonds || 0,
    };
  }
};
