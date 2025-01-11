import express from "express";
import {
  getPopularBannerById,
  updatePopularBanner,
  deletePopularBanner,
  getPopularBanners,
  createPopularBanner,
} from "./PopularBanner.controller.js";

const PopularBannerRoutes = express.Router();

// Route for fetching PopularBanners with optional search filter
PopularBannerRoutes.get("/", getPopularBanners);

// Route for creating a new PopularBanner
PopularBannerRoutes.post("/", createPopularBanner);

PopularBannerRoutes.get("/:id", getPopularBannerById); // GET Popular Banner by ID
PopularBannerRoutes.put("/:id", updatePopularBanner); // PUT (update) Popular Banner by ID
PopularBannerRoutes.delete("/:id", deletePopularBanner); // DELETE Popular Banner by ID

export default PopularBannerRoutes;
