import express from 'express';
import { createFacebookPixel, deleteFacebookPixelById, getAllFacebookPixel, getFacebookPixelById, updateFacebookPixelById } from './FacebookPixel.controller.js';

const FacebookPixelRoutes = express.Router();

FacebookPixelRoutes.get('/', getAllFacebookPixel); // GET all FacebookPixels
FacebookPixelRoutes.post('/', createFacebookPixel); // POST new FacebookPixel
FacebookPixelRoutes.get('/:id', getFacebookPixelById); // GET FacebookPixel by ID
FacebookPixelRoutes.put('/:id', updateFacebookPixelById); // PUT update FacebookPixel by ID
FacebookPixelRoutes.delete('/:id', deleteFacebookPixelById); // DELETE FacebookPixel by ID

export default FacebookPixelRoutes;
