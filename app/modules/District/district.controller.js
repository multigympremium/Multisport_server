
import DistrictModel from "./district.model.js";
// Create a new district
export const createDistrict = async (req, res) => {
  try {
    const { district, subdistricts } = req.body;

    if (!district || !subdistricts) {
      return res.status(400).json({ message: "District and Subdistricts are required" });
    }

    const newDistrict = new DistrictModel({ district, subdistricts });
    await newDistrict.save();

    res.status(201).json(newDistrict);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all districts
export const getAllDistricts = async (req, res) => {
  try {
    const districts = await DistrictModel.find();
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single district by ID
export const getDistrictById = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await DistrictModel.findById(id);

    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }

    res.status(200).json(district);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a district by ID
export const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedDistrict = await DistrictModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedDistrict) {
      return res.status(404).json({ message: "District not found" });
    }

    res.status(200).json(updatedDistrict);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a district by ID
export const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDistrict = await DistrictModel.findByIdAndDelete(id);

    if (!deletedDistrict) {
      return res.status(404).json({ message: "District not found" });
    }

    res.status(200).json({ message: "District deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
