import { axiosClient } from "./axiosClient";

export const favouriteApi = {
  add: async (Id: string) => {
    const res = await axiosClient.post(`/favourite/${Id}`);
    return res.data;
  },

  remove: async (Id: string) => {
    const res = await axiosClient.delete(`/favourite/${Id}`);
    return res.data;
  },

  getMyFavourites: async () => {
    const res = await axiosClient.get("/favourite");
    return res.data;
  },
};
