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
import orderRoutes from "../app/modules/Orders/orders.routes";
import PrivacyPolicyRoutes from "../app/modules/PrivacyPolicy/privacyPolicy.routes";
import brandRoutes from "../app/modules/Brand/brand.routes";
import productColorRoutes from "../app/modules/ProductColor/ProductColor.routes";
import productFlagRoutes from "../app/modules/ProductFlag/productFlag.routes";
import productSizeRoutes from "../app/modules/ProductSize/productSize.routes";
import productRoutes from "../app/modules/Product/product.routes";
import shippingAddressRoutes from "../app/modules/ShippingAddress/shippingAddress.routes";
import shippingPolicy from "../app/modules/ShippingPolicy/shippingPolicy.routes";
import returnPolicy from "../app/modules/ReturnPolicy/returnPolicy.routes";
import shoesBannerRoutes from "../app/modules/ShoesBanner/shoesBanner.routes";
import socialLinkRoutes from "../app/modules/SocialLink/socialLink.routes";
import subcategoryRoutes from "../app/modules/Subcategory/subcategory.routes";
import termsConditionRoutes from "../app/modules/TermsCondition/termsCondition.routes";
import testimonialsRoutes from "../app/modules/testimonials/testimonials.routes";
import websiteSEORoutes from "../app/modules/WebsiteSEO/websiteSEO.routes";
import websiteThemeColorRoutes from "../app/modules/WebsiteThemeColor/websiteThemeColor.routes";

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
routes.use("/orders", orderRoutes );
routes.use("/privacy_policy", PrivacyPolicyRoutes);
routes.use("/product-brands", brandRoutes);
routes.use("/product-color", productColorRoutes);
routes.use("/product-flag", productFlagRoutes);
routes.use("/product-size", productSizeRoutes);
routes.use("/products", productRoutes);
routes.use("/shipping", shippingAddressRoutes);
routes.use("/shipping_policy", shippingPolicy);
routes.use("/return_policy", returnPolicy);
routes.use("/return_policy", returnPolicy);
routes.use("/shoes-banners", shoesBannerRoutes);
routes.use("/social-link", socialLinkRoutes);
routes.use("/subcategories", subcategoryRoutes);
routes.use("/terms_condition", termsConditionRoutes);
routes.use("/testimonials", testimonialsRoutes);
routes.use("/website-seo", websiteSEORoutes);
routes.use("/website-theme-color", websiteThemeColorRoutes);


export default routes;
