import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import ShoesBannerModel from "./shoesBanner.model.js";

// Handle GET request to fetch banners with optional search
export async function getBanners(req, res) {
  const { search } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: new RegExp(search, "i") } },
      { subtitle: { $regex: new RegExp(search, "i") } },
    ];
  }

  try {
    const banners = await ShoesBannerModel.find(filter);
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

// Handle POST request to create a new banner
export async function createBanner(req, res) {
  try {
    const formData = req.body;
    const { title, subtitle, shortDescription } = formData;

    if (!title || !subtitle || !shortDescription) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const image = req?.files?.image;

    let thumbnailUrl = "";
    if (image && image.size > 0) {
      thumbnailUrl = `${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      await uploadFile(image, thumbnailUrl, image.type);
    }

    const bannerData = {
      title,
      subtitle,
      shortDescription,
      image: thumbnailUrl,
    };
    const bannerResult = await ShoesBannerModel.create(bannerData);

    res.status(200).json({ success: true, data: bannerResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Handle GET request to fetch a banner by ID
export async function getBannerById(req, res) {
  const { id } = req.params;
  try {
    const result = await ShoesBannerModel.findById(id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

// Handle PUT request to update a banner
export async function updateBanner(req, res) {
  const { id } = req.params;
  try {
    const existingBanner = await ShoesBannerModel.findById(id);
    if (!existingBanner) {
      return res
        .status(400)
        .json({ success: false, message: "Item not found" });
    }

    const formData = req.body;
    const { title, subtitle, shortDescription } = formData;
    const bannerData = {};

    if (title) bannerData.title = title;
    if (subtitle) bannerData.subtitle = subtitle;
    if (shortDescription) bannerData.shortDescription = shortDescription;

    const image = req?.files?.image;

    let thumbnailUrl = "";
    if (image && image.size > 0 && image !== existingBanner.image) {
      thumbnailUrl = `${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      await uploadFile(image, thumbnailUrl, image.type);
    }

    if (thumbnailUrl) bannerData.image = thumbnailUrl;

    const updatedBanner = await ShoesBannerModel.findByIdAndUpdate(
      id,
      bannerData,
      { new: true }
    );

    if (!updatedBanner) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    res.status(200).json({ success: true, data: updatedBanner });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Handle DELETE request to delete a banner
export async function deleteBanner(req, res) {
  const { id } = req.params;
  try {
    const existingBanner = await ShoesBannerModel.findById(id);

    if (!existingBanner) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    await ShoesBannerModel.findByIdAndDelete(id);
    await deleteFile(existingBanner.image);

    res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
