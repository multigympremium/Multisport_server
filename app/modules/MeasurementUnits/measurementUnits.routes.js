import express from 'express';
import {
  getAllUnits,
  getUnitById,
  createUnit,
  updateUnitById,
  deleteUnitById,
} from './measurementUnits.controller.js';

const measurementUnits = express.Router();

measurementUnits.get('/', getAllUnits);
measurementUnits.get('/:id', getUnitById);
measurementUnits.post('/', createUnit);
measurementUnits.put('/:id', updateUnitById);
measurementUnits.delete('/:id', deleteUnitById);

export default measurementUnits;
