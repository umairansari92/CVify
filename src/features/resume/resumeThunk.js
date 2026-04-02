import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// CREATE RESUME
export const createResume = createAsyncThunk(
  "resume/create",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.post("/resumes", data);
      if (res.data.diamonds !== undefined) {
        dispatch({ type: "auth/updateDiamonds", payload: res.data.diamonds });
      }
      return res.data.resume || res.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Failed to create resume",
        limitReached: err.response?.status === 403,
        details: err.response?.data,
      });
    }
  },
);

// GET USER RESUMES
export const getMyResumes = createAsyncThunk(
  "resume/getMy",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/resumes");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch resumes",
      );
    }
  },
);

// GET SINGLE RESUME
export const getResumeById = createAsyncThunk(
  "resume/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/resumes/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch resume details",
      );
    }
  },
);

// UPDATE RESUME
export const updateResume = createAsyncThunk(
  "resume/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/resumes/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update resume",
      );
    }
  },
);

// DELETE RESUME
export const deleteResume = createAsyncThunk(
  "resume/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/resumes/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete resume",
      );
    }
  },
);
// CLONE RESUME
export const cloneResume = createAsyncThunk(
  "resume/clone",
  async ({ id, useDiamonds }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.post(`/resumes/${id}/clone`, { useDiamonds });
      if (res.data.diamonds !== undefined) {
        dispatch({ type: "auth/updateDiamonds", payload: res.data.diamonds });
      }
      return res.data.resume || res.data;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Failed to clone resume",
        limitReached: err.response?.status === 403,
        details: err.response?.data,
      });
    }
  },
);
