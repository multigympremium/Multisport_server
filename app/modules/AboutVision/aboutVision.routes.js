import express from 'express';
import { getAboutVisionById, updateAboutVision, deleteAboutVision, getAboutVision, createAboutVision } from './aboutVision.controller.js';

const aboutVisionRoutes = express.Router();

// Route for getting AboutVision items with optional search
aboutVisionRoutes.get('/', getAboutVision);

// Route for creating a new AboutVision item
aboutVisionRoutes.post('/', createAboutVision);

// Route for getting AboutVision by ID
aboutVisionRoutes.get('/:id', getAboutVisionById);

// Route for updating AboutVision by ID
aboutVisionRoutes.put('/:id', updateAboutVision);

// Route for deleting AboutVision by ID
aboutVisionRoutes.delete('/:id', deleteAboutVision);

export default aboutVisionRoutes;
