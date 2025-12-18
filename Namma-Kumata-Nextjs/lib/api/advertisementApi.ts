import { axiosClient } from "./axiosClient";

export const advertisementApi = {
  getAll: async () => {
    const res = await axiosClient.get("/advertisements");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await axiosClient.get(`/advertisements/${id}`);
    return res.data;
  },

  create: async (form: FormData) => {
    const res = await axiosClient.post("/advertisements", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  update: async (id: string, form: FormData) => {
    const res = await axiosClient.patch(`/advertisements/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  delete: async (id: string) => {
    const res = await axiosClient.delete(`/advertisements/${id}`);
    return res.data;
  },
};
