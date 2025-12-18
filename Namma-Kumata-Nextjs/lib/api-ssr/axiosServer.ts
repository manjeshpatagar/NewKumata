import axios from "axios";

export const axiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5006/api/",
  withCredentials: false,
});
