import express from 'express';
import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrandById,
  deleteBrandById,
} from './generalInfo.controller.js';

const generalInfoRoutes = express.Router();

generalInfoRoutes.get('/', getAllBrands);
generalInfoRoutes.get('/:id', getBrandById);
generalInfoRoutes.post('/', createBrand);
generalInfoRoutes.put('/:id', updateBrandById);
generalInfoRoutes.delete('/:id', deleteBrandById);

export default generalInfoRoutes;
