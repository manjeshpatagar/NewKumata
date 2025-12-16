import { axiosServer } from "./axiosServer";

export const categoryServerApi = {
  getAll: async (token?: string) => {
    try {
      const res = await axiosServer.get("/categories", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data; // IMPORTANT: res.data is already the array of categories
    } catch (error: any) {
      if (error?.response?.status === 401) {
        // Gracefully handle missing/expired token during SSR
        return [];
      }
      throw error;
    }
  },

  getById: async (id: string, token?: string) => {
    try {
      const res = await axiosServer.get(`/categories/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        return null;
      }
      throw error;
    }
  },
};
