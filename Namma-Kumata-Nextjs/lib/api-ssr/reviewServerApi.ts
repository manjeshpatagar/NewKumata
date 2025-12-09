import { axiosServer } from "./axiosServer";

export const reviewServerApi = {
  getProductReviews: async (productId: string) => {
    const res = await axiosServer.get(`/review/${productId}`);
    return res.data;
  },
};
