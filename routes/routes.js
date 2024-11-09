import { Router } from "express";
import AboutMissionRoutes from "../app/modules/AboutMission/aboutMission.routes";
import aboutUsRoutes from "../app/modules/AboutUs/aboutUs.routes";
import bagBannerRoutes from "../app/modules/BagBanner/bagBanner.routes";
import bannerRoutes from "../app/modules/Banner/banner.routes";
import blogRoutes from "../app/modules/Blog/blog.routes";
import aboutVisionRoutes from "../app/modules/AboutVision/aboutVision.routes";
import blogCategoryRoutes from "../app/modules/BagCategory/blogCategory.routes";
import productCategoryRoutes from "../app/modules/ProductCategory/productCategory.routes";
import childCategoryRoutes from "../app/modules/ChildCategory/childCategory.routes";
import customJsCssRoutes from "../app/modules/CustomJsCss/customJsCss.routes";
import measurementUnits from "../app/modules/MeasurementUnits/measurementUnits.routes";

const routes = Router();
// routes.use("/branches", BranchRoutes);
routes.use("/about-mission", AboutMissionRoutes);
routes.use("/about-us", aboutUsRoutes);
routes.use("/about-vision", aboutVisionRoutes);
routes.use("/bag-banners", bagBannerRoutes );
routes.use("/banners", bannerRoutes );
routes.use("/blog", blogRoutes );
routes.use("/blog-category", blogCategoryRoutes );
routes.use("/categories", productCategoryRoutes );
routes.use("/child-categories", childCategoryRoutes );
routes.use("/custom-css-js", customJsCssRoutes );
routes.use("/general-info", customJsCssRoutes );
routes.use("/measurement-units", measurementUnits );


export default routes;
