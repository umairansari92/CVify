import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/**
 * adminDashboardThunk - The Unified Platform Orchestrator
 * 
 * Hits the BFF v1 endpoint to fetch platform stats, insights, and users 
 * in a single network round-trip.
 */
export const fetchAdminDashboardData = createAsyncThunk(
  "adminDashboard/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/v1/bff/admin/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to sync admin platform state"
      );
    }
  }
);

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState: {
    stats: null,
    insights: [],
    users: [],
    smartAnalytics: null,
    meta: null,
    loading: true,
    error: null,
    lastUpdated: null
  },
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboardData.pending, (state) => {
        state.loading = true;
         state.error = null;
      })
      .addCase(fetchAdminDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.insights = action.payload.insights;
        state.users = action.payload.users;
        state.smartAnalytics = action.payload.smartAnalytics;
        state.meta = action.payload.meta;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchAdminDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAdminError } = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;
