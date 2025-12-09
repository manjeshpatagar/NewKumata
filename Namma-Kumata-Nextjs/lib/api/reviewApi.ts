import { axiosClient } from "./axiosClient";

export const reviewApi = {
  add: async (productId: string, data: any) => {
    const res = await axiosClient.post(`/review/${productId}`, data);
    return res.data;
  },

  getProductReviews: async (productId: string) => {
    const res = await axiosClient.get(`/review/${productId}`);
    return res.data;
  },

  delete: async (reviewId: string) => {
    const res = await axiosClient.delete(`/review/${reviewId}`);
    return res.data;
  },
};
