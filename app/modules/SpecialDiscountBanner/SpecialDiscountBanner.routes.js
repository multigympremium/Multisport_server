import express from "express";
import {
  getSpecialDiscountBannerById,
  updateSpecialDiscountBanner,
  deleteSpecialDiscountBanner,
  getSpecialDiscountBanners,
  createSpecialDiscountBanner,
} from "./SpecialDiscountBanner.controller.js";

const SpecialDiscountBannerRoutes = express.Router();

// Route for fetching SpecialDiscountBanners with optional search filter
SpecialDiscountBannerRoutes.get("/", getSpecialDiscountBanners);

// Route for creating a new SpecialDiscountBanner
SpecialDiscountBannerRoutes.post("/", createSpecialDiscountBanner);

SpecialDiscountBannerRoutes.get("/:id", getSpecialDiscountBannerById); // GET SpecialDiscount Banner by ID
SpecialDiscountBannerRoutes.put("/:id", updateSpecialDiscountBanner); // PUT (update) SpecialDiscount Banner by ID
SpecialDiscountBannerRoutes.delete("/:id", deleteSpecialDiscountBanner); // DELETE SpecialDiscount Banner by ID

export default SpecialDiscountBannerRoutes;
