import express from "express";
import {
  createDeliveryCharge,
  deleteDeliveryCharge,
  getAllDeliveryCharge,
  getDeliveryChargeByDistrictId,
  getDeliveryChargeById,
  updateDeliveryCharge,
} from "./deliveryCharge.controller.js";

const deliveryChargeRoutes = express.Router();

// Route to create a new deliveryCharge
deliveryChargeRoutes.post("/", createDeliveryCharge);

// Route to get all deliveryCharges
deliveryChargeRoutes.get("/", getAllDeliveryCharge);

// Route to get a single deliveryCharge by ID
// deliveryChargeRoutes.get("/:id", getDeliveryChargeById);
deliveryChargeRoutes.get("/by_district_id/:id", getDeliveryChargeByDistrictId);

// Route to update a deliveryCharge by ID
deliveryChargeRoutes.put("/:id", updateDeliveryCharge);

// Route to delete a deliveryCharge by ID
deliveryChargeRoutes.delete("/:id", deleteDeliveryCharge);

export default deliveryChargeRoutes;
