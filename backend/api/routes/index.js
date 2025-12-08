import { Router } from "express";
import userRoutes from "./user.routes.js";
import categoryRoutes from "./category.routes.js";
import subcategoryRoutes from "./subcategory.routes.js";
import productRoutes from "./product.routes.js";
import advertisementRoutes from "./advertisement.routes.js";
import paymentRoutes from "./payment.routes.js";
const router = Router();

router.use("/auth", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/subcategories", subcategoryRoutes);
router.use("/products", productRoutes);
router.use("/advertisements", advertisementRoutes);
router.use("/payments", paymentRoutes);

export default router;
