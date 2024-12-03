import express from "express";
import {
  courierArea,
  courierCities,
  courierStoreCreate,
  courierStoreGet,
  courierZones,
  createPathaoCourier,
  createSteadFast,
  deletePathaoCourierById,
  deleteSteadFastById,
  getAllPathaoCourier,
  getAllSteadFast,
  getPathaoCourierById,
  getSteadFastById,
  updatePathaoCourierById,
  updateSteadFastById,
} from "./Courier.controller.js";

const courierRoutes = express.Router();

courierRoutes.get("/cities", courierCities);
courierRoutes.get("/zones/:id", courierZones);
courierRoutes.get("/area/:id", courierArea);
courierRoutes.get("/store", courierStoreGet);
courierRoutes.post("/store", courierStoreCreate);

courierRoutes.get("/pathao", getAllPathaoCourier); // GET all PathaoCouriers
courierRoutes.post("/pathao", createPathaoCourier); // POST new PathaoCourier
courierRoutes.get("/pathao/:id", getPathaoCourierById); // GET PathaoCourier by ID
courierRoutes.put("/pathao/:id", updatePathaoCourierById); // PUT update PathaoCourier by ID
courierRoutes.delete("/pathao/:id", deletePathaoCourierById); // DELETE FacebookPixel by ID

courierRoutes.get("/stead_fast", getAllSteadFast); // GET all SteadFasts
courierRoutes.post("/stead_fast", createSteadFast); // POST new SteadFast
courierRoutes.get("/stead_fast/:id", getSteadFastById); // GET SteadFast by ID
courierRoutes.put("/stead_fast/:id", updateSteadFastById); // PUT update SteadFast by ID
courierRoutes.delete("/stead_fast/:id", deleteSteadFastById); // DELETE FacebookPixel by ID

export default courierRoutes;
