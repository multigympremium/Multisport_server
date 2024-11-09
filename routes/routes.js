import { Router } from "express";
import AboutMissionRoutes from "../app/modules/AboutMission/aboutMission.routes";
import aboutUsRoutes from "../app/modules/AboutUs/aboutUs.routes";
import aboutVisionRoutes from "../app/modules/AboutVission/aboutVision.routes";
import bagBannerRoutes from "../app/modules/BagBanner/bagBanner.routes";
import bannerRoutes from "../app/modules/Banner/banner.routes";

const routes = Router();
// routes.use("/branches", BranchRoutes);
routes.use("/about-mission", AboutMissionRoutes);
routes.use("/about-us", aboutUsRoutes);
routes.use("/about-vision", aboutVisionRoutes);
routes.use("/bag-banners", bagBannerRoutes );
routes.use("/banners", bannerRoutes );


export default routes;
