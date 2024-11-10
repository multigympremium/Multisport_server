import express from 'express';
import {
  getAllThemes,
  createTheme,
  getThemeById,
  updateTheme,
  deleteTheme
} from './websiteThemeColor.controller';

const websiteThemeColorRoutes = express.Router();

// Route to get all themes
websiteThemeColorRoutes.get('/themes', getAllThemes);

// Route to create a new theme
websiteThemeColorRoutes.post('/themes', createTheme);

// Route to get a theme by ID
websiteThemeColorRoutes.get('/themes/:id', getThemeById);

// Route to update a theme by ID
websiteThemeColorRoutes.put('/themes/:id', updateTheme);

// Route to delete a theme by ID
websiteThemeColorRoutes.delete('/themes/:id', deleteTheme);

export default websiteThemeColorRoutes;
