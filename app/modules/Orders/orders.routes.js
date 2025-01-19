import express from "express";
import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getOrderByUserId,
  addWeightToOrder,
} from "./orders.controller.js";

const orderRoutes = express.Router();

orderRoutes.get("/", getOrders);
orderRoutes.post("/", createOrder);
orderRoutes.get("/single/:id", getOrderById);
orderRoutes.get("/user/:id", getOrderByUserId);
orderRoutes.put("/update/:id", updateOrderById);
orderRoutes.put("/add_weight/:id", addWeightToOrder);
orderRoutes.delete("/:id", deleteOrderById);

export default orderRoutes;
