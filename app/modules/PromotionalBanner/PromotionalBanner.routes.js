import express from "express";
import {
  createPromoBanner,
  deletePromoBanner,
  getPromoBannerById,
  getPromoBanners,
  updatePromoBanner,
} from "./PromotionalBanner.controller.js";

const PromoBannerRoutes = express.Router();

// GET: Fetch all social links
PromoBannerRoutes.get("/", getPromoBanners);

// POST: Create a new social link
PromoBannerRoutes.post("/", createPromoBanner);

// GET: Get social link by ID
PromoBannerRoutes.get("/:id", getPromoBannerById);

// PUT: Update social link by ID
PromoBannerRoutes.put("/:id", updatePromoBanner);

// DELETE: Delete social link by ID
PromoBannerRoutes.delete("/:id", deletePromoBanner);

export default PromoBannerRoutes;
