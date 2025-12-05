import { axiosClient } from "./axiosClient";

export const categoryApi = {
  // GET ALL (public)
  getAll: async () => {
    const res = await axiosClient.get("/categories");
    return res.data.data; // backend returns { success, data: [...] }
  },

  // GET ONE (public)
  getById: async (id: string) => {
    const res = await axiosClient.get(`/categories/${id}`);
    return res.data.data;
  },

  // CREATE CATEGORY (Admin only)
  create: async (name: string, description: string, imageFile?: File) => {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description);

    if (imageFile) {
      fd.append("image", imageFile); // VERY IMPORTANT — backend expects "image"
    }

    const res = await axiosClient.post(`/categories`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.data;
  },

  // UPDATE CATEGORY (Admin only)
  update: async (
    id: string,
    name: string,
    description: string,
    isActive: boolean,
    imageFile?: File
  ) => {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description);
    fd.append("isActive", String(isActive));

    if (imageFile) {
      fd.append("image", imageFile);
    }

    const res = await axiosClient.patch(`/categories/${id}`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.data;
  },

  // DELETE CATEGORY
  delete: async (id: string) => {
    const res = await axiosClient.delete(`/categories/${id}`);
    return res.data.success;
  },
};
