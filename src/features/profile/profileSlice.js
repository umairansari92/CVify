import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Fetch public profile by username
export const fetchPublicProfile = createAsyncThunk(
  "profile/fetchPublic",
  async (username, { rejectWithValue }) => {
    try {
      const response = await api.get(`/auth/public/${username}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Profile not found");
    }
  }
);

// Apply AI Suggestion Fix
export const applyAtsFix = createAsyncThunk(
  "profile/applyFix",
  async ({ field, index, jobDescription, bulletPoints }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/ats/rewrite", {
        bulletPoints,
        jobDescription
      });
      
      const { optimizedBullets } = response.data;
      
      // Update local profile state
      if (index !== undefined) {
        // It's an array field (like experience responsibilities)
        // Note: The UI will handle the specific mapping, but we can pass the final updated array here if we wanted.
        // For simplicity, let's just return the new bullets and let the component handle the local update via updateActiveProfileLocally if needed, 
        // OR we can do the full patch here.
      }
      
      return { field, index, optimizedBullets };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to apply fix");
    }
  }
);

// Fetch private analytics (Owner only)
export const fetchProfileAnalytics = createAsyncThunk(
  "profile/fetchAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/profile-analytics/");
      return response.data.analytics;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Analytics failed");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profiles: {}, // Cache profiles by username: { 'username': data }
    activeProfile: null,
    analytics: { views: 0, resumeDownloads: 0, contactClicks: 0 },
    loading: false,
    error: null,
  },
  reducers: {
    clearActiveProfile: (state) => {
      state.activeProfile = null;
      state.error = null;
    },
    updateActiveProfileLocally: (state, action) => {
      if (state.activeProfile) {
        state.activeProfile = { ...state.activeProfile, ...action.payload };
        // Also update cache
        if (state.activeProfile.username) {
          state.profiles[state.activeProfile.username] = state.activeProfile;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Public Profile
      .addCase(fetchPublicProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.activeProfile = action.payload;
        state.profiles[action.payload.username] = action.payload;
      })
      .addCase(fetchPublicProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Analytics
      .addCase(fetchProfileAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      });
  },
});

export const { clearActiveProfile, updateActiveProfileLocally } = profileSlice.actions;
export default profileSlice.reducer;
