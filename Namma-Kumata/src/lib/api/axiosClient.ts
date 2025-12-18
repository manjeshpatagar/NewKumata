import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:5006/api/", // FIXED ✅
});

// Debug log
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
