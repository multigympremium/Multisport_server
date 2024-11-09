import { Router } from "express";
import AboutMissionRoutes from "../app/modules/AboutMission/aboutMission.routes";
import aboutUsRoutes from "../app/modules/AboutUs/aboutUs.routes";
import aboutVisionRoutes from "../app/modules/AboutVission/aboutVision.routes";

const routes = Router();
// routes.use("/branches", BranchRoutes);
routes.use("/about-mission", AboutMissionRoutes);
routes.use("/about-us", aboutUsRoutes);
routes.use("/about-vision", aboutVisionRoutes);


export default routes;
