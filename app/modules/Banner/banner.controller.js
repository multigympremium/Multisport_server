import { deleteFile, uploadFile } from "../../helpers/aws-s3";
import BannerModel from "./banner.model";

// Get Banners (GET Request)
export const getBanners = async (req, res) => {
  const search = req.query.search || '';
  const filter = search
    ? {
        $or: [
          { title: { $regex: new RegExp(search, 'i') } },
          { subtitle: { $regex: new RegExp(search, 'i') } },
        ],
      }
    : {};

  try {
    const banners = await BannerModel.find(filter);
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Create Banner (POST Request)
export const createBanner = async (req, res) => {
  try {
    const { title, subtitle, shortDescription } = req.body;
    const image = req.file; // Assuming `multer` is used for file upload

    if (!title || !subtitle || !shortDescription) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    let thumbnailUrl = '';
    if (image && image.size > 0) {
      thumbnailUrl = `${Date.now()}-${image.originalname.replace(/\s/g, '-')}`;
      await uploadFile(image, thumbnailUrl, image.mimetype);
    }

    const bannerData = {
      title,
      subtitle,
      shortDescription,
      image: thumbnailUrl,
    };

    const bannerResult = await BannerModel.create(bannerData);
    res.status(200).json({ success: true, data: bannerResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


import BannerModel from '../models/BannerModel';
import { deleteFile, uploadFile } from '../helpers/aws-s3';

// GET Banner by ID
export const getBannerById = async (req, res) => {
const { id } = req.params;
  try {
    const result = await BannerModel.findById(id);
    if (!result) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update Banner (PUT Request)
export const updateBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const existingBanner = await BannerModel.findById(id);
    if (!existingBanner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    const { title, subtitle, shortDescription } = req.body;
    const image = req.file; // Assuming `multer` is used for file handling
    const bannerData = {};

    if (title) bannerData.title = title;
    if (subtitle) bannerData.subtitle = subtitle;
    if (shortDescription) bannerData.shortDescription = shortDescription;

    if (image && image.size > 0 && image.originalname !== existingBanner.image) {
      const thumbnailUrl = `${Date.now()}-${image.originalname.replace(/\s/g, "-")}`;
      await uploadFile(image, thumbnailUrl, image.mimetype);
      bannerData.image = thumbnailUrl;
    }

    const updatedBanner = await BannerModel.findByIdAndUpdate(id, bannerData, { new: true });
    if (!updatedBanner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }
    res.status(200).json({ success: true, data: updatedBanner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Banner (DELETE Request)
export const deleteBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const existingBanner = await BannerModel.findById(id);
    if (!existingBanner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    await BannerModel.findByIdAndDelete(id);
    await deleteFile(existingBanner.image);
    res.status(200).json({ success: true, message: "Banner deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
