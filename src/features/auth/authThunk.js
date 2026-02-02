import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signup", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Signup failed. Please try again.",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    }
  },
);
