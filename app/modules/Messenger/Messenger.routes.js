import express from 'express';
import { createMessenger, deleteMessengerById, getAllMessenger, getMessengerById, updateMessengerById } from './Messenger.controller.js';

const MessengerRoutes = express.Router();

MessengerRoutes.get('/', getAllMessenger); // GET all Messenger
MessengerRoutes.post('/', createMessenger); // POST new Messenger
MessengerRoutes.get('/:id', getMessengerById); // GET Messenger by ID
MessengerRoutes.put('/:id', updateMessengerById); // PUT update Messenger by ID
MessengerRoutes.delete('/:id', deleteMessengerById); // DELETE Messenger by ID

export default MessengerRoutes;
