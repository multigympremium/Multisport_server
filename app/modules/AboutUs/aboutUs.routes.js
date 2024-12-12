import express from "express";
import {
  deleteAboutMission,
  getAboutMissionById,
  updateAboutMission,
} from "../AboutMission/aboutMission.controller.js";
import { createAboutUs, getAboutUs } from "./aboutUs.controller.js";

const aboutUsRoutes = express.Router();

// Route for getting the AboutMission by ID
aboutUsRoutes.get("/", getAboutUs);
aboutUsRoutes.get("/:id", getAboutMissionById);

aboutUsRoutes.post("/", createAboutUs);
// Route for updating the AboutMission by ID
aboutUsRoutes.put("/:id", updateAboutMission);

// Route for deleting the AboutMission by ID
aboutUsRoutes.delete("/:id", deleteAboutMission);

export default aboutUsRoutes;
