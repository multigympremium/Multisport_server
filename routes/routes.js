import { Router } from "express";
import AboutMissionRoutes from "../app/modules/AboutMission/aboutMission.routes";
import aboutUsRoutes from "../app/modules/AboutUs/aboutUs.routes";
import bagBannerRoutes from "../app/modules/BagBanner/bagBanner.routes";
import bannerRoutes from "../app/modules/Banner/banner.routes";
import blogRoutes from "../app/modules/Blog/blog.routes";
import aboutVisionRoutes from "../app/modules/AboutVision/aboutVision.routes";

const routes = Router();
// routes.use("/branches", BranchRoutes);
routes.use("/about-mission", AboutMissionRoutes);
routes.use("/about-us", aboutUsRoutes);
routes.use("/about-vision", aboutVisionRoutes);
routes.use("/bag-banners", bagBannerRoutes );
routes.use("/banners", bannerRoutes );
routes.use("/blog", blogRoutes );


export default routes;
