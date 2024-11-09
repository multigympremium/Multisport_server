import { Router } from "express";
import AboutMissionRoutes from "../app/modules/AboutMission/aboutMission.routes";

const routes = Router();
// routes.use("/branches", BranchRoutes);
routes.use("/about-mission", AboutMissionRoutes);


export default routes;
