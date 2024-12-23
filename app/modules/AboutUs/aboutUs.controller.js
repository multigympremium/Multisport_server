import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import AboutUsModel from "./aboutUs.model.js";

// Handle GET request
export async function getAboutUs(req, res) {
  const { search } = req.query;

  const filter = {};
  if (search) {
    filter.$or = [
      { title: { $regex: new RegExp(search, "i") } },
      { subtitle: { $regex: new RegExp(search, "i") } },
    ];
  }

  try {
    const banners = await AboutUsModel.find(filter);
    return res.status(200).json({ success: true, data: banners });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// Handle POST request
export async function createAboutUs(req, res) {
  try {
    const { title, description } = req.body;
    const sideImage = req.files?.sideImage;
    const bannerImage = req.files?.bannerImage;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    let sideImageUrl = "";
    if (sideImage && sideImage.size > 0) {
      sideImageUrl = `other-image/about-us/${Date.now()}-${sideImage.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(sideImage, sideImageUrl, sideImage.type);
    }

    let bannerImageUrl = "";
    if (bannerImage && bannerImage.size > 0) {
      bannerImageUrl = `other-image/about-us/${Date.now()}-${bannerImage.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(bannerImage, bannerImageUrl, bannerImage.type);
    }

    const insertData = {
      title,
      description,
      sideImage: sideImageUrl,
      bannerImage: bannerImageUrl,
    };

    const insertResult = await AboutUsModel.create(insertData);

    return res.status(200).json({ success: true, data: insertResult });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

// GET request to fetch the AboutMission by ID
export const getAboutUsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await AboutUsModel.findById(id);

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

// PUT request to update the AboutMission by ID
export const updateAboutUs = async (req, res) => {
  const { id } = req.params;
  console.log(id, "id");
  try {
    const existingVision = await AboutUsModel.findById(id);

    if (!existingVision) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    const { title, description } = req.body;

    let aboutData = {};

    if (title) aboutData.title = title;
    if (description) aboutData.description = description;

    const sideImage = req.files?.sideImage;
    const bannerImage = req.files?.bannerImage;

    let sideImageUrl = "";
    if (sideImage && sideImage.size > 0) {
      sideImageUrl = `other-image/about-us/${Date.now()}-${sideImage.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(sideImage, sideImageUrl, sideImage.type);
    }

    let bannerImageUrl = "";
    if (bannerImage && bannerImage.size > 0) {
      bannerImageUrl = `other-image/about-us/${Date.now()}-${bannerImage.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(bannerImage, bannerImageUrl, bannerImage.type);
    }

    if (sideImageUrl) aboutData.sideImage = sideImageUrl;
    if (bannerImageUrl) aboutData.bannerImage = bannerImageUrl;

    const updatedBanner = await AboutUsModel.findByIdAndUpdate(id, aboutData, {
      new: true,
    });

    if (!updatedBanner) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    return res.status(200).json({ success: true, data: updatedBanner });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE request to delete the AboutMission by ID
export const deleteAboutUs = async (req, res) => {
  const { id } = req.params;

  try {
    const existingVision = await AboutUsModel.findById(id);

    if (!existingVision) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    await deleteFile(existingVision.sideImage);
    await deleteFile(existingVision.bannerImage);

    await AboutUsModel.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Banner deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
