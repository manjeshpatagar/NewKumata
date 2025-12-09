import { axiosServer } from "./axiosServer";

export const advertisementServerApi = {
  getAll: async (token?: any) => {
    const res = await axiosServer.get("/advertisements", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },

  getById: async (id: string, token?: any) => {
    const res = await axiosServer.get(`/advertisements/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },
};
