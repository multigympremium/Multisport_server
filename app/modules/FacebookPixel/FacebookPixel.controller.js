import FacebookPixelModel from "./FacebookPixel.model.js";


// GET all FacebookPixel
export const getAllFacebookPixel = async (req, res) => {
  try {
    const FacebookPixelData = await FacebookPixelModel.find({});
    res.status(200).json({ success: true, data: FacebookPixelData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST new FacebookPixel
export const createFacebookPixel = async (req, res) => {
  try {
    const { isEnabled, pixelId } = req.body;

    if (!isEnabled || !pixelId ) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const newFacebookPixel = await FacebookPixelModel.create(req.body);
    res.status(200).json({ success: true, data: newFacebookPixel });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET FacebookPixel by ID
export const getFacebookPixelById = async (req, res) => {
  const { id } = req.params;
  try {
    const FacebookPixelReport = await FacebookPixelModel.findById(id);
    if (!FacebookPixelReport) {
      return res.status(404).json({ success: false, message: "FacebookPixel not found" });
    }
    res.status(200).json({ success: true, data: FacebookPixel });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT update FacebookPixel by ID
export const updateFacebookPixelById = async (req, res) => {
  const { id } = req.params;
  

  try {
    const updatedFacebookPixel = await FacebookPixelModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedFacebookPixel) {
      return res.status(404).json({ success: false, message: "FacebookPixel not found" });
    }
    res.status(200).json({ success: true, data: updatedFacebookPixel });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE FacebookPixel by ID
export const deleteFacebookPixelById = async (req, res) => {
  const { id } = req.params;
  try {
    const FacebookPixel = await FacebookPixelModel.findById(id);
    if (!FacebookPixel) {
      return res.status(404).json({ success: false, message: "FacebookPixel not found" });
    }

    await FacebookPixelModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "FacebookPixel deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
