import express from "express";
import {
  createZone,
  getAllZones,
  getZoneById,
  updateZone,
  deleteZone,
  createMultipleZones,
  getAllZonesCityId,
} from "./zones.controller.js";

const ZoneRoutes = express.Router();

// Route to create a new Zone
ZoneRoutes.post("/", createZone);
ZoneRoutes.post("/multiple", createMultipleZones);

// Route to get all Zones
ZoneRoutes.get("/", getAllZones);
ZoneRoutes.get("/by_city/:id", getAllZonesCityId);

// Route to get a single Zone by ID
ZoneRoutes.get("/single/:id", getZoneById);

// Route to update a Zone by ID
ZoneRoutes.put("/:id", updateZone);

// Route to delete a Zone by ID
ZoneRoutes.delete("/:id", deleteZone);

export default ZoneRoutes;
