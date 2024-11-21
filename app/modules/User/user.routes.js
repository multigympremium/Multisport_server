import express from 'express';
import updatePassword, { createSystemUser, getSystemUser, loginUser, sendOtp, signUp, verifyOtp } from './user.controller.js';

const userRoutes = express.Router();

// GET all Website SEO data
userRoutes.get('/login', loginUser);

// POST Website SEO data
userRoutes.post('/forgot-password', updatePassword);

// GET Website SEO data by ID
userRoutes.get('/send-otp', sendOtp);

// PUT Website SEO data by ID
userRoutes.put('/verify-otp', verifyOtp);

// DELETE Website SEO data by ID
userRoutes.post('/signup', signUp);
userRoutes.post('/system-user', createSystemUser);
userRoutes.get('/system-user', getSystemUser);

export default userRoutes;
