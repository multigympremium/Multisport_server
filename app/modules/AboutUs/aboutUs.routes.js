import express from "express";
import {
  createAboutUs,
  deleteAboutUs,
  getAboutUs,
  getAboutUsById,
  updateAboutUs,
} from "./aboutUs.controller.js";

const aboutUsRoutes = express.Router();

// Route for getting the AboutMission by ID
aboutUsRoutes.get("/", getAboutUs);
aboutUsRoutes.get("/:id", getAboutUsById);

aboutUsRoutes.post("/", createAboutUs);
// Route for updating the AboutMission by ID
aboutUsRoutes.put("/:id", updateAboutUs);

// Route for deleting the AboutMission by ID
aboutUsRoutes.delete("/:id", deleteAboutUs);

export default aboutUsRoutes;
