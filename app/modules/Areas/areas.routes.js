import express from "express";
import {
  createArea,
  getAllAreas,
  getAreaById,
  updateArea,
  deleteArea,
  createMultipleAreas,
  getAllAreasByZoneId,
} from "./areas.controller.js";

const AreaRoutes = express.Router();

// Route to create a new Area
AreaRoutes.post("/", createArea);
AreaRoutes.post("/multiple", createMultipleAreas);

// Route to get all Areas
AreaRoutes.get("/", getAllAreas);

// Route to get a single Area by ID
AreaRoutes.get("/single/:id", getAreaById);

// Route to get a single Area by ID
AreaRoutes.get("/by_zone/:id", getAllAreasByZoneId);

// Route to update a Area by ID
AreaRoutes.put("/:id", updateArea);

// Route to delete a Area by ID
AreaRoutes.delete("/:id", deleteArea);

export default AreaRoutes;
