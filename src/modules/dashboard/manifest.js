export const manifest = {
  id: "DASHBOARD_COMMAND_CENTER",
  name: "Command Center",
  description: "Career Operating System Home Screen & Executive AI Intelligence Hub.",
  version: "1.0.0",
  icon: "FaHome",
  color: "#3B82F6",
  status: "active",
  owner: "core-platform-team",
  permissions: ["user", "premium", "admin"],
  routes: {
    main: "/dashboard",
  },
  navigation: {
    sidebarGroup: "Career OS",
    order: 0,
  },
  features: ["AI Copilot Feed", "Activity Timeline", "Career Health Radar", "Widget Framework"],
  analytics: {
    events: ["DASHBOARD_VIEWED", "WIDGET_INTERACTED"],
  },
};
