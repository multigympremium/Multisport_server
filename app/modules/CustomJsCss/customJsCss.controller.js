import CustomCssAndJsModel from "./customJsCss.model.js";


// Get all records
export const getAllInfo = async (req, res) => {
  try {
    const brands = await CustomCssAndJsModel.find({});
    res.status(200).json({ success: true, data: brands });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get a single record by ID
export const getInfoById = async (req, res) => {
  const { id } = req.params;
  try {
    const info = await CustomCssAndJsModel.findById(id);
    if (!info) {
      return res.status(404).json({ success: false, message: "Info not found" });
    }
    res.status(200).json({ success: true, data: info });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Create a new record
export const createInfo = async (req, res) => {
  try {
    const { css, headerJs, footerJs } = req.body;
    const newInfo = new CustomCssAndJsModel({ css, headerJs, footerJs });
    const savedInfo = await newInfo.save();
    res.status(201).json({ success: true, data: savedInfo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a record by ID
export const updateInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedInfo = await CustomCssAndJsModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedInfo) {
      return res.status(404).json({ success: false, message: "Info not found" });
    }
    res.status(200).json({ success: true, data: updatedInfo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a record by ID
export const deleteInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const info = await CustomCssAndJsModel.findById(id);
    if (!info) {
      return res.status(404).json({ success: false, message: "Info not found" });
    }
    await CustomCssAndJsModel.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "Info deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
