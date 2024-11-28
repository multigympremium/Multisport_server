
import express from 'express';
import {courierArea, courierCities, courierStoreCreate, courierStoreGet, courierZones} from './Courier.controller.js';

const courierRoutes = express.Router();

courierRoutes.get('/cities', courierCities);
courierRoutes.get('/zones/:id', courierZones);
courierRoutes.get('/area/:id', courierArea);
courierRoutes.get('/store', courierStoreGet);
courierRoutes.post('/store', courierStoreCreate);

export default courierRoutes;
