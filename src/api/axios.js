import axios from "axios";

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

export default api;
