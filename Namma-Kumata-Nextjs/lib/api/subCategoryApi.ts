import { axiosClient } from "./axiosClient";

export const subCategoryApi = {
  /* ----------------------------------------------------
   📌 Get All Subcategories (Public)
  ---------------------------------------------------- */
  getAll: async () => {
    const res = await axiosClient.get("/subcategories");
    return res.data;
  },

  /* ----------------------------------------------------
   📌 Get Single Subcategory by ID (Public)
  ---------------------------------------------------- */
  getById: async (id: string) => {
    const res = await axiosClient.get(`/subcategories/${id}`);
    return res.data;
  },

  /* ----------------------------------------------------
   📌 Create New Subcategory (Admin Only)
   NOTE: Must send FormData because images are uploaded
  ---------------------------------------------------- */
  create: async (data: FormData) => {
    const res = await axiosClient.post("/subcategories", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  /* ----------------------------------------------------
   📌 Update Subcategory (Admin Only)
   NOTE: Also uses FormData (because icon may be replaced)
  ---------------------------------------------------- */
  update: async (id: string, data: FormData) => {
    const res = await axiosClient.patch(`/subcategories/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  /* ----------------------------------------------------
   📌 Delete Subcategory (Admin Only)
  ---------------------------------------------------- */
  delete: async (id: string) => {
    const res = await axiosClient.delete(`/subcategories/${id}`);
    return res.data;
  },
};
