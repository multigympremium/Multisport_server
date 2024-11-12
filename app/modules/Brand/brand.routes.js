import express from 'express';
import {
  getBrands,
  createBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
} from './brand.controller.js';

const brandRoutes = express.Router();

// GET all brands
brandRoutes.get('/', getBrands);

// POST a new brand
brandRoutes.post('/', createBrand);

// GET a specific brand by ID
brandRoutes.get('/:id', getBrandById);

// PUT to update a brand by ID
brandRoutes.put('/:id', updateBrand);

// DELETE a brand by ID
brandRoutes.delete('/:id', deleteBrand);

export default brandRoutes;
