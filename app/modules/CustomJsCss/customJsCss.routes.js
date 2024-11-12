// routes/customCssAndJsRoutes.js
import express from 'express';
import {
  getAllInfo,
  getInfoById,
  createInfo,
  updateInfo,
  deleteInfo
} from './customJsCss.controller.js';

const customJsCssRoutes = express.Router();

customJsCssRoutes.get('/', getAllInfo);
customJsCssRoutes.get('/:id', getInfoById);
customJsCssRoutes.post('/', createInfo);
customJsCssRoutes.put('/:id', updateInfo);
customJsCssRoutes.delete('/:id', deleteInfo);

export default customJsCssRoutes;
