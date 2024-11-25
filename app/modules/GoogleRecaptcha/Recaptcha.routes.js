import express from 'express';
import { createRecaptcha, deleteRecaptchaById, getAllRecaptcha, getRecaptchaById, updateRecaptchaById } from './Recaptcha.controller.js';

const productRecaptchaRoutes = express.Router();

productRecaptchaRoutes.get('/', getAllRecaptcha); // GET all Recaptchas
productRecaptchaRoutes.post('/', createRecaptcha); // POST new Recaptcha
productRecaptchaRoutes.get('/:id', getRecaptchaById); // GET Recaptcha by ID
productRecaptchaRoutes.put('/:id', updateRecaptchaById); // PUT update Recaptcha by ID
productRecaptchaRoutes.delete('/:id', deleteRecaptchaById); // DELETE Recaptcha by ID

export default productRecaptchaRoutes;
