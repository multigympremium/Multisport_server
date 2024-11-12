import express from "express";
import {
  getBanners,
  createBanner,
  getBannerById,
  updateBanner,
  deleteBanner,
} from "./shoesBanner.controller.js";

const shoesBannerRoutes = express.Router();

// Define routes for banner operations
shoesBannerRoutes.get("/", getBanners); // GET /banners
shoesBannerRoutes.post("/", createBanner); // POST /banners
shoesBannerRoutes.get("/:id", getBannerById); // GET /banners/:id
shoesBannerRoutes.put("/:id", updateBanner); // PUT /banners/:id
shoesBannerRoutes.delete("/:id", deleteBanner); // DELETE /banners/:id

export default shoesBannerRoutes;
