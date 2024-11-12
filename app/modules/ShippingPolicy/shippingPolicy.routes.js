// routes/shippingPolicyRoutes.js
import express from 'express';
import {
  getAllShippingPolicies,
  getShippingPolicyById,
  createOrUpdateShippingPolicy,
  updateShippingPolicy,
  deleteShippingPolicy
} from './shippingPolicy.controller.js';

const shippingPolicy = express.Router();

// GET all shipping policies
shippingPolicy.get('/', getAllShippingPolicies);

// GET a specific shipping policy by ID
shippingPolicy.get('/:id', getShippingPolicyById);

// POST create or update a shipping policy
shippingPolicy.post('/', createOrUpdateShippingPolicy);

// PUT update an existing shipping policy
shippingPolicy.put('/:id', updateShippingPolicy);

// DELETE a shipping policy by ID
shippingPolicy.delete('/:id', deleteShippingPolicy);

export default shippingPolicy;
