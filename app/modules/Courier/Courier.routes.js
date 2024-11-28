
import express from 'express';
import {courierCities, courierZones} from './Courier.controller.js';

const courierRoutes = express.Router();

courierRoutes.get('/cities', courierCities);
courierRoutes.get('/zones/:id', courierZones);

export default courierRoutes;
