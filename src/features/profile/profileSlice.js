import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

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
      return { field, index, optimizedBullets };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to apply fix");
    }
  }
);

// Slogans Builder Thunks [V4.3]
export const deleteSloganThunk = (index) => async (dispatch, getState) => {
  const { activeProfile } = getState().profile;
  const newSlogans = (activeProfile.heroSlogans || []).filter((_, i) => i !== index);
  dispatch(updateActiveProfileLocally({ heroSlogans: newSlogans }));
  await api.patch("/auth/profile", { heroSlogans: newSlogans });
};

export const addSloganThunk = (slogan) => async (dispatch, getState) => {
  const { activeProfile } = getState().profile;
  const newSlogans = [...(activeProfile.heroSlogans || []), slogan].slice(0, 5);
  dispatch(updateActiveProfileLocally({ heroSlogans: newSlogans }));
  await api.patch("/auth/profile", { heroSlogans: newSlogans });
};

export const updateHeroImageThunk = (imageUrl) => async (dispatch) => {
  dispatch(updateActiveProfileLocally({ profileImage: imageUrl }));
  await api.patch("/auth/profile", { profileImage: imageUrl });
};

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
    isProjectModalOpen: false, // V4.3 Surgery Mode 
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
    },
    setProjectModal: (state, action) => {
      state.isProjectModalOpen = action.payload;
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

export const { clearActiveProfile, updateActiveProfileLocally, setProjectModal } = profileSlice.actions;

// Project Showcase Thunks [V4.3 Surgery Mode]
export const openProjectModalThunk = () => (dispatch) => dispatch(setProjectModal(true));
export const closeProjectModalThunk = () => (dispatch) => dispatch(setProjectModal(false));

export const deleteProjectThunk = (projectId) => async (dispatch, getState) => {
  const { activeProfile } = getState().profile;
  if (!activeProfile) return;

  // Optimistic UI Update
  const updatedPortfolio = (activeProfile.portfolio || []).filter(p => p._id !== projectId);
  const updatedProjects = (activeProfile.projects || []).filter(p => p._id !== projectId);
  
  dispatch(updateActiveProfileLocally({ 
    portfolio: updatedPortfolio,
    projects: updatedProjects
  }));

  try {
    await api.delete(`/auth/projects/${projectId}`);
    toast.success("Project Decoupled.");
  } catch (err) {
    toast.error("Deep Delete failed.");
    // Revert on failure
    dispatch(fetchPublicProfile(activeProfile.username));
  }
};

export default profileSlice.reducer;
