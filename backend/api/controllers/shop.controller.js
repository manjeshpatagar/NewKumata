import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";
import { deleteFile } from "../middleware/upload.middleware.js";
import { Product } from "../models/product.model.js";

/* -----------------------------
 📌 Create Product
----------------------------- */
export const addProduct = asyncHandler(async (req, res) => {
  const {
    shopName,
    description,
    about,
    address,
    contact,
    categoryId,
    subCategoryId,
    website,
    openingHours,
    badges,
  } = req.body;

  const images = req.files?.images?.map((img) => img.url) || [];
  const thumbnail = req.files?.thumbnail?.[0]?.url || images[0] || null;

  const product = await createProduct({
    shopName,
    description,
    about,
    address,
    contact,
    categoryId,
    subCategoryId,
    website,
    openingHours,
    badges,
    images,
    thumbnail,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

/* -----------------------------
 📌 Get All
----------------------------- */
export const getProducts = asyncHandler(async (req, res) => {
  const products = await getAllProducts();
  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
});

/* -----------------------------
 📌 Get Single
----------------------------- */
export const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await getProductById(req.params.id);
  res.status(200).json({ success: true, data: product });
});

/* -----------------------------
 📌 Update Product
----------------------------- */
export const editProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  // NEW IMAGES
  const newImages = req.files?.images?.map((img) => img.url);
  const newThumbnail = req.files?.thumbnail?.[0]?.url;

  let images = product.images;
  let thumbnail = product.thumbnail;

  if (newImages?.length > 0) {
    // delete old images
    for (const img of images) await deleteFile(img);
    images = newImages;
  }

  if (newThumbnail) {
    await deleteFile(thumbnail);
    thumbnail = newThumbnail;
  }

  const updated = await updateProduct(req.params.id, {
    ...req.body,
    images,
    thumbnail,
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updated,
  });
});

/* -----------------------------
 🗑️ Delete Product
----------------------------- */
export const removeProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  // delete images
  if (product.thumbnail) await deleteFile(product.thumbnail);
  for (const img of product.images) await deleteFile(img);

  await deleteProduct(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
