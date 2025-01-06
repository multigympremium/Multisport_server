import { Router } from "express";
import {
  createTransaction,
  getAllExpense,
  getAllTransaction,
  getAllTransactions,
  removeTransaction,
} from "./Transaction.controller.js";

const TransactionRoutes = Router();

TransactionRoutes.get("/get-all", getAllTransactions);
TransactionRoutes.get("/", getAllTransaction);
TransactionRoutes.get("/expense", getAllExpense);
TransactionRoutes.post("/post", createTransaction);
TransactionRoutes.delete("/delete/:id", removeTransaction);

export default TransactionRoutes;
