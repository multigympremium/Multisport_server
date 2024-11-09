// routes/childCategoryRoutes.js
import express from "express";
import {
  getChildCategories,
  getChildCategoryById,
  createChildCategory,
  updateChildCategory,
  deleteChildCategory
} from "./childCategory.controller";

const childCategory = express.Router();

childCategory.get("/", getChildCategories);
childCategory.get("/:id", getChildCategoryById);
childCategory.post("/",  createChildCategory);
childCategory.put("/:id",  updateChildCategory);
childCategory.delete("/:id", deleteChildCategory);

export default childCategory;
