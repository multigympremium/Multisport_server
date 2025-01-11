import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import BrandModel from "./brand.model.js";

// GET all brands
export const getBrands = async (req, res) => {
  try {
    const brands = await BrandModel.find({});
    res.status(200).json({ success: true, data: brands });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// GET all brands
export const getBrandBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const brands = await BrandModel.findOne({ slug });
    res.status(200).json({ success: true, data: brands });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST a new brand
export const createBrand = async (req, res) => {
  try {
    const { category, subcategory, slug, isActive, featureBrand, brandName } =
      req.body;
    const logo = req.files?.logo;
    const banner = req.files?.banner;

    if (!category || !subcategory || !slug || !brandName) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const newBrandData = {
      category,
      subcategory,
      slug,
      isActive: isActive === "true",
      featureBrand: featureBrand === "true",
      brandName,
    };

    // Handle logo upload
    if (logo) {
      const logoName = `other-image/brand/${Date.now()}-${logo.name.replace(
        /\s/g,
        "-"
      )}`;
      newBrandData.logo = logoName;
      await uploadFile(logo, logoName, logo.mimetype);
    }

    // Handle banner upload
    if (banner) {
      const bannerName = `other-image/brand/${Date.now()}-${banner.name.replace(
        /\s/g,
        "-"
      )}`;
      newBrandData.banner = bannerName;
      await uploadFile(banner, bannerName, banner.mimetype);
    }

    const createdBrand = await BrandModel.create(newBrandData);
    res.status(200).json({ success: true, data: createdBrand });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// GET a brand by ID
export const getBrandById = async (req, res) => {
  const { id } = req.params;

  try {
    const brand = await BrandModel.findById(id);
    if (!brand)
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    res.status(200).json({ success: true, data: brand });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT to update a brand by ID
export const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { category, subcategory, slug, isActive, featureBrand, brandName } =
    req.body;
  const logo = req.files?.logo;
  const banner = req.files?.banner;

  try {
    const brand = await BrandModel.findById(id);
    if (!brand)
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });

    const updatedData = {
      category,
      subcategory,
      slug,
      isActive: isActive === "true",
      featureBrand: featureBrand === "true",
      brandName,
    };

    // Handle new logo upload if provided
    if (logo) {
      const logoName = `${Date.now()}-${logo.name.replace(/\s/g, "-")}`;
      updatedData.logo = logoName;
      await uploadFile(logo, logoName, logo.mimetype);
    }

    // Handle new banner upload if provided
    if (banner) {
      const bannerName = `${Date.now()}-${banner.name.replace(/\s/g, "-")}`;
      updatedData.banner = bannerName;
      await uploadFile(banner, bannerName, banner.mimetype);
    }

    const updatedBrand = await BrandModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedBrand });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE a brand by ID
export const deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await BrandModel.findById(id);
    if (!brand)
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });

    // Delete files from S3
    await deleteFile(brand.logo);
    await deleteFile(brand.banner);

    await BrandModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Brand deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
