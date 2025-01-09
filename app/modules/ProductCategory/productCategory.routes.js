// routes/categoryRoutes.js

import express from "express";
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getProductCategories,
} from "./productCategory.controller.js";

const productCategoryRoutes = express.Router();

productCategoryRoutes.get("/", getCategories);
productCategoryRoutes.post("/", createCategory);
productCategoryRoutes.get("/single/:id", getCategoryById);
productCategoryRoutes.get("/exist_categories", getProductCategories);
productCategoryRoutes.put("/:id", updateCategoryById);
productCategoryRoutes.delete("/:id", deleteCategoryById);

export default productCategoryRoutes;
