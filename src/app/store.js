import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import resumeReducer from "../features/resume/resumeSlice";
import profileReducer from "../features/profile/profileSlice";
import atsReducer from "../features/ats/atsSlice";
import globalSkillsReducer from "../features/skills/globalSkillsSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import adminDashboardReducer from "../features/admin/adminDashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
    profile: profileReducer,
    ats: atsReducer,
    globalSkills: globalSkillsReducer,
    dashboard: dashboardReducer,
    adminDashboard: adminDashboardReducer,
  },
});
