// routes/categoryRoutes.js

import express from "express";
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getProductQueries,
} from "./productCategory.controller.js";

const productCategoryRoutes = express.Router();

productCategoryRoutes.get("/", getCategories);
productCategoryRoutes.post("/", createCategory);
productCategoryRoutes.get("/single/:id", getCategoryById);
productCategoryRoutes.get("/exist_queries", getProductQueries);
productCategoryRoutes.put("/:id", updateCategoryById);
productCategoryRoutes.delete("/:id", deleteCategoryById);

export default productCategoryRoutes;
