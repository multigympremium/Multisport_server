import express from "express";
import {
  getNewArrivalBannerById,
  updateNewArrivalBanner,
  deleteNewArrivalBanner,
  getNewArrivalBanners,
  createNewArrivalBanner,
} from "./NewArrivalBanner.controller.js";

const NewArrivalBannerRoutes = express.Router();

// Route for fetching NewArrivalBanners with optional search filter
NewArrivalBannerRoutes.get("/", getNewArrivalBanners);

// Route for creating a new NewArrivalBanner
NewArrivalBannerRoutes.post("/", createNewArrivalBanner);

NewArrivalBannerRoutes.get("/:id", getNewArrivalBannerById); // GET NewArrivalBanner by ID
NewArrivalBannerRoutes.put("/:id", updateNewArrivalBanner); // PUT (update) NewArrivalBanner by ID
NewArrivalBannerRoutes.delete("/:id", deleteNewArrivalBanner); // DELETE NewArrivalBanner by ID

export default NewArrivalBannerRoutes;
