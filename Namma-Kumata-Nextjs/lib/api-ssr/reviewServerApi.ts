import { axiosServer } from "./axiosServer";

export const reviewServerApi = {
  getProductReviews: async (productId: string, token?: any) => {
    const res = await axiosServer.get(`/review/${productId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data;
  },
};
