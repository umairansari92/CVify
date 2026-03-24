import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchAllGlobalSkills } from "./globalSkillsThunk";

const initialState = {
  skills: [],
  loading: false,
  loaded: false,
  lastFetched: null,
  error: null,
};

const globalSkillsSlice = createSlice({
  name: "globalSkills",
  initialState,
  reducers: {
    addSkillToCache: (state, action) => {
      // Optimistically add to local cache if it doesn't exist
      const skill = action.payload;
      if (!state.skills.includes(skill)) {
        state.skills = [...state.skills, skill].sort();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGlobalSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllGlobalSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.skills = action.payload.sort();
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchAllGlobalSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export { fetchAllGlobalSkills };
export const { addSkillToCache } = globalSkillsSlice.actions;
export default globalSkillsSlice.reducer;

// Memoized Selectors (V6.0 Optimization)
const selectGlobalSkillsState = (state) => state.globalSkills;

export const selectAllSkills = createSelector(
  [selectGlobalSkillsState],
  (globalSkills) => globalSkills.skills || []
);

export const selectIsSkillsLoaded = createSelector(
  [selectGlobalSkillsState],
  (globalSkills) => globalSkills.loaded
);

export const selectSkillsLoading = createSelector(
  [selectGlobalSkillsState],
  (globalSkills) => globalSkills.loading
);
