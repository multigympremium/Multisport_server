import express from 'express';
import {
  getAllThemes,
  createTheme,
  getThemeById,
  updateTheme,
  deleteTheme
} from './websiteThemeColor.controller.js';

const websiteThemeColorRoutes = express.Router();

// Route to get all themes
websiteThemeColorRoutes.get('/', getAllThemes);

// Route to create a new theme
websiteThemeColorRoutes.post('/', createTheme);

// Route to get a theme by ID
websiteThemeColorRoutes.get('/:id', getThemeById);

// Route to update a theme by ID
websiteThemeColorRoutes.put('/:id', updateTheme);

// Route to delete a theme by ID
websiteThemeColorRoutes.delete('/:id', deleteTheme);

export default websiteThemeColorRoutes;
