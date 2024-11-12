import express from 'express';
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from './subcategory.controller.js';

const subcategoryRoutes = express.Router();

// Get all categories
subcategoryRoutes.get('/', getCategories);

// Create a new category
subcategoryRoutes.post('/', createCategory);

// Get category by ID
subcategoryRoutes.get('/:id', getCategoryById);

// Update category by ID
subcategoryRoutes.put('/:id', updateCategory);

// Delete category by ID
subcategoryRoutes.delete('/:id', deleteCategory);

export default subcategoryRoutes;
