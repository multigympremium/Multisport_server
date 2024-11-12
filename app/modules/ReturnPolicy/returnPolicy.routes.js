
import express from 'express';
import {
  getAllReturnPolicies,
  createOrUpdateReturnPolicy,
  getReturnPolicyById,
  updateReturnPolicy,
  deleteReturnPolicy,
} from './returnPolicy.controller.js';

const returnPolicy = express.Router();

// GET: Get all return policies
returnPolicy.get('/', getAllReturnPolicies);

// POST: Create or update return policy
returnPolicy.post('/', createOrUpdateReturnPolicy);

// GET: Get return policy by ID
returnPolicy.get('/:id', getReturnPolicyById);

// PUT: Update return policy
returnPolicy.put('/:id', updateReturnPolicy);

// DELETE: Delete return policy
returnPolicy.delete('/:id', deleteReturnPolicy);

export default returnPolicy;
