import { axiosServer } from "./axiosServer";

export const categoryServerApi = {
  getAll: async (token?: string) => {
    const res = await axiosServer.get("/categories", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data; // IMPORTANT: res.data is already the array of categories
  },

  getById: async (id: string, token?: string) => {
    const res = await axiosServer.get(`/categories/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },
};
