import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById
} from './blogCategory.controller.js';

const blogCategoryRoutes = express.Router();

blogCategoryRoutes.get('/', getAllCategories);                    // GET all categories
blogCategoryRoutes.get('/:id', getCategoryById);                  // GET a single category by ID
blogCategoryRoutes.post('/', createCategory);                     // POST a new category
blogCategoryRoutes.put('/:id', updateCategoryById);               // PUT update a category by ID
blogCategoryRoutes.delete('/:id', deleteCategoryById);            // DELETE a category by ID

export default blogCategoryRoutes;
