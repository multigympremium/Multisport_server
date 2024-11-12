// routes/productColorRoutes.js

import express from "express";
import {
  getAllProductColors,
  createProductColor,
  getProductColorById,
  updateProductColorById,
  deleteProductColorById,
} from "./ProductColor.controller.js";

const productColorRoutes = express.Router();

productColorRoutes.get("/", getAllProductColors);
productColorRoutes.post("/", createProductColor);
productColorRoutes.get("/:id", getProductColorById);
productColorRoutes.put("/:id", updateProductColorById);
productColorRoutes.delete("/:id", deleteProductColorById);

export default productColorRoutes;
