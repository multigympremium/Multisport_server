import express from "express";
import {
  getAllShippingAddresses,
  createShippingAddress,
  getShippingAddressById,
  updateShippingAddressById,
  deleteShippingAddressById,
  getShippingAddressByUserId,
} from "./shippingAddress.controller.js";

const shippingAddressRoutes = express.Router();

// GET all shipping addresses
shippingAddressRoutes.get("/", getAllShippingAddresses);

// POST a new shipping address
shippingAddressRoutes.post("/", createShippingAddress);

// GET a specific shipping address by ID
shippingAddressRoutes.get("/single/:id", getShippingAddressById);
shippingAddressRoutes.get("/user/:id", getShippingAddressByUserId);

// PUT update a shipping address by ID
shippingAddressRoutes.put("/:id", updateShippingAddressById);

// DELETE a shipping address by ID
shippingAddressRoutes.delete("/:id", deleteShippingAddressById);

export default shippingAddressRoutes;
