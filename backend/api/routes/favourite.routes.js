import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  addFavourite,
  deleteFavourite,
  myFavourites,
} from "../controllers/favourite.controller.js";

const router = express.Router();

router.post("/", protect, addFavourite);
router.delete("/:id", protect, deleteFavourite);
router.get("/", protect, myFavourites);

export default router;
