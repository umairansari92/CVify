import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, verifyOtp, getMe } from "./authThunk";

const getSafeToken = () => {
  const token = localStorage.getItem("token");
  if (!token || token === "undefined") return null;
  return token;
};

const saveUserToLocalStorage = (user, token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
  if (user) {
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
    if (fullName) localStorage.setItem("Full name", fullName);
    if (user.email) localStorage.setItem("Email", user.email);
    if (user.phoneNumber) localStorage.setItem("Mobile Number", user.phoneNumber);
    if (user.location) localStorage.setItem("Location", user.location);
  }
};

const clearUserFromLocalStorage = () => {
  localStorage.removeItem("token");
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
