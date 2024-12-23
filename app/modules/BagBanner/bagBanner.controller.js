import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import BagBannerModel from "./bagBanner.model.js";

// Function to handle GET request (get BagBanner with optional search)
export const getBagBanners = async (req, res) => {
  const search = req.query.search;

  const filter = {};
  if (search) {
    filter.$or = [
      { title: { $regex: new RegExp(search, "i") } },
      { subtitle: { $regex: new RegExp(search, "i") } },
    ];
  }

  try {
    const banners = await BagBannerModel.find(filter);
    return res.status(200).json({ success: true, data: banners });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Function to handle POST request (create new BagBanner)
export const createBagBanner = async (req, res) => {
  try {
    const { title, subtitle, shortDescription } = req.body;
    const image = req.files?.image; // assuming `multer` is used for file uploads

    if (!title || !subtitle || !shortDescription) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    let thumbnailUrl = "";
    if (image && image.size > 0) {
      thumbnailUrl = `banner/${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      await uploadFile(image, thumbnailUrl, image.type);
    }

    const bannerData = {
      title,
      subtitle,
      shortDescription,
      image: thumbnailUrl,
    };

    const bannerResult = await BagBannerModel.create(bannerData);
    return res.status(200).json({ success: true, data: bannerResult });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get BagBanner by ID
export const getBagBannerById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await BagBannerModel.findById(id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Update BagBanner by ID
export const updateBagBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const existingBanner = await BagBannerModel.findById(id);
    if (!existingBanner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    const { title, subtitle, shortDescription } = req.body;
    const image = req.files?.image; // Assuming `multer` is used for file upload

    const bannerData = {};
    if (title) bannerData.title = title;
    if (subtitle) bannerData.subtitle = subtitle;
    if (shortDescription) bannerData.shortDescription = shortDescription;

    if (image && image.size > 0 && image.filename !== existingBanner.image) {
      const thumbnailUrl = `banner/${Date.now()}-${image.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(image, thumbnailUrl, image.type);
      bannerData.image = thumbnailUrl;
    }

    const updatedBanner = await BagBannerModel.findByIdAndUpdate(
      id,
      bannerData,
      { new: true }
    );
    return res.status(200).json({ success: true, data: updatedBanner });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Delete BagBanner by ID
export const deleteBagBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const existingBanner = await BagBannerModel.findById(id);
    if (!existingBanner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    await BagBannerModel.findByIdAndDelete(id);
    await deleteFile(existingBanner.image);

    return res.status(200).json({ success: true, message: "Banner deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
