import express from 'express';
import { deleteAboutMission, getAboutMissionById, updateAboutMission } from './aboutMission.controller';
const AboutMissionRoutes = express.Router();

// Route for getting the AboutMission by ID
AboutMissionRoutes.get('/:id', getAboutMissionById);

// Route for updating the AboutMission by ID
AboutMissionRoutes.put('/:id', updateAboutMission);

// Route for deleting the AboutMission by ID
AboutMissionRoutes.delete('/:id', deleteAboutMission);

export default AboutMissionRoutes;
