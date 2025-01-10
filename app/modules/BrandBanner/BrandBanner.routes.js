import express from "express";
import {
  getBrandBannerById,
  updateBrandBanner,
  deleteBrandBanner,
  getBrandBanners,
  createBrandBanner,
} from "./BrandBanner.controller.js";

const BrandBannerRoutes = express.Router();

// Route for fetching BrandBanners with optional search filter
BrandBannerRoutes.get("/", getBrandBanners);

// Route for creating a new BrandBanner
BrandBannerRoutes.post("/", createBrandBanner);

BrandBannerRoutes.get("/:id", getBrandBannerById); // GET BrandBanner by ID
BrandBannerRoutes.put("/:id", updateBrandBanner); // PUT (update) BrandBanner by ID
BrandBannerRoutes.delete("/:id", deleteBrandBanner); // DELETE BrandBanner by ID

export default BrandBannerRoutes;
