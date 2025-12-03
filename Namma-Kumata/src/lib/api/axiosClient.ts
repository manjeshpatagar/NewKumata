import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:5006/api/", // FIXED ✅
});

// Debug log
axiosClient.interceptors.request.use((config) => {
  console.log("📤 Sending Request:", config.url, config.method);
  console.log("📦 Payload:", config.data);

  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
