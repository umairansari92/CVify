import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Analyze Resume [V3]
export const analyzeResumeV3Async = createAsyncThunk(
  "ats/analyzeV3",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/ats/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Analysis failed");
    }
  }
);

// Analyze Platform Resume [V2]
export const analyzePlatformResumeAsync = createAsyncThunk(
  "ats/analyzePlatform",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/resume-intelligence/job-match", payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Platform analysis failed");
    }
  }
);

// Fetch Latest Analysis [V3]
export const fetchLatestAnalysis = createAsyncThunk(
  "ats/fetchLatest",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/ats/history");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "History fetch failed");
    }
  }
);

const atsSlice = createSlice({
  name: "ats",
  initialState: {
    latestResult: null,
    history: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAtsResult: (state) => {
      state.latestResult = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Analyze Resume
      .addCase(analyzeResumeV3Async.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeResumeV3Async.fulfilled, (state, action) => {
        state.loading = false;
        // Store only the scan data, not the whole response
        state.latestResult = action.payload.scan || action.payload;
      })
      .addCase(analyzeResumeV3Async.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch History
      .addCase(fetchLatestAnalysis.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      // Analyze Platform Resume
      .addCase(analyzePlatformResumeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzePlatformResumeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.latestResult = action.payload.scan || action.payload; // Unified with upload logic
      })
      .addCase(analyzePlatformResumeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAtsResult } = atsSlice.actions;
export default atsSlice.reducer;
