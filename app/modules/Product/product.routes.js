import express from "express";
import { getProductById, updateProductById, deleteProductById, getProducts, createProduct } from "./product.controller";

const productRoutes = express.Router();

// Routes for managing products
productRoutes.get("/", getProducts);
productRoutes.post("/", createProduct);
productRoutes.get("/:id", getProductById);
productRoutes.put("/:id", updateProductById);
productRoutes.delete("/:id", deleteProductById);

export default productRoutes;
