import { axiosServer } from "./axiosServer";

export const productServerApi = {
  getAll: async () => {
    const res = await axiosServer.get("/products");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await axiosServer.get(`/products/${id}`);
    return res.data;
  },
};
