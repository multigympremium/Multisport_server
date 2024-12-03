import express from "express";
import {
  getTermsConditions,
  postTermsCondition,
  getTermsConditionById,
  putTermsCondition,
  deleteTermsCondition,
} from "./termsCondition.controller.js";

const termsConditionRoutes = express.Router();

// Route for fetching all terms and conditions
termsConditionRoutes.get("/", getTermsConditions);

// Route for creating or updating terms and conditions
termsConditionRoutes.post("/", postTermsCondition);

// Route for fetching a single terms and conditions by ID
termsConditionRoutes.get("/:id", getTermsConditionById);

// Route for updating terms and conditions by ID
termsConditionRoutes.put("/:id", putTermsCondition);

// Route for deleting terms and conditions by ID
termsConditionRoutes.delete("/:id", deleteTermsCondition);

export default termsConditionRoutes;
