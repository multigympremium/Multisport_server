import ProductSizeModel from "./productSize.model.js";


// GET all sizes
export const getAllSizes = async (req, res) => {
  try {
    const sizes = await ProductSizeModel.find({});
    res.status(200).json({ success: true, data: sizes });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST new size
export const createSize = async (req, res) => {
  try {
    const { sizeName } = req.body;

    if (!sizeName) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const newSize = await ProductSizeModel.create({ sizeName });
    res.status(200).json({ success: true, data: newSize });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET size by ID
export const getSizeById = async (req, res) => {
  const { id } = req.params;
  try {
    const size = await ProductSizeModel.findById(id);
    if (!size) {
      return res.status(404).json({ success: false, message: "Size not found" });
    }
    res.status(200).json({ success: true, data: size });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT update size by ID
export const updateSizeById = async (req, res) => {
  const { id } = req.params;
  const { sizeName } = req.body;

  try {
    const updatedSize = await ProductSizeModel.findByIdAndUpdate(id, { sizeName }, { new: true });
    if (!updatedSize) {
      return res.status(404).json({ success: false, message: "Size not found" });
    }
    res.status(200).json({ success: true, data: updatedSize });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE size by ID
export const deleteSizeById = async (req, res) => {
  const { id } = req.params;
  try {
    const size = await ProductSizeModel.findById(id);
    if (!size) {
      return res.status(404).json({ success: false, message: "Size not found" });
    }

    await ProductSizeModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Size deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
