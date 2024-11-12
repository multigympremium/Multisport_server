import express from 'express';

const bannerRoutes = express.Router();
import { getBanners, createBanner, getBannerById, updateBanner, deleteBanner } from './banner.controller.js';


// Route for fetching Banners with optional search filter
bannerRoutes.get('/', getBanners);

// Route for creating a new Banner
bannerRoutes.post('/', createBanner);

bannerRoutes.get('/:id', getBannerById);       // GET Banner by ID
bannerRoutes.put('/:id', updateBanner);         // PUT (update) Banner by ID
bannerRoutes.delete('/:id', deleteBanner);      // DELETE Banner by ID

export default bannerRoutes;
