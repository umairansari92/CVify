import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchDashboardData } from "./dashboardThunk";

/**
 * dashboardSlice.js - The SaaS-Grade View Model Container
 * 
 * Stores the full dashboard contract for the v1 BFF.
 */

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: {
      user: null,
      economy: null,
      resumes: [],
      stats: null,
      meta: {
        partial: false,
        missing: [],
        cached: false,
        cacheAge: 0
      }
    },
    loading: false,
    isRefreshing: false, // For SWR silent refresh
    error: null,
    lastFetched: null
  },
  reducers: {
    clearDashboard(state) {
      state.data = null;
      state.lastFetched = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        // If we already have data (SWR), it's a silent refresh
        if (state.data.user) {
          state.isRefreshing = true;
        } else {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.isRefreshing = false;
        state.data = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.isRefreshing = false;
        state.error = action.payload;
      });
  },
});

export const { clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;

// Memoized Selectors for Performance
const selectDashboardState = (state) => state.dashboard;

export const selectDashboardData = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.data
);

export const selectDashboardLoading = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.loading
);

export const selectDashboardMeta = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.data.meta
);

export const selectIsRefreshing = createSelector(
  [selectDashboardState],
  (dashboard) => dashboard.isRefreshing
);
