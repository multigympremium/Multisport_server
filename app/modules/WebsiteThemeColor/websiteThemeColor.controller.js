import WebsiteThemeColorModel from "./websiteThemeColor.model.js";

// Handle GET request for all themes
export async function getAllThemes(req, res) {
  try {
    const brands = await WebsiteThemeColorModel.find({});
    return res.status(200).json({ success: true, data: brands });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// Handle POST request to create a theme
export async function createTheme(req, res) {
  try {
    const { primaryColor, secondaryColor, tertiaryColor, titleColor, paragraphColor, borderColor } = req.body;

    if (!primaryColor || !secondaryColor || !tertiaryColor || !titleColor || !paragraphColor || !borderColor) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const submitData = { primaryColor, secondaryColor, tertiaryColor, titleColor, paragraphColor, borderColor };

    const insertResult = await WebsiteThemeColorModel.create(submitData);

    if (insertResult) {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

// Handle GET request for a theme by ID
export async function getThemeById(req, res) {
  const { id } = req.params;
  try {
    const brand = await WebsiteThemeColorModel.findOne({ _id: id });

    if (!brand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }
    return res.status(200).json({ success: true, data: brand });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// Handle PUT request to update a theme by ID
export async function updateTheme(req, res) {
  const { id } = req.params;
  const requestData = req.body;

  try {
    const existingData = await WebsiteThemeColorModel.findById(id);
    if (!existingData) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    const updatedBrand = await WebsiteThemeColorModel.findByIdAndUpdate(id, requestData, { new: true, runValidators: true });

    if (!updatedBrand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    return res.status(200).json({ success: true, data: updatedBrand });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// Handle DELETE request to delete a theme by ID
export async function deleteTheme(req, res) {
  const { id } = req.params;
  try {
    const brandItem = await WebsiteThemeColorModel.findOne({ _id: id });

    if (!brandItem) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    const deletedBrand = await WebsiteThemeColorModel.deleteOne({ _id: id });

    if (!deletedBrand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    return res.status(200).json({ success: true, message: "Brand deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
