import { axiosClient } from "./axiosClient";

export const categoryApi = {
  getAll: async () => {
    const res = await axiosClient.get("/categories");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await axiosClient.get(`/categories/${id}`);
    return res.data;
  },

  create: async (data: FormData) => {
    const res = await axiosClient.post("/categories", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  update: async (id: string, data: FormData) => {
    const res = await axiosClient.patch(`/categories/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  delete: async (id: string) => {
    const res = await axiosClient.delete(`/categories/${id}`);
    return res.data;
  },
};
