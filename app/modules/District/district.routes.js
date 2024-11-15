import express from 'express';
import {
  createDistrict,
  getAllDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
} from './district.controller.js';

const districtRoutes = express.Router();

// Route to create a new district
districtRoutes.post('/', createDistrict);

// Route to get all districts
districtRoutes.get('/', getAllDistricts);

// Route to get a single district by ID
districtRoutes.get('/:id', getDistrictById);

// Route to update a district by ID
districtRoutes.put('/:id', updateDistrict);

// Route to delete a district by ID
districtRoutes.delete('/:id', deleteDistrict);

export default districtRoutes;
