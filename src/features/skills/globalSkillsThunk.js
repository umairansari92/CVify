import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchAllGlobalSkills = createAsyncThunk(
  "globalSkills/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/skills/search"); // No 'q' means return all (up to 1000)
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || "Failed to fetch skills");
    }
  }
);
