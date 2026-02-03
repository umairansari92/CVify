import { createSlice } from "@reduxjs/toolkit";
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
        templateId: "classic",
      };
    },
    initResumeWithData(state, action) {
      state.currentResume = {
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
        state.error = action.payload;
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
        state.error = action.payload;
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
