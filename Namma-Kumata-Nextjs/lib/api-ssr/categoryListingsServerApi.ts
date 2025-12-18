import { axiosClient } from "../api/axiosClient";

export const categoryListingsServerApi = {
  getProductsBySubcategory: async (subCategoryId: string) => {
    const res = await axiosClient.get(`/products`, {
      params: { subCategoryId }
    });
    return res.data;
  },
};
