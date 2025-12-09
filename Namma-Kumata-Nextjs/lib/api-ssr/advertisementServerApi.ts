import { axiosServer } from "./axiosServer";

export const advertisementServerApi = {
  getAll: async () => {
    const res = await axiosServer.get("/advertisements");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await axiosServer.get(`/advertisements/${id}`);
    return res.data;
  },
};
