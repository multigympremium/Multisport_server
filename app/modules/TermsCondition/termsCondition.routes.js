import express from 'express';
import { getTermsConditions, postTermsCondition, getTermsConditionById, putTermsCondition, deleteTermsCondition } from './termsCondition.controller';

const termsConditionRoutes = express.Router();

// Route for fetching all terms and conditions
termsConditionRoutes.get('/terms-conditions', getTermsConditions);

// Route for creating or updating terms and conditions
termsConditionRoutes.post('/terms-conditions', postTermsCondition);

// Route for fetching a single terms and conditions by ID
termsConditionRoutes.get('/terms-conditions/:id', getTermsConditionById);

// Route for updating terms and conditions by ID
termsConditionRoutes.put('/terms-conditions/:id', putTermsCondition);

// Route for deleting terms and conditions by ID
termsConditionRoutes.delete('/terms-conditions/:id', deleteTermsCondition);

export default termsConditionRoutes;
