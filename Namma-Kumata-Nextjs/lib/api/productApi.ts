import { axiosClient } from "./axiosClient";

export const productApi = {
  getAll: async () => {
    const res = await axiosClient.get("/products");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await axiosClient.get(`/products/${id}`);
    return res.data;
  },

  create: async (form: FormData) => {
    const res = await axiosClient.post("/products", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  update: async (id: string, form: FormData) => {
    const res = await axiosClient.patch(`/products/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  delete: async (id: string) => {
    const res = await axiosClient.delete(`/products/${id}`);
    return res.data;
  },
};
