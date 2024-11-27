import GoogleAnalyticModel from "./GoogleAnalytic.model.js";


// GET all GoogleAnalytic
export const getAllGoogleAnalytic = async (req, res) => {
  try {
    const GoogleAnalyticData = await GoogleAnalyticModel.find({});
    res.status(200).json({ success: true, data: GoogleAnalyticData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST new GoogleAnalytic
export const createGoogleAnalytic = async (req, res) => {
  try {
    const { isEnabled, trackingID } = req.body;

    if (!isEnabled || !trackingID ) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const newGoogleAnalytic = await GoogleAnalyticModel.create(req.body);
    res.status(200).json({ success: true, data: newGoogleAnalytic });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET GoogleAnalytic by ID
export const getGoogleAnalyticById = async (req, res) => {
  const { id } = req.params;
  try {
    const GoogleAnalyticReport = await GoogleAnalyticModel.findById(id);
    if (!GoogleAnalyticReport) {
      return res.status(404).json({ success: false, message: "GoogleAnalytic not found" });
    }
    res.status(200).json({ success: true, data: GoogleAnalytic });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT update GoogleAnalytic by ID
export const updateGoogleAnalyticById = async (req, res) => {
  const { id } = req.params;
  

  try {
    const updatedGoogleAnalytic = await GoogleAnalyticModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedGoogleAnalytic) {
      return res.status(404).json({ success: false, message: "GoogleAnalytic not found" });
    }
    res.status(200).json({ success: true, data: updatedGoogleAnalytic });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE GoogleAnalytic by ID
export const deleteGoogleAnalyticById = async (req, res) => {
  const { id } = req.params;
  try {
    const GoogleAnalytic = await GoogleAnalyticModel.findById(id);
    if (!GoogleAnalytic) {
      return res.status(404).json({ success: false, message: "GoogleAnalytic not found" });
    }

    await GoogleAnalyticModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "GoogleAnalytic deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
