import { axiosServer } from "./axiosServer";

export const productServerApi = {
  getAll: async (token?: any) => {
    const res = await axiosServer.get("/products", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },

  getById: async (id: string, token?: any) => {
    const res = await axiosServer.get(`/products/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },
};
