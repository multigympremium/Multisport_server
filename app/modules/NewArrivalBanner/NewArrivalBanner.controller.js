import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import NewArrivalBannerModel from "./NewArrivalBanner.model.js";

// Function to handle GET request (get NewArrivalBanner with optional search)
export const getNewArrivalBanners = async (req, res) => {
  const search = req.query.search;

  const filter = {};
  if (search) {
    filter.$or = [
      { title: { $regex: new RegExp(search, "i") } },
      { subtitle: { $regex: new RegExp(search, "i") } },
    ];
  }

  try {
    const banners = await NewArrivalBannerModel.find(filter);
    return res.status(200).json({ success: true, data: banners });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Function to handle POST request (create new NewArrivalBanner)
export const createNewArrivalBanner = async (req, res) => {
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

    const bannerResult = await NewArrivalBannerModel.create(bannerData);
    return res.status(200).json({ success: true, data: bannerResult });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Get NewArrivalBanner by ID
export const getNewArrivalBannerById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await NewArrivalBannerModel.findById(id);
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

// Update NewArrivalBanner by ID
export const updateNewArrivalBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const existingBanner = await NewArrivalBannerModel.findById(id);
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

    const updatedBanner = await NewArrivalBannerModel.findByIdAndUpdate(
      id,
      bannerData,
      { new: true }
    );
    return res.status(200).json({ success: true, data: updatedBanner });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Delete NewArrivalBanner by ID
export const deleteNewArrivalBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const existingBanner = await NewArrivalBannerModel.findById(id);
    if (!existingBanner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    await NewArrivalBannerModel.findByIdAndDelete(id);
    await deleteFile(existingBanner.image);

    return res.status(200).json({ success: true, message: "Banner deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
