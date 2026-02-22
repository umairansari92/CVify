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
      const errorData = err.response?.data;
      const message = errorData?.message || "Login failed. Please check your credentials.";
      if (errorData?.code === "EMAIL_NOT_VERIFIED" && errorData?.email) {
        return rejectWithValue({ message, email: errorData.email, code: "EMAIL_NOT_VERIFIED" });
      }
      return rejectWithValue(message);
    }
  },
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Invalid or expired OTP.",
      );
    }
  },
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      await api.post("/auth/resend-otp", { email });
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to resend OTP.",
      );
    }
  },
);
