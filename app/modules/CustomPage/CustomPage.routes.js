// routes/customCssAndJsRoutes.js
import express from "express";
import {
  getAllCustomPage,
  getCustomPageById,
  createCustomPage,
  updateCustomPage,
  deleteCustomPage,
} from "./CustomPage.controller.js";

const CustomPageRoutes = express.Router();

CustomPageRoutes.get("/", getAllCustomPage);
CustomPageRoutes.get("/:id", getCustomPageById);
CustomPageRoutes.post("/", createCustomPage);
CustomPageRoutes.put("/:id", updateCustomPage);
CustomPageRoutes.delete("/:id", deleteCustomPage);

export default CustomPageRoutes;
