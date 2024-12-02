import express from "express";
import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} from "./orders.controller.js";
import { createCourierOrder } from "../Courier/Courier.controller.js";

const orderRoutes = express.Router();

orderRoutes.get("/", getOrders);
orderRoutes.post("/", createCourierOrder, createOrder);
orderRoutes.get("/:id", getOrderById);
orderRoutes.put("/:id", updateOrderById);
orderRoutes.delete("/:id", deleteOrderById);

export default orderRoutes;
