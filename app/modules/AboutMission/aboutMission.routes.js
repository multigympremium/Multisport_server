import express from 'express';
import { deleteAboutMission, getAboutMission, getAboutMissionById, postAboutMission, updateAboutMission } from './aboutMission.controller.js';
const AboutMissionRoutes = express.Router();

// Route for getting the AboutMission by ID
AboutMissionRoutes.get('/', getAboutMission);
AboutMissionRoutes.get('/:id', getAboutMissionById);

AboutMissionRoutes.post('/', postAboutMission);
// Route for updating the AboutMission by ID
AboutMissionRoutes.put('/:id', updateAboutMission);

// Route for deleting the AboutMission by ID
AboutMissionRoutes.delete('/:id', deleteAboutMission);

export default AboutMissionRoutes;
