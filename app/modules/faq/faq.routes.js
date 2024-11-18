
import express from "express";
import { createFaq, deleteFaqById, getAllFaqs, getFaqById, updateFaqById } from "./faq.controller.js";


const FaqRoutes = express.Router();

FaqRoutes.get("/", getAllFaqs);
FaqRoutes.post("/", createFaq);
FaqRoutes.get("/:id", getFaqById);
FaqRoutes.put("/:id", updateFaqById);
FaqRoutes.delete("/:id", deleteFaqById);

export default FaqRoutes;
