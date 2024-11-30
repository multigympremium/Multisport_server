import express from "express";
import {
  getSetupConfigs,
  createSetupConfig,
  getSetupConfigById,
  updateSetupConfig,
  deleteSetupConfig,
} from "./SetupConfig.controller.js";

const SetupConfigRoutes = express.Router();

// GET: Fetch all social links
SetupConfigRoutes.get("/", getSetupConfigs);

// POST: Create a new social link
SetupConfigRoutes.post("/", createSetupConfig);

// GET: Get social link by ID
SetupConfigRoutes.get("/:id", getSetupConfigById);

// PUT: Update social link by ID
SetupConfigRoutes.put("/:id", updateSetupConfig);

// DELETE: Delete social link by ID
SetupConfigRoutes.delete("/:id", deleteSetupConfig);

export default SetupConfigRoutes;
