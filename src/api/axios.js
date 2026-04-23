import axios from "axios";
import Swal from "sweetalert2";

export const BASE_URL = import.meta.env.VITE_API_URL || "https://c-vify-backend.vercel.app/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Let axios set Content-Type automatically for FormData
  return config;
});

// Global response interceptor: show toasts/alerts for errors and handle 401/403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    const message = data?.message || error.message || "An error occurred";

    if (status === 401) {
      // Clear token
      localStorage.removeItem("token");
      
      // Determine if we are on a public route where we shouldn't interrupt the user
      const isPublicRoute = window.location.pathname.startsWith("/p/");

      if (!isPublicRoute) {
        // Force login with a modal confirmation only on protected/app routes
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
    } else if (status === 503) {
      // Maintenance Mode Active
      window.location.href = "/maintenance";
    } else {
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
