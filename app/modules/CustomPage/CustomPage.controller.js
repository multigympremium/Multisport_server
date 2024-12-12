import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import CustomPageModel from "./CustomPage.model.js";

// Get all records
export const getAllCustomPage = async (req, res) => {
  const slug = req.query.slug;
  try {
    if (slug) {
      const customPage = await CustomPageModel.findOne({ slug: slug });
      if (!customPage) {
        return res
          .status(404)
          .json({ success: false, message: "CustomPage not found" });
      }
      return res.status(200).json({ success: true, data: customPage });
    }
    const brands = await CustomPageModel.find({});
    res.status(200).json({ success: true, data: brands });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get a single record by ID
export const getCustomPageById = async (req, res) => {
  const { id } = req.params;
  try {
    const CustomPage = await CustomPageModel.findById(id);
    if (!CustomPage) {
      return res
        .status(404)
        .json({ success: false, message: "CustomPage not found" });
    }
    res.status(200).json({ success: true, data: CustomPage });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Create a new record
export const createCustomPage = async (req, res) => {
  try {
    const { title, content, slug } = req.body;

    const image = req.files?.image;

    if (!title || !content || !slug) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    let thumbnailUrl = "";
    if (image && image.size > 0) {
      thumbnailUrl = `${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      const thumbnailResult = await uploadFile(image, thumbnailUrl, image.type);
    }

    const insertData = {
      title,
      content,
      slug,
      image: thumbnailUrl,
    };

    const newCustomPage = new CustomPageModel(insertData);
    const savedCustomPage = await newCustomPage.save();
    res.status(201).json({ success: true, data: savedCustomPage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a record by ID
export const updateCustomPage = async (req, res) => {
  const { id } = req.params;

  try {
    const existingVision = await CustomPageModel.findById(id);

    if (!existingVision) {
      return res
        .status(400)
        .json({ success: false, message: "Item not found" });
    }

    const formData = req.body;
    const { title, content, slug } = formData;

    const visionData = {};

    if (title) visionData.title = title;
    if (content) visionData.content = content;
    if (slug) visionData.slug = slug;

    const image = req.files?.image;

    let thumbnailUrl = "";
    if (image && image.size > 0 && image !== existingVision.image) {
      thumbnailUrl = `${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      await uploadFile(image, thumbnailUrl, image.type);
    }

    if (thumbnailUrl) visionData.image = thumbnailUrl;

    const updatedCustomPage = await CustomPageModel.findByIdAndUpdate(
      id,
      visionData,
      { new: true }
    );

    if (!updatedCustomPage) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    return res.status(200).json({ success: true, data: updatedCustomPage });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a record by ID
export const deleteCustomPage = async (req, res) => {
  const { id } = req.params;

  try {
    const existingVision = await CustomPageModel.findById(id);

    if (!existingVision) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    await deleteFile(existingVision.image);

    await CustomPageModel.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
