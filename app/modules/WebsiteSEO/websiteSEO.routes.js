import express from 'express';
import { getWebsiteSEO, createWebsiteSEO, getWebsiteSEOById, updateWebsiteSEO, deleteWebsiteSEO } from './websiteSEO.controller.js';

const websiteSEORoutes = express.Router();

// GET all Website SEO data
websiteSEORoutes.get('/', getWebsiteSEO);

// POST Website SEO data
websiteSEORoutes.post('/', createWebsiteSEO);

// GET Website SEO data by ID
websiteSEORoutes.get('/:id', getWebsiteSEOById);

// PUT Website SEO data by ID
websiteSEORoutes.put('/:id', updateWebsiteSEO);

// DELETE Website SEO data by ID
websiteSEORoutes.delete('/:id', deleteWebsiteSEO);

export default websiteSEORoutes;
