import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, verifyOtp, getMe } from "./authThunk";

const getSafeToken = () => {
  const token = localStorage.getItem("token");
  if (!token || token === "undefined") return null;
  return token;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: getSafeToken(),
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    updateDiamonds(state, action) {
      if (state.user) state.user.diamonds = action.payload;
    },
    updateUser(state, action) {
      // Merge updated user fields into existing state (keeps token intact)
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { user, token } = action.payload;
        if (token) {
          state.user = user;
          state.token = token;
          localStorage.setItem("token", token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        const { user, token } = action.payload;
        if (token) {
          state.user = user;
          state.token = token;
          localStorage.setItem("token", token);
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        const { user, token } = action.payload;
        if (token) {
          state.user = user;
          state.token = token;
          localStorage.setItem("token", token);
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export const { logout, updateDiamonds, updateUser } = authSlice.actions;
export default authSlice.reducer;
