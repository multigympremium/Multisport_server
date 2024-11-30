import express from "express";
import {
  getModelOfBrands,
  createModelOfBrand,
  getModelOfBrandById,
  updateModelOfBrand,
  deleteModelOfBrand,
} from "./ModelOfBrand.controller.js";

const ModelOfBrandRoutes = express.Router();

// GET: Fetch all social links
ModelOfBrandRoutes.get("/", getModelOfBrands);

// POST: Create a new social link
ModelOfBrandRoutes.post("/", createModelOfBrand);

// GET: Get social link by ID
ModelOfBrandRoutes.get("/:id", getModelOfBrandById);

// PUT: Update social link by ID
ModelOfBrandRoutes.put("/:id", updateModelOfBrand);

// DELETE: Delete social link by ID
ModelOfBrandRoutes.delete("/:id", deleteModelOfBrand);

export default ModelOfBrandRoutes;
