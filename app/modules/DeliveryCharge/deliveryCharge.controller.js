import DeliveryChargeModel from "./deliveryCharge.model.js";

// Create a new district
export const createDeliveryCharge = async (req, res) => {
  try {
    const { district, district_id, charge } = req.body;

    if (!district || !district_id || !charge) {
      return res.status(400).json({
        message: "District , Subdistricts and Charge are required fields",
      });
    }

    const newDistrict = new DeliveryChargeModel({
      district,
      district_id,
      charge,
    });
    await newDistrict.save();

    res.status(201).json(newDistrict);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all districts
export const getAllDeliveryCharge = async (req, res) => {
  try {
    const districts = await DeliveryChargeModel.find();
    res.status(200).json(districts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single district by ID
export const getDeliveryChargeById = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await DeliveryChargeModel.findById(id);

    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }

    res.status(200).json(district);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDeliveryChargeByDistrictId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id district");
    const district = await DeliveryChargeModel.findOne({
      district_id: Number(id),
    });

    if (!district) {
      return res.status(404).json({ message: "District not found" });
    }

    res.status(200).json(district);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a district by ID
export const updateDeliveryCharge = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedDistrict = await DeliveryChargeModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedDistrict) {
      return res.status(403).json({ message: "District not found" });
    }

    res.status(200).json(updatedDistrict);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a district by ID
export const deleteDeliveryCharge = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDistrict = await DeliveryChargeModel.findByIdAndDelete(id);

    if (!deletedDistrict) {
      return res.status(404).json({ message: "District not found" });
    }

    res.status(200).json({ message: "District deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
