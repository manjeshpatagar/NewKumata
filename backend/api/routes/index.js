import { Router } from "express";
import userRoutes from "./user.routes.js";
import categoryRoutes from "./category.routes.js";
import shopRoutes from "./shop.routes.js";
import advertisementRoutes from "./advertisement.routes.js";
import paymentRoutes from "./payment.routes.js";
import subcategoryRoutes from "./subcategory.routes.js";
const router = Router();

router.use("/auth", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/subcategories", subcategoryRoutes);
router.use("/shops", shopRoutes);
router.use("/advertisements", advertisementRoutes);
router.use("/payments", paymentRoutes);

export default router;
