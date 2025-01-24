import express from "express";
import {
  createSystemUser,
  deleteSystemUser,
  getSystemUser,
  getSystemUserById,
  loginUser,
  sendOtp,
  signUp,
  updateSystemUserById,
  verifyOtp,
  verifyRecaptcha,
  isUserExist,
  updatePassword,
  changePassword,
  updateUser,
  updateUserPhoto,
  getCustomers,
} from "./user.controller.js";

const userRoutes = express.Router();

// GET all Website SEO data
userRoutes.post("/login", loginUser);
userRoutes.get("/is_user_exist/:id", isUserExist);
userRoutes.get("/customers", getCustomers);

// POST Website SEO data
userRoutes.post("/forgot-password", updatePassword);
userRoutes.post("/update-user/:email", updateUser);
userRoutes.post("/change-password", changePassword);
userRoutes.post("/change-user-photo/:email", updateUserPhoto);

// GET Website SEO data by ID
userRoutes.post("/send-otp", sendOtp);

// PUT Website SEO data by ID
userRoutes.post("/verify-otp", verifyOtp);
userRoutes.post("/verify-recaptcha", verifyRecaptcha);

// DELETE Website SEO data by ID
userRoutes.post("/signup", signUp);
userRoutes.post("/system-user", createSystemUser);
userRoutes.get("/system-user", getSystemUser);
userRoutes.get("/system-user/:id", getSystemUserById);
userRoutes.put("/system-user/:id", updateSystemUserById);
userRoutes.delete("/system-user/:id", deleteSystemUser);

export default userRoutes;
