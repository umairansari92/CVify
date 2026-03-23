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
