import express from 'express';
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from './subcategory.controller';

const subcategoryRoutes = express.Router();

// Get all categories
subcategoryRoutes.get('/categories', getCategories);

// Create a new category
subcategoryRoutes.post('/categories', createCategory);

// Get category by ID
subcategoryRoutes.get('/categories/:id', getCategoryById);

// Update category by ID
subcategoryRoutes.put('/categories/:id', updateCategory);

// Delete category by ID
subcategoryRoutes.delete('/categories/:id', deleteCategory);

export default subcategoryRoutes;
