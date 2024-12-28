import express from "express";
import {
  getProductById,
  updateProductById,
  deleteProductById,
  getProducts,
  createProduct,
  updateProductWishCount,
  productBulkUpdate,
  getNewArrivals,
  getNewFeaturedProducts,
  getNewPopularProducts,
} from "./product.controller.js";

const productRoutes = express.Router();

// Routes for managing products
productRoutes.get("/", getProducts);
productRoutes.get("/new_arrivals", getNewArrivals);
productRoutes.get("/featured", getNewFeaturedProducts);
productRoutes.get("/popular", getNewPopularProducts);
productRoutes.get("/discount", getNewPopularProducts);
productRoutes.get("/wish-count/:id", updateProductWishCount);
productRoutes.post("/", createProduct);
productRoutes.post("/bulk", productBulkUpdate);
productRoutes.get("/:id", getProductById);
productRoutes.put("/:id", updateProductById);
productRoutes.delete("/:id", deleteProductById);

export default productRoutes;
