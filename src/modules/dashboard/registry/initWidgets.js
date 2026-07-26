import { WidgetRegistry } from "./WidgetRegistry";

import { ProfileWidget } from "../widgets/ProfileWidget";
import { CommandCenterWidget } from "../widgets/CommandCenterWidget";
import { CareerMetricsWidget } from "../widgets/CareerMetricsWidget";
import { ResumeOverviewWidget } from "../widgets/ResumeOverviewWidget";
import { AICopilotWidget } from "../widgets/AICopilotWidget";
import { ActivityTimelineWidget } from "../widgets/ActivityTimelineWidget";
import { MilestonesWidget } from "../widgets/MilestonesWidget";
import { ModuleLauncherWidget } from "../widgets/ModuleLauncherWidget";

export const initializeDashboardWidgets = () => {
  // P0 Hero Widgets
  WidgetRegistry.registerWidget({
    id: "profile-widget",
    title: "Your Profile",
    priority: "P0",
    span: { default: 12, xl: 4 },
    component: ProfileWidget,
  });

  WidgetRegistry.registerWidget({
    id: "command-center",
    title: "Command Center",
    priority: "P0",
    span: { default: 12, xl: 8 },
    component: CommandCenterWidget,
  });

  WidgetRegistry.registerWidget({
    id: "career-metrics",
    title: "Career Metrics",
    priority: "P0",
    span: { default: 12 },
    component: CareerMetricsWidget,
  });

  // P1 Primary Widgets
  WidgetRegistry.registerWidget({
    id: "resume-overview",
    title: "Active Resumes",
    priority: "P1",
    span: { default: 12, xl: 8 },
    component: ResumeOverviewWidget,
  });

  WidgetRegistry.registerWidget({
    id: "ai-copilot",
    title: "AI Recommendations",
    priority: "P1",
    span: { default: 12, xl: 4 },
    component: AICopilotWidget,
  });

  WidgetRegistry.registerWidget({
    id: "activity-timeline",
    title: "Recent Activity Timeline",
    priority: "P1",
    span: { default: 12, md: 6 },
    component: ActivityTimelineWidget,
  });

  // P2 Secondary Widgets
  WidgetRegistry.registerWidget({
    id: "milestones",
    title: "Achievements",
    priority: "P2",
    span: { default: 12, md: 6 },
    component: MilestonesWidget,
  });

  WidgetRegistry.registerWidget({
    id: "module-launcher",
    title: "Career OS Modules",
    priority: "P2",
    span: { default: 12 },
    component: ModuleLauncherWidget,
  });
};
