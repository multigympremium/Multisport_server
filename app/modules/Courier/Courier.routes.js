
import express from 'express';
import {courierCities} from './Courier.controller.js';

const courierRoutes = express.Router();

courierRoutes.get('/cities', courierCities);

export default courierRoutes;
