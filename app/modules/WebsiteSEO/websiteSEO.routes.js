import express from 'express';
import { getWebsiteSEO, createWebsiteSEO, getWebsiteSEOById, updateWebsiteSEO, deleteWebsiteSEO } from './websiteSEO.controller.js';

const websiteSEORoutes = express.Router();

// GET all Website SEO data
websiteSEORoutes.get('/website-seo', getWebsiteSEO);

// POST Website SEO data
websiteSEORoutes.post('/website-seo', createWebsiteSEO);

// GET Website SEO data by ID
websiteSEORoutes.get('/website-seo/:id', getWebsiteSEOById);

// PUT Website SEO data by ID
websiteSEORoutes.put('/website-seo/:id', updateWebsiteSEO);

// DELETE Website SEO data by ID
websiteSEORoutes.delete('/website-seo/:id', deleteWebsiteSEO);

export default websiteSEORoutes;
