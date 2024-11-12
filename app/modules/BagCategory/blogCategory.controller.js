
import BlogCategoryModel from "./blogCategory.model.js";

// GET all categories
export const getAllCategories = async (req, res) => {
  try {
    const data = await BlogCategoryModel.find({});
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// GET a single category by ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await BlogCategoryModel.findById(id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Data not found' });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST: Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const newCategory = new BlogCategoryModel({ name });
    const savedCategory = await newCategory.save();

    res.status(200).json({ success: true, data: savedCategory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT: Update a category by ID
export const updateCategoryById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }

  try {
    const updatedCategory = await BlogCategoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'Data not found' });
    }
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE: Delete a category by ID
export const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await BlogCategoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Data not found' });
    }

    await BlogCategoryModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Data deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
