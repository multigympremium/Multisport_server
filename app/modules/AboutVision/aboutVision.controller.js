import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import AboutVisionModel from "./aboutVision.model.js";

// Function to handle GET request (with search functionality)
export const getAboutVision = async (req, res) => {
  const { search } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: new RegExp(search, "i") } },
      { subtitle: { $regex: new RegExp(search, "i") } },
    ];
  }

  try {
    const banners = await AboutVisionModel.find(filter);
    return res.status(200).json({ success: true, data: banners });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Function to handle POST request (to create a new AboutVision item)
export const createAboutVision = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const image = req.files?.image;

    let thumbnailUrl = "";
    if (image && image.size > 0) {
      thumbnailUrl = `other-image/about-vision/${Date.now()}-${image.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(image, thumbnailUrl, image.type);
    }

    const insertData = { title, description, image: thumbnailUrl };
    const insertResult = await AboutVisionModel.create(insertData);

    return res.status(200).json({ success: true, data: insertResult });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Function to handle GET request (get AboutVision by ID)
export const getAboutVisionById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await AboutVisionModel.findById(id);

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

// Function to handle PUT request (update AboutVision by ID)
export const updateAboutVision = async (req, res) => {
  const { id } = req.params;

  try {
    const existingVision = await AboutVisionModel.findById(id);

    if (!existingVision) {
      return res
        .status(400)
        .json({ success: false, message: "Item not found" });
    }

    const formData = req.body; // assuming you are sending data in the request body
    const { title, description } = formData;

    const visionData = {};

    if (title) visionData.title = title;
    if (description) visionData.description = description;

    const image = req.files?.image;

    let thumbnailUrl = "";
    if (image && image.size > 0 && image !== existingVision.image) {
      thumbnailUrl = `other-image/about-vision/${Date.now()}-${image.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(image, thumbnailUrl, image.type);
    }

    if (thumbnailUrl) visionData.image = thumbnailUrl;

    const updatedBanner = await AboutVisionModel.findByIdAndUpdate(
      id,
      visionData,
      {
        new: true,
      }
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
};

// Function to handle DELETE request (delete AboutVision by ID)
export const deleteAboutVision = async (req, res) => {
  const { id } = req.params;

  try {
    const existingVision = await AboutVisionModel.findById(id);

    if (!existingVision) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }

    await deleteFile(existingVision.image);

    await AboutVisionModel.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Banner deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
