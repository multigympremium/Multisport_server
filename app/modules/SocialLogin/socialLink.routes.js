import express from 'express';
import {
  getSocialLogins,
  createSocialLogin,
  getSocialLoginById,
  updateSocialLogin,
  deleteSocialLogin
} from './SocialLogin.controller.js';

const socialLoginRoutes = express.Router();

// GET: Fetch all social Logins
socialLoginRoutes.get('/', getSocialLogins);

// POST: Create a new social Login
socialLoginRoutes.post('/', createSocialLogin);

// GET: Get social Login by ID
socialLoginRoutes.get('/:id', getSocialLoginById);

// PUT: Update social Login by ID
socialLoginRoutes.put('/:id', updateSocialLogin);

// DELETE: Delete social Login by ID
socialLoginRoutes.delete('/:id', deleteSocialLogin);

export default socialLoginRoutes;
