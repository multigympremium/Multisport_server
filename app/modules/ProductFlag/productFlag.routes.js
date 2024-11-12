import express from 'express';
import { getAllFlags, createFlag, getFlagById, updateFlag, deleteFlag } from './productFlag.controller.js';

const productFlagRoutes = express.Router();

// GET all flags
productFlagRoutes.get('/', getAllFlags);

// POST a new flag
productFlagRoutes.post('/', createFlag);

// GET a flag by ID
productFlagRoutes.get('/:id', getFlagById);

// PUT (update) a flag by ID
productFlagRoutes.put('/:id', updateFlag);

// DELETE a flag by ID
productFlagRoutes.delete('/:id', deleteFlag);

export default productFlagRoutes;
