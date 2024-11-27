import express from 'express';
import { createGoogleAnalytic, deleteGoogleAnalyticById, getAllGoogleAnalytic, getGoogleAnalyticById, updateGoogleAnalyticById } from './GoogleAnalytic.controller.js';

const GoogleAnalyticRoutes = express.Router();

GoogleAnalyticRoutes.get('/', getAllGoogleAnalytic); // GET all GoogleAnalytics
GoogleAnalyticRoutes.post('/', createGoogleAnalytic); // POST new GoogleAnalytic
GoogleAnalyticRoutes.get('/:id', getGoogleAnalyticById); // GET GoogleAnalytic by ID
GoogleAnalyticRoutes.put('/:id', updateGoogleAnalyticById); // PUT update GoogleAnalytic by ID
GoogleAnalyticRoutes.delete('/:id', deleteGoogleAnalyticById); // DELETE GoogleAnalytic by ID

export default GoogleAnalyticRoutes;
