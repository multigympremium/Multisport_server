import express from "express";
import {
  getDiscounts,
  createDiscount,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
} from "./Discount.controller.js";

const discountRoutes = express.Router();

// GET: Fetch all social links
discountRoutes.get("/", getDiscounts);

// POST: Create a new social link
discountRoutes.post("/", createDiscount);

// GET: Get social link by ID
discountRoutes.get("/:id", getDiscountById);

// PUT: Update social link by ID
discountRoutes.put("/:id", updateDiscount);

// DELETE: Delete social link by ID
discountRoutes.delete("/:id", deleteDiscount);

export default discountRoutes;
