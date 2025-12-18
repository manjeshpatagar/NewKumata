import { axiosServer } from "./axiosServer";

export const subCategoryServerApi = {
  getAll: async (token?: string) => {
    const res = await axiosServer.get("/subcategories", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },

  getById: async (id: string, token?: string) => {
    const res = await axiosServer.get(`/subcategories/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },
};
