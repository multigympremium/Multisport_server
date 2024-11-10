import express from 'express';
import {
  getAllShippingAddresses,
  createShippingAddress,
  getShippingAddressById,
  updateShippingAddressById,
  deleteShippingAddressById,
} from "./shippingAddress.controller";

const shippingAddressRoutes = express.Router();

// GET all shipping addresses
shippingAddressRoutes.get("/", getAllShippingAddresses);

// POST a new shipping address
shippingAddressRoutes.post("/", createShippingAddress);

// GET a specific shipping address by ID
shippingAddressRoutes.get("/:id", getShippingAddressById);

// PUT update a shipping address by ID
shippingAddressRoutes.put("/:id", updateShippingAddressById);

// DELETE a shipping address by ID
shippingAddressRoutes.delete("/:id", deleteShippingAddressById);

export default shippingAddressRoutes;
