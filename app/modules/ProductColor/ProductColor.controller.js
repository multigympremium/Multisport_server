// controllers/productColorController.js

import ProductColorModel from "./ProductColor.model.js";


// Get all product colors
export const getAllProductColors = async (req, res) => {
  try {
    const brands = await ProductColorModel.find({});
    res.status(200).json({ success: true, data: brands });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Create a new product color
export const createProductColor = async (req, res) => {
  try {
    const { productColor, productColorName } = req.body;

    if (!productColor || !productColorName) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const newProductColor = await ProductColorModel.create({ productColor, productColorName });
    res.status(201).json({ success: true, data: newProductColor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get product color by ID
export const getProductColorById = async (req, res) => {
  const { id } = req.params;
  try {
    const productColor = await ProductColorModel.findById(id);
    if (!productColor) {
      return res.status(404).json({ success: false, message: "Product color not found" });
    }
    res.status(200).json({ success: true, data: productColor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update product color by ID
export const updateProductColorById = async (req, res) => {
  const { id } = req.params;
  const { productColor, productColorName } = req.body;

  if (!productColor || !productColorName) {
    return res.status(400).json({ success: false, message: "Required fields missing" });
  }

  try {
    const updatedProductColor = await ProductColorModel.findByIdAndUpdate(id, { productColor, productColorName }, { new: true });
    if (!updatedProductColor) {
      return res.status(404).json({ success: false, message: "Product color not found" });
    }
    res.status(200).json({ success: true, data: updatedProductColor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete product color by ID
export const deleteProductColorById = async (req, res) => {
  const { id } = req.params;
  try {
    const productColor = await ProductColorModel.findById(id);
    if (!productColor) {
      return res.status(404).json({ success: false, message: "Product color not found" });
    }

    await ProductColorModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product color deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
