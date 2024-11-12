// routes/childCategoryRoutes.js
import express from "express";
import {
  getChildCategories,
  getChildCategoryById,
  createChildCategory,
  updateChildCategory,
  deleteChildCategory
} from "./childCategory.controller.js";

const childCategoryRoutes = express.Router();

childCategoryRoutes.get("/", getChildCategories);
childCategoryRoutes.get("/:id", getChildCategoryById);
childCategoryRoutes.post("/",  createChildCategory);
childCategoryRoutes.put("/:id",  updateChildCategory);
childCategoryRoutes.delete("/:id", deleteChildCategory);

export default childCategoryRoutes;
