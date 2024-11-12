import express from 'express';
import {
  getAllSizes,
  createSize,
  getSizeById,
  updateSizeById,
  deleteSizeById,
} from './productSize.controller.js';

const productSizeRoutes = express.Router();

productSizeRoutes.get('/', getAllSizes); // GET all sizes
productSizeRoutes.post('/', createSize); // POST new size
productSizeRoutes.get('/:id', getSizeById); // GET size by ID
productSizeRoutes.put('/:id', updateSizeById); // PUT update size by ID
productSizeRoutes.delete('/:id', deleteSizeById); // DELETE size by ID

export default productSizeRoutes;
