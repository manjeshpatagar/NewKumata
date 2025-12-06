import { asyncHandler } from "../utils/asyncHandler.js";
import {
  addToFavourite,
  removeFavourite,
  getUserFavourites,
} from "../services/favourite.service.js";

/* -----------------------------
 ⭐ Add to Favourite
----------------------------- */
export const addFavourite = asyncHandler(async (req, res) => {
  const fav = await addToFavourite(req.user._id, req.body);

  res.status(201).json({
    success: true,
    message: "Added to favourites",
    data: fav,
  });
});

/* -----------------------------
 ⭐ Remove Favourite
----------------------------- */
export const deleteFavourite = asyncHandler(async (req, res) => {
  await removeFavourite(req.user._id, req.params.productId);

  res.status(200).json({
    success: true,
    message: "Removed from favourites",
  });
});

/* -----------------------------
 ⭐ Get Logged-in User Favourites
----------------------------- */
export const myFavourites = asyncHandler(async (req, res) => {
  const favourites = await getUserFavourites(req.user._id);

  res.status(200).json({
    success: true,
    count: favourites.length,
    data: favourites,
  });
});
