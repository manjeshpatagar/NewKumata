import { axiosClient } from "./axiosClient";

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await axiosClient.post("/auth/login", { email, password });
    return res.data;
  },

  register: async (data: any) => {
    const res = await axiosClient.post("/auth/register", data);
    return res.data;
  },

  getProfile: async () => {
    const res = await axiosClient.get("/auth/me");
    return res.data;
  },
};

