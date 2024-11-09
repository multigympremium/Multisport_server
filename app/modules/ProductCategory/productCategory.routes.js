// routes/categoryRoutes.js

import express from 'express';
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from './productCategory.controller';

const productCategoryRoutes = express.Router();

productCategoryRoutes.get('/', getCategories);
productCategoryRoutes.post('/', createCategory);
productCategoryRoutes.get('/:id', getCategoryById);
productCategoryRoutes.put('/:id', updateCategoryById);
productCategoryRoutes.delete('/:id', deleteCategoryById);

export default productCategoryRoutes;
