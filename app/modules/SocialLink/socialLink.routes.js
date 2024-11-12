import express from 'express';
import {
  getSocialLinks,
  createSocialLink,
  getSocialLinkById,
  updateSocialLink,
  deleteSocialLink
} from './socialLink.controller.js';

const socialLinkRoutes = express.Router();

// GET: Fetch all social links
socialLinkRoutes.get('/', getSocialLinks);

// POST: Create a new social link
socialLinkRoutes.post('/', createSocialLink);

// GET: Get social link by ID
socialLinkRoutes.get('/:id', getSocialLinkById);

// PUT: Update social link by ID
socialLinkRoutes.put('/:id', updateSocialLink);

// DELETE: Delete social link by ID
socialLinkRoutes.delete('/:id', deleteSocialLink);

export default socialLinkRoutes;
