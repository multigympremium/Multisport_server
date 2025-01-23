import express from "express";
import {
  createCrisp,
  deleteCrispById,
  getAllCrisp,
  getCrispById,
  updateCrispById,
} from "./CrispLiveChat.controller.js";

const CrispRoutes = express.Router();

CrispRoutes.get("/", getAllCrisp); // GET all Crisps
CrispRoutes.post("/", createCrisp); // POST new Crisp
CrispRoutes.get("/:id", getCrispById); // GET Crisp by ID
CrispRoutes.put("/:id", updateCrispById); // PUT update Crisp by ID
CrispRoutes.delete("/:id", deleteCrispById); // DELETE Crisp by ID

export default CrispRoutes;
