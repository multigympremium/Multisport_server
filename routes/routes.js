import { Router } from "express";
import AboutMissionRoutes from "../app/modules/AboutMission/aboutMission.routes.js";
import aboutUsRoutes from "../app/modules/AboutUs/aboutUs.routes.js";
import bagBannerRoutes from "../app/modules/BagBanner/bagBanner.routes.js";
import bannerRoutes from "../app/modules/Banner/banner.routes.js";
import blogRoutes from "../app/modules/Blog/blog.routes.js";
import aboutVisionRoutes from "../app/modules/AboutVision/aboutVision.routes.js";
import blogCategoryRoutes from "../app/modules/BlogCategory/blogCategory.routes.js";
import productCategoryRoutes from "../app/modules/ProductCategory/productCategory.routes.js";
import childCategoryRoutes from "../app/modules/ChildCategory/childCategory.routes.js";
import customJsCssRoutes from "../app/modules/CustomJsCss/customJsCss.routes.js";
import measurementUnits from "../app/modules/MeasurementUnits/measurementUnits.routes.js";
import orderRoutes from "../app/modules/Orders/orders.routes.js";
import PrivacyPolicyRoutes from "../app/modules/PrivacyPolicy/privacyPolicy.routes.js";
import brandRoutes from "../app/modules/Brand/brand.routes.js";
import productColorRoutes from "../app/modules/ProductColor/ProductColor.routes.js";
import productFlagRoutes from "../app/modules/ProductFlag/productFlag.routes.js";
import productSizeRoutes from "../app/modules/ProductSize/productSize.routes.js";
import productRoutes from "../app/modules/Product/product.routes.js";
import shippingAddressRoutes from "../app/modules/ShippingAddress/shippingAddress.routes.js";
import shippingPolicy from "../app/modules/ShippingPolicy/shippingPolicy.routes.js";
import returnPolicy from "../app/modules/ReturnPolicy/returnPolicy.routes.js";
import shoesBannerRoutes from "../app/modules/ShoesBanner/shoesBanner.routes.js";
import socialLinkRoutes from "../app/modules/SocialLink/socialLink.routes.js";
import subcategoryRoutes from "../app/modules/Subcategory/subcategory.routes.js";
import termsConditionRoutes from "../app/modules/TermsCondition/termsCondition.routes.js";
import testimonialsRoutes from "../app/modules/testimonials/testimonials.routes.js";
import websiteSEORoutes from "../app/modules/WebsiteSEO/websiteSEO.routes.js";
import websiteThemeColorRoutes from "../app/modules/WebsiteThemeColor/websiteThemeColor.routes.js";
import wishlistRoutes from "../app/modules/Wishlist/wishlist.routes.js";
import userRoutes from "../app/modules/User/user.routes.js";
import districtRoutes from "../app/modules/District/district.routes.js";
import deliveryChargeRoutes from "../app/modules/DeliveryCharge/deliveryCharge.routes.js";
import FaqRoutes from "../app/modules/faq/faq.routes.js";
import generalInfoRoutes from "../app/modules/GeneralInfo/generalInfo.routes.js";
import permissionRoutes from "../app/modules/Permission/permission.routes.js";
import DepartmentsRoutes from "../app/modules/Departments/Departments.routes.js";
import productRecaptchaRoutes from "../app/modules/GoogleRecaptcha/Recaptcha.routes.js";
import socialLoginRoutes from "../app/modules/SocialLogin/socialLink.routes.js";
import productTawkRoutes from "../app/modules/TawkLiveChat/TawkLiveChat.routes.js";
import TawkRoutes from "../app/modules/TawkLiveChat/TawkLiveChat.routes.js";
import CrispRoutes from "../app/modules/CrispLiveChat/CrispLiveChat.routes.js";
import GoogleAnalyticRoutes from "../app/modules/GoogleAnalytic/GoogleAnalytic.routes.js";
import FacebookPixelRoutes from "../app/modules/FacebookPixel/FacebookPixel.routes.js";
import MessengerRoutes from "../app/modules/Messenger/Messenger.routes.js";
import courierRoutes from "../app/modules/Courier/Courier.routes.js";
import SetupConfigRoutes from "../app/modules/SetupConfig/SetupConfig.routes.js";
import ModelOfBrandRoutes from "../app/modules/ModelOfBrand/ModelOfBrand.routes.js";
import CustomPageRoutes from "../app/modules/CustomPage/CustomPage.routes.js";
import discountRoutes from "../app/modules/Discount/Discount.routes.js";
import PromoBannerRoutes from "../app/modules/PromotionalBanner/PromotionalBanner.routes.js";

const routes = Router();
// routes.use("/branches", BranchRoutes);gggrRoutes);
routes.use("/about-us", aboutUsRoutes);
routes.use("/about-mission", AboutMissionRoutes);
routes.use("/about-vision", aboutVisionRoutes);
routes.use("/banners", bannerRoutes);
routes.use("/blog", blogRoutes);
routes.use("/blog-category", blogCategoryRoutes);
routes.use("/categories", productCategoryRoutes);
routes.use("/child-categories", childCategoryRoutes);
routes.use("/custom-css-js", customJsCssRoutes);
routes.use("/custom-pages", CustomPageRoutes);
routes.use("/courier", courierRoutes);

routes.use("/discount", discountRoutes);
routes.use("/departments", DepartmentsRoutes);
routes.use("/district", districtRoutes);
routes.use("/delivery-charge", deliveryChargeRoutes);
routes.use("/faq", FaqRoutes);
routes.use("/facebook-pixel", FacebookPixelRoutes);
routes.use("/general-info", generalInfoRoutes);
routes.use("/google-recaptcha", productRecaptchaRoutes);
routes.use("/google-analytic", GoogleAnalyticRoutes);
routes.use("/measurement-units", measurementUnits);
routes.use("/messenger", MessengerRoutes);
routes.use("/model-brands", ModelOfBrandRoutes);
routes.use("/orders", orderRoutes);
routes.use("/permissions", permissionRoutes);
routes.use("/privacy_policy", PrivacyPolicyRoutes);
routes.use("/product-brands", brandRoutes);
routes.use("/product-color", productColorRoutes);
routes.use("/product-flag", productFlagRoutes);
routes.use("/product-size", productSizeRoutes);
routes.use("/products", productRoutes);
routes.use("/promo-banner", PromoBannerRoutes);
routes.use("/shipping", shippingAddressRoutes);
routes.use("/setup-config", SetupConfigRoutes);
routes.use("/shipping_policy", shippingPolicy);
routes.use("/return_policy", returnPolicy);
routes.use("/return_policy", returnPolicy);
routes.use("/shoes-banners", shoesBannerRoutes);
routes.use("/social-link", socialLinkRoutes);
routes.use("/social-login-config", socialLoginRoutes);
routes.use("/subcategories", subcategoryRoutes);
routes.use("/terms_condition", termsConditionRoutes);
routes.use("/testimonials", testimonialsRoutes);
routes.use("/tawk-live-chat", TawkRoutes);
routes.use("/website-seo", websiteSEORoutes);
routes.use("/website-theme-color", websiteThemeColorRoutes);
routes.use("/wishlist", wishlistRoutes);
routes.use("/users", userRoutes);
routes.use("/subcategories", subcategoryRoutes);

export default routes;
