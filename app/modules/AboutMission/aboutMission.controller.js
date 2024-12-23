import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import AboutMissionModel from "./aboutMission.model.js";

export async function getAboutMission(req, res) {
  const { search } = req.query;
  console.log(search);

  const filter = {};
  if (search) {
    filter.$or = [
      { title: { $regex: new RegExp(search, "i") } },
      { subtitle: { $regex: new RegExp(search, "i") } },
    ];
  }

  try {
    const banners = await AboutMissionModel.find(filter);
    return res.status(200).json({ success: true, data: banners });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// POST handler
export async function postAboutMission(req, res) {
  try {
    const formData = req.body;

    const title = formData.title;
    const description = formData.description;
    const image = req.files?.image;

    console.log(title, description);

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    let thumbnailUrl = "";
    if (image && image.size > 0) {
      thumbnailUrl = `other-image/about-mission/${Date.now()}-${image.name.replace(
        /\s/g,
        "-"
      )}`;
      const thumbnailResult = await uploadFile(image, thumbnailUrl, image.type);
    }

    const insertData = {
      title,
      description,
      image: thumbnailUrl,
    };

    const insertResult = await AboutMissionModel.create(insertData);

    return res.status(200).json({ success: true, data: insertResult });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

// GET: Get product by ID
export async function getAboutMissionById(req, res) {
  const { id } = req.params;
  try {
    const result = await AboutMissionModel.findById(id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// PUT: Update product by ID
export async function updateAboutMission(req, res) {
  const { id } = req.params;

  try {
    const existingVision = await AboutMissionModel.findById(id);

    if (!existingVision) {
      return res
        .status(400)
        .json({ success: false, message: "Item not found" });
    }

    const formData = req.body;
    const { title, description } = formData;

    const visionData = {};

    if (title) visionData.title = title;
    if (description) visionData.description = description;

    const image = req.files?.image;

    let thumbnailUrl = "";
    if (image && image.size > 0 && image !== existingVision.image) {
      thumbnailUrl = `other-image/about-mission/${Date.now()}-${image.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(image, thumbnailUrl, image.type);
    }

    if (thumbnailUrl) visionData.image = thumbnailUrl;

    const updatedBanner = await AboutMissionModel.findByIdAndUpdate(
      id,
      visionData,
      { new: true }
    );

    if (!updatedBanner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    return res.status(200).json({ success: true, data: updatedBanner });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

// DELETE: Delete product by ID
export async function deleteAboutMission(req, res) {
  const { id } = req.params;

  try {
    const existingVision = await AboutMissionModel.findById(id);

    if (!existingVision) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    await deleteFile(existingVision.image);

    await AboutMissionModel.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Banner deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
