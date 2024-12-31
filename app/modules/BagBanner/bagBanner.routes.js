import express from "express";
import {
  getBagBannerById,
  updateBagBanner,
  deleteBagBanner,
  getBagBanners,
  createBagBanner,
} from "./bagBanner.controller.js";

const bagBannerRoutes = express.Router();

// Route for fetching BagBanners with optional search filter
bagBannerRoutes.get("/", getBagBanners);

// Route for creating a new BagBanner
bagBannerRoutes.post("/", createBagBanner);

bagBannerRoutes.get("/:id", getBagBannerById); // GET BagBanner by ID
bagBannerRoutes.put("/:id", updateBagBanner); // PUT (update) BagBanner by ID
bagBannerRoutes.delete("/:id", deleteBagBanner); // DELETE BagBanner by ID

export default bagBannerRoutes;
