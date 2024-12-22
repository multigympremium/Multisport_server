import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import ChildCategoryModel from "./childCategory.model.js";

// GET all child categories with optional filters
export const getChildCategories = async (req, res) => {
  const { category, subcategory } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (subcategory) filter.subcategory = subcategory;

  try {
    const result = await ChildCategoryModel.find(filter);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// GET single child category by ID
export const getChildCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await ChildCategoryModel.findById(id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST: Create a new child category
export const createChildCategory = async (req, res) => {
  try {
    const { category, subcategory, childCategoryName, slug } = req.body;
    const childCategoryIcon = req.files?.image; // Assuming file is passed as `childCategoryIcon`

    if (!category || !childCategoryName || !slug || !subcategory) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const submitData = { category, subcategory, childCategoryName, slug };

    if (childCategoryIcon) {
      const iconName = `childCategoryIon/${Date.now()}-${childCategoryIcon.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(childCategoryIcon, iconName, childCategoryIcon.type);
      submitData.childCategoryIcon = iconName;
    }

    const result = await ChildCategoryModel.create(submitData);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT: Update an existing child category by ID
export const updateChildCategory = async (req, res) => {
  const { id } = req.params;
  const { category, subcategory, childCategoryName, slug } = req.body;
  const childCategoryIcon = req.files?.image;

  try {
    const categoryData = await ChildCategoryModel.findById(id);
    if (!categoryData)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    const updatedData = { category, subcategory, childCategoryName, slug };

    if (childCategoryIcon) {
      const iconName = `childCategoryIon/${Date.now()}-${childCategoryIcon.name.replace(
        /\s/g,
        "-"
      )}`;
      await uploadFile(childCategoryIcon, iconName, childCategoryIcon.type);
      updatedData.childCategoryIcon = iconName;
    }

    const updatedCategory = await ChildCategoryModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE: Remove a child category by ID
export const deleteChildCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const categoryData = await ChildCategoryModel.findById(id);
    if (!categoryData)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    const deleteIconResult = await deleteFile(categoryData.childCategoryIcon);
    const deleteCategoryResult = await ChildCategoryModel.findByIdAndDelete(id);

    console.log(deleteIconResult, "deleteIconResult");
    console.log(deleteCategoryResult, "deleteCategoryResult");
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
