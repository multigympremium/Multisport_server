import express from "express";
import { getProductById, updateProductById, deleteProductById, getProducts, createProduct, updateProductWishCount } from "./product.controller.js";

const productRoutes = express.Router();

// Routes for managing products
productRoutes.get("/", getProducts);
productRoutes.get("/wish-count/:id", updateProductWishCount);
productRoutes.post("/", createProduct);
productRoutes.get("/:id", getProductById);
productRoutes.put("/:id", updateProductById);
productRoutes.delete("/:id", deleteProductById);

export default productRoutes;
