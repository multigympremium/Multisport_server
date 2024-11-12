import express from 'express';
import {
  getTestimonials,
  postTestimonial,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} from './testimonials.controller.js';

const testimonialsRoutes = express.Router();

testimonialsRoutes.get('/', getTestimonials);
testimonialsRoutes.post('/', postTestimonial);
testimonialsRoutes.get('/:id', getTestimonialById);
testimonialsRoutes.put('/:id', updateTestimonial);
testimonialsRoutes.delete('/:id', deleteTestimonial);

export default testimonialsRoutes;
