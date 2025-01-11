import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  markCustomerAsServed,
  searchCustomers,
} from "./customer.controller.js";

const customerRoutes = express.Router();

// POST a new customer
customerRoutes.post("/post", createCustomer);

customerRoutes.get("/", getAllCustomers);

// DELETE a customer by ID
customerRoutes.delete("/:id", deleteCustomer);

// PUT to change status to "Served"
customerRoutes.put("/:id/mark-served", markCustomerAsServed);

// GET customers with search functionality
customerRoutes.get("/search", searchCustomers);

export default customerRoutes;