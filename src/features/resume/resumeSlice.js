import { createSlice, createSelector } from "@reduxjs/toolkit";
import {
  createResume,
  getMyResumes,
  getResumeById,
  updateResume,
  deleteResume,
  cloneResume,
} from "./resumeThunk";

const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    resumes: [],
    currentResume: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentResume(state) {
      state.currentResume = null;
    },
    initNewResume(state) {
      state.currentResume = {
        personalInfo: {
          fullName: "",
          email: "",
          phone: "",
          location: "",
          jobTitle: "",
          linkedin: "",
          github: "",
          portfolio: "",
          profileSummary: "",
        },
        education: [],
        experience: [],
        skills: [], // Universal flat skills array (any profession)
        technicalSkills: {
          frontend: [],
          backend: [],
          database: [],
          aiDevOps: [],
          tools: [],
        },
        projects: [],
        competencies: [],
        softwareProficiency: [],
        customSections: [], // Array of { id, title, content: [] }
        themeColor: "#0f172a", // Default slate-900
        fontFamily: "Inter", // Default sans-serif
        nameSize: 24,
        headingSize: 16,
        bodySize: 10,
        margin: 15,
        templateId: "classic",
      };
    },
    initResumeWithData(state, action) {
      state.currentResume = {
        themeColor: "#0f172a",
        fontFamily: "Inter",
        nameSize: 24,
        headingSize: 16,
        bodySize: 10,
        margin: 15,
        customSections: [],
        ...action.payload.data,
        templateId: action.payload.templateId,
      };
    },
    setResumeField(state, action) {
      if (state.currentResume) {
        state.currentResume[action.payload.field] = action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(createResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes.push(action.payload);
      })
      .addCase(createResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload;
      })

      // GET ALL
      .addCase(getMyResumes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      .addCase(getMyResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ONE
      .addCase(getResumeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getResumeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResume = action.payload;
      })
      .addCase(getResumeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateResume.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResume = action.payload;
        state.resumes = state.resumes.map((r) =>
          r._id === action.payload._id ? action.payload : r,
        );
      })

      // DELETE
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.resumes = state.resumes.filter((r) => r._id !== action.payload);
      })
      // CLONE
      .addCase(cloneResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(cloneResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes.push(action.payload);
      })
      .addCase(cloneResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload;
      });
  },
});

export const {
  clearCurrentResume,
  initNewResume,
  initResumeWithData,
  setResumeField,
} = resumeSlice.actions;
export default resumeSlice.reducer;

// Memoized Selectors (V6.0 Optimization)
const selectResumeState = (state) => state.resume;

export const selectAllResumes = createSelector(
  [selectResumeState],
  (resume) => resume.resumes || []
);

export const selectCurrentResume = createSelector(
  [selectResumeState],
  (resume) => resume.currentResume
);

export const selectResumeLoading = createSelector(
  [selectResumeState],
  (resume) => resume.loading
);

export const selectResumeError = createSelector(
  [selectResumeState],
  (resume) => resume.error
);
