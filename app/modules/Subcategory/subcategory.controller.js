import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import SubcategoryModel from "./subcategory.model.js";


// GET Request: Get categories and child categories
export async function getCategories(req, res) {
  const { category } = req.query;
  const filter = {};

  if (category) filter.category = category;

  try {
    const categories = await SubcategoryModel.find(filter);
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// POST Request: Create a new category
export async function createCategory(req, res) {
  try {
    const formData = req.body; // Assuming you're using middleware to handle form-data

    const { category, subcategoryName, slug } = formData;

    if (!category || !subcategoryName || !slug) {
      return res.status(400).json({ success: false, message: "Category or name missing" });
    }

    const subcategoryIcon = req.files?.subcategoryIcon;
    const subcategoryImage = req.files?.subcategoryImage;

    

    const submitData = { category, subcategoryName, slug };

    if (subcategoryIcon) {
      const iconName = `${Date.now()}-${subcategoryIcon.name.replace(/\s/g, "-")}`;
      await uploadFile(subcategoryIcon, iconName, subcategoryIcon.type);
      submitData.subcategoryIcon = iconName;
    }

    if (subcategoryImage) {
      const imageName = `${Date.now()}-${subcategoryImage.name.replace(/\s/g, "-")}`;
      await uploadFile(subcategoryImage, imageName, subcategoryImage.type);
      submitData.subcategoryImage = imageName;
    }

    const subcategoryResult = await SubcategoryModel.create(submitData);

    return res.status(200).json({ success: true, data: subcategoryResult });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// GET Request: Get category by ID
export async function getCategoryById(req, res) {
  const { id } = req.params;

  try {
    const category = await SubcategoryModel.findOne({ _id: id });

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// PUT Request: Update category by ID
export async function updateCategory(req, res) {
  const { id } = req.params;
  const formData = req.body;

  const existingCategory = await SubcategoryModel.findById(id);
  if (!existingCategory) {
    return res.status(404).json({ success: false, message: "Category not found" });
  }

  const { category, subcategoryName, slug } = formData;
  if (!category || !subcategoryName || !slug) {
    return res.status(400).json({ success: false, message: "Category or name missing" });
  }

  const subcategoryIcon = req.files?.subcategoryIcon;
    const subcategoryImage = req.files?.subcategoryImage;

  const updatedData = { category, subcategoryName, slug };

  if (subcategoryIcon) {
    const iconName = `${Date.now()}-${subcategoryIcon.name.replace(/\s/g, "-")}`;
    await uploadFile(subcategoryIcon, iconName, subcategoryIcon.type);
    updatedData.subcategoryIcon = iconName;
  }

  if (subcategoryImage) {
    const imageName = `${Date.now()}-${subcategoryImage.name.replace(/\s/g, "-")}`;
    await uploadFile(subcategoryImage, imageName, subcategoryImage.type);
    updatedData.subcategoryImage = imageName;
  }

  try {
    const updatedCategory = await SubcategoryModel.findByIdAndUpdate(id, updatedData, { new: true });

    return res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// DELETE Request: Delete category by ID
export async function deleteCategory(req, res) {
  const { id } = req.params;

  try {
    const categoryItem = await SubcategoryModel.findOne({ _id: id });

    if (!categoryItem) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    if (categoryItem.subcategoryIcon) {
      await deleteFile(categoryItem.subcategoryIcon);
    }

    if (categoryItem.subcategoryImage) {
      await deleteFile(categoryItem.subcategoryImage);
    }

    const deletedCategory = await SubcategoryModel.deleteOne({ _id: id });

    return res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
