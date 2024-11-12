import express from "express";
import {
  getAllPrivacyPolicies,
  getPrivacyPolicyById,
  createOrUpdatePrivacyPolicy,
  updatePrivacyPolicyById,
  deletePrivacyPolicyById,
} from "./privacyPolicy.controller.js";

const PrivacyPolicyRoutes = express.Router();

PrivacyPolicyRoutes.get("/", getAllPrivacyPolicies);
PrivacyPolicyRoutes.get("/:id", getPrivacyPolicyById);
PrivacyPolicyRoutes.post("/", createOrUpdatePrivacyPolicy);
PrivacyPolicyRoutes.put("/:id", updatePrivacyPolicyById);
PrivacyPolicyRoutes.delete("/:id", deletePrivacyPolicyById);

export default PrivacyPolicyRoutes;
