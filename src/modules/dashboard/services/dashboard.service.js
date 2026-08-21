import { profileService } from "./profile.service";
import { metricsService } from "./metrics.service";
import { timelineService } from "./timeline.service";
import { copilotService } from "./copilot.service";
import { launcherService } from "./launcher.service";

export const dashboardService = {
  composeDashboardState(user, dashboardData) {
    return {
      profile: profileService.getProfileData(user),
      metrics: metricsService.getMetricsData(dashboardData),
      timeline: timelineService.getTimelineEvents(dashboardData),
      recommendations: copilotService.getRecommendations(dashboardData),
      modules: launcherService.getActiveModules(),
      resumes: dashboardData?.resumes || [],
      coverLetters: dashboardData?.coverLetters || [],
      quests: dashboardData?.quests || [],
      stats: dashboardData?.stats || {},
      economy: dashboardData?.economy || {},
    };
  }
};
