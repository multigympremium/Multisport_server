import express from "express";
import {
  getBestSellingBannerById,
  updateBestSellingBanner,
  deleteBestSellingBanner,
  getBestSellingBanners,
  createBestSellingBanner,
} from "./BestSellingBanner.controller.js";

const BestSellingBannerRoutes = express.Router();

// Route for fetching BestSellingBanners with optional search filter
BestSellingBannerRoutes.get("/", getBestSellingBanners);

// Route for creating a new BestSellingBanner
BestSellingBannerRoutes.post("/", createBestSellingBanner);

BestSellingBannerRoutes.get("/:id", getBestSellingBannerById); // GET BestSelling Banner by ID
BestSellingBannerRoutes.put("/:id", updateBestSellingBanner); // PUT (update) BestSelling Banner by ID
BestSellingBannerRoutes.delete("/:id", deleteBestSellingBanner); // DELETE BestSelling Banner by ID

export default BestSellingBannerRoutes;
