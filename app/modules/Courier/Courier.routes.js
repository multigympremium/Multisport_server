import express from "express";
import {
  courierArea,
  courierCities,
  courierStoreCreate,
  courierStoreGet,
  courierZones,
  createPathaoCourier,
  deletePathaoCourierById,
  getAllPathaoCourier,
  getPathaoCourierById,
  updatePathaoCourierById,
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

export default courierRoutes;
