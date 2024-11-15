import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import WebsiteSEO_Model from "./websiteSEO.model.js";


// GET all Website SEO data with search functionality
export const getWebsiteSEO = async (req, res) => {
  const { search } = req.query;
  const filter = {};
  if (search) {
    filter.$or = [
      { title: { $regex: new RegExp(search, "i") } },
      { subtitle: { $regex: new RegExp(search, "i") } },
    ];
  }

  try {
    const banners = await WebsiteSEO_Model.find(filter);
    return res.status(200).json({ success: true, data: banners });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// POST request: Create new Website SEO data
export const createWebsiteSEO = async (req, res) => {
  try {
    const { metaTitle, metaDescription, metaKeywords, metaOgTitle, metaOgDescription } = req.body;
    const image = req.files?.metaOgImage;

    if (!metaTitle || !metaDescription || !metaKeywords || !metaOgTitle || !metaOgDescription) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    let thumbnailUrl = "";
    if (image) {
      thumbnailUrl = `${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      await uploadFile(image, thumbnailUrl, image.type);
    }

    const insertData = {
      metaTitle,
      metaDescription,
      metaKeywords,
      metaOgTitle,
      metaOgDescription,
      metaOgImage: thumbnailUrl,
    };

    const insertResult = await WebsiteSEO_Model.create(insertData);

    return res.status(200).json({ success: true, data: insertResult });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET single Website SEO data by ID
export const getWebsiteSEOById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await WebsiteSEO_Model.findById(id);

    if (!result) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// PUT request: Update Website SEO data by ID
export const updateWebsiteSEO = async (req, res) => {
  const { id } = req.params;

  try {
    const { metaTitle, metaDescription, metaKeywords, metaOgTitle, metaOgDescription } = req.body;
    const image = req.files?.metaOgImage;

    const existingData = await WebsiteSEO_Model.findById(id);

    if (!existingData) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    let thumbnailUrl = "";
    if (image && image.name !== existingData.image) {
      thumbnailUrl = `${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      await uploadFile(image, thumbnailUrl, image.type);
    }

    const updateData = {};
    if (metaTitle) updateData.metaTitle = metaTitle;
    if (metaDescription) updateData.metaDescription = metaDescription;
    if (metaKeywords) updateData.metaKeywords = metaKeywords;
    if (metaOgTitle) updateData.metaOgTitle = metaOgTitle;
    if (metaOgDescription) updateData.metaOgDescription = metaOgDescription;
    if (image) updateData.metaOgImage = thumbnailUrl;

    const updatedData = await WebsiteSEO_Model.findByIdAndUpdate(id, updateData, { new: true });

    return res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE Website SEO data by ID
export const deleteWebsiteSEO = async (req, res) => {
  const { id } = req.params;

  try {
    const existingData = await WebsiteSEO_Model.findById(id);

    if (!existingData) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    await WebsiteSEO_Model.findByIdAndDelete(id);
    await deleteFile(existingData.metaOgImage);

    return res.status(200).json({ success: true, message: "Banner deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
