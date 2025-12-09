import { axiosServer } from "./axiosServer";

export const authServerApi = {
  getProfile: async (token: string) => {
    const res = await axiosServer.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
