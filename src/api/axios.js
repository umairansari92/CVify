import axios from "axios";
import Swal from "sweetalert2";
import { cleanAiError } from "../utils/aiErrorHelper";

export const BASE_URL = "/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // Token auth is handled via HttpOnly cookie (withCredentials: true above).
  // Cookie is automatically forwarded by the browser on every request.
  // Let axios set Content-Type automatically for FormData
  return config;
});

// Global response interceptor: show toasts/alerts for errors and handle 401/403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Clean AI / Gemini-specific errors globally
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        error.response.data.message = cleanAiError(error.response.data.message);
      }
      if (error.response.data.error) {
        error.response.data.error = cleanAiError(error.response.data.error);
      }
    }
    if (error.message) {
      error.message = cleanAiError(error.message);
    }

    const data = error.response?.data;
    const message = data?.message || error.message || "An error occurred";

    if (status === 401) {
      // Clear token
      localStorage.removeItem("token");
      
      // Determine if this is an unauthenticated auth operation or public route
      const isPublicRoute = 
        window.location.pathname.startsWith("/p/") ||
        window.location.pathname.startsWith("/share/");
      const isAuthEndpoint = 
        error.config?.url?.includes("/auth/login") ||
        error.config?.url?.includes("/auth/signup") ||
        error.config?.url?.includes("/auth/verify-otp") ||
        error.config?.url?.includes("/auth/forgot-password") ||
        error.config?.url?.includes("/auth/reset-password") ||
        error.config?.url?.includes("/auth/security-state") ||
        error.config?.url?.includes("/auth/captcha/");
      const isAuthMe = error.config?.url?.includes("/auth/me");
      const isPublicApiCall = error.config?.url?.includes("/public/");

      if (!isPublicRoute && !isAuthMe && !isAuthEndpoint && !isPublicApiCall) {
        // Force login with a modal confirmation ONLY for expired session on protected app routes
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: message || "Please log in again.",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/login";
        });
      }
    } else if (status === 403 && data?.code === "EMAIL_NOT_VERIFIED" && data?.email) {
      // Don't show generic toast - Login page will show verify prompt and redirect
      // Just reject so auth thunk can handle it
    } else if (
      status === 429 || 
      data?.code === "CAPTCHA_REQUIRED" || 
      data?.code === "BACKOFF_DELAY" || 
      data?.code === "ACCOUNT_LOCKED"
    ) {
      // Silently pass backoff and captcha errors to the Login page UI
      return Promise.reject(error);
    } else if (status === 503) {
      // Maintenance Mode Active
      window.location.href = "/maintenance";
    } else {
      // Silently reject errors on public share/resume routes — the page handles them
      const isPublicApiCall = error.config?.url?.includes("/public/");
      if (isPublicApiCall) {
        return Promise.reject(error);
      }
      // Non-blocking toast for other errors
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 4000,
      });
    }

    return Promise.reject(error);
  },
);

export default api;
