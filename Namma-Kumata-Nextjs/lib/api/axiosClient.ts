import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006/api/",
});

// Request interceptor for adding auth token
axiosClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // Admin token first
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("token");

    const token = adminToken || userToken; // <-- admin has priority

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor for error handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token expired or invalid
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");

      // Redirect based on user or admin
      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      } else {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);
