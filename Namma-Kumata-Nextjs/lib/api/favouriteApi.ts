import { axiosClient } from "./axiosClient";

export const favouriteApi = {
  add: async (productId: string) => {
    const res = await axiosClient.post(`/favourite/${productId}`);
    return res.data;
  },

  remove: async (productId: string) => {
    const res = await axiosClient.delete(`/favourite/${productId}`);
    return res.data;
  },

  getMyFavourites: async () => {
    const res = await axiosClient.get("/favourite");
    return res.data;
  },
};
