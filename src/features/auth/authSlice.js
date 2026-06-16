import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, verifyOtp, getMe } from "./authThunk";
import api from "../../api/axios";

const getSafeToken = () => {
  // Token is now primarily managed via HttpOnly cookies.
  // We return null here so it doesn't read from localStorage,
  // but if you have a legacy fallback mechanism you could read it.
  // The user requested removing token storage from localStorage.
  return null;
};

const saveUserToLocalStorage = (user, token) => {
  // Token storage removed as per V6.0 SECURITY (HttpOnly cookies)
  if (user) {
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
    if (fullName) localStorage.setItem("Full name", fullName);
    if (user.email) localStorage.setItem("Email", user.email);
    if (user.phoneNumber) localStorage.setItem("Mobile Number", user.phoneNumber);
    if (user.location) localStorage.setItem("Location", user.location);
  }
};

const clearUserFromLocalStorage = () => {
  // Token storage removed as per V6.0 SECURITY (HttpOnly cookies)
  localStorage.removeItem("Full name");
  localStorage.removeItem("Email");
  localStorage.removeItem("Mobile Number");
  localStorage.removeItem("Location");
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
      clearUserFromLocalStorage();
      // Fire-and-forget to clear HttpOnly cookie on backend
      api.post("/auth/logout").catch(console.error);
    },
    updateDiamonds(state, action) {
      if (state.user) state.user.diamonds = action.payload;
    },
    updateUser(state, action) {
      // Merge updated user fields into existing state (keeps token intact)
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        saveUserToLocalStorage(state.user, state.token);
      }
    },
    clearAuthError(state) {
      state.error = null;
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
          saveUserToLocalStorage(user, token);
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
          saveUserToLocalStorage(user, token);
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
          saveUserToLocalStorage(user, token);
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
        saveUserToLocalStorage(action.payload, state.token);
      })
      .addCase(getMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        clearUserFromLocalStorage();
      });
  },
});

export const { logout, updateDiamonds, updateUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
