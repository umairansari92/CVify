import axios from "axios";
import Swal from "sweetalert2";

const api = axios.create({
  baseURL: "https://c-vify-backend.vercel.app/api",
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
      // Clear token and force login with a modal confirmation
      localStorage.removeItem("token");
      Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: message || "Please log in again.",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/login";
      });
    } else if (status === 403 && data?.code === "EMAIL_NOT_VERIFIED" && data?.email) {
      // Don't show generic toast - Login page will show verify prompt and redirect
      // Just reject so auth thunk can handle it
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
