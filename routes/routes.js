import { Router } from "express";
import AboutMissionRoutes from "../app/modules/AboutMission/aboutMission.routes";
import aboutUsRoutes from "../app/modules/AboutUs/aboutUs.routes";

const routes = Router();
// routes.use("/branches", BranchRoutes);
routes.use("/about-mission", AboutMissionRoutes);
routes.use("/about-us", aboutUsRoutes);


export default routes;
