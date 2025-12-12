import { axiosClient } from "./axiosClient";

export const favouriteApi = {
  // ⭐ Add advertisement to favourite
  addAdvertisement: async (advertisementId: string) => {
    return await axiosClient.post("/favourite", { advertisementId });
  },

  // ⭐ Add product to favourite
  addProduct: async (productId: string) => {
    return await axiosClient.post("/favourite", { productId });
  },

  // ⭐ Remove favourite using favouriteId
  remove: async (favouriteId: string) => {
    return await axiosClient.delete(`/favourite/${favouriteId}`);
  },

  // ⭐ Get user's favourites
  getMyFavourites: async () => {
    return await axiosClient.get("/favourite");
  },
};
