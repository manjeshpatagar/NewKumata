import { axiosServer } from "./axiosServer";

export const favouriteServerApi = {
  getMyFavourites: async (token: string) => {
    const res = await axiosServer.get("/favourite", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
