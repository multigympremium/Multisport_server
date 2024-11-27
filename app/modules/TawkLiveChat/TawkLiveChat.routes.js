import express from 'express';
import { createTawk, deleteTawkById, getAllTawk, getTawkById, updateTawkById } from './TawkLiveChat.controller.js';

const TawkRoutes = express.Router();

TawkRoutes.get('/', getAllTawk); // GET all Tawks
TawkRoutes.post('/', createTawk); // POST new Tawk
TawkRoutes.get('/:id', getTawkById); // GET Tawk by ID
TawkRoutes.put('/:id', updateTawkById); // PUT update Tawk by ID
TawkRoutes.delete('/:id', deleteTawkById); // DELETE Tawk by ID

export default TawkRoutes;
