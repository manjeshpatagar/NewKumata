import { Favourite } from "../models/favourite.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";

/* -----------------------------
 ⭐ Add to Favourite
----------------------------- */
export const addToFavourite = async (userId, body) => {
  const { productId, advertisementId } = body;

  if (!productId && !advertisementId)
    throw new ApiError(400, "Provide productId or advertisementId");

  if (productId && advertisementId)
    throw new ApiError(400, "Only one can be favourited at a time");

  let exists = await Favourite.findOne({
    userId,
    productId: productId || null,
    advertisementId: advertisementId || null,
  });

  if (exists) throw new ApiError(400, "Already in favourites");

  return Favourite.create({ userId, productId, advertisementId });
};

/* -----------------------------
 ⭐ Remove Favourite
----------------------------- */
export const removeFavourite = async (userId, productId) => {
  const fav = await Favourite.findOneAndDelete({ userId, productId });
  if (!fav) throw new ApiError(404, "Favourite not found");

  return fav;
};

/* -----------------------------
 ⭐ Get User Favourites
----------------------------- */
export const getUserFavourites = async (userId) => {
  return Favourite.find({ userId }).populate("productId");
};
