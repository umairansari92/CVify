import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/**
 * dashboardThunk.js - The Unified Data Fetcher
 * 
 * Hits the BFF v1 endpoint to get the full View Model in one request.
 */
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/v1/bff/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard"
      );
    }
  }
);
