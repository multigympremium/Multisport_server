import AreaModel from "./areas.model.js";

// Create a new Area
export const createArea = async (req, res) => {
  try {
    const { zone_id, area_id, area_name } = req.body;

    if (!zone_id || !area_id || !area_name) {
      return res
        .status(400)
        .json({ message: "Area and SubAreas are required" });
    }

    const newArea = new AreaModel({ zone_id, area_id, area_name });
    await newArea.save();

    res.status(201).json(newArea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMultipleAreas = async (req, res) => {
  try {
    const { zone_id, items } = req.body;

    if (!zone_id || !items) {
      return res
        .status(400)
        .json({ message: "Area and SubAreas are required" });
    }
    const isExist = await AreaModel.findOne({ zone_id });
    console.log(isExist, "isExist");
    if (isExist) {
      return res.status(400).json({ message: "Area already exist" });
    }
    const submitData = items.map((item) => ({
      zone_id,
      area_id: item.area_id,
      area_name: item.area_name,
      home_delivery_available: item.home_delivery_available,
      pickup_available: item.pickup_available,
    }));

    const newArea = await AreaModel.insertMany(submitData);

    res.status(201).json(newArea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Areas
export const getAllAreas = async (req, res) => {
  try {
    const Areas = await AreaModel.find({});
    res.status(200).json(Areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all Areas
export const getAllAreasByZoneId = async (req, res) => {
  const zone_id = req.params.id;
  try {
    const Areas = await AreaModel.find({ zone_id });
    res.status(200).json(Areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Area by ID
export const getAreaById = async (req, res) => {
  try {
    const { id } = req.params;
    const Area = await AreaModel.findById(id);

    if (!Area) {
      return res.status(404).json({ message: "Area not found" });
    }

    res.status(200).json(Area);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Area by ID
export const updateArea = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedArea = await AreaModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedArea) {
      return res.status(404).json({ message: "Area not found" });
    }

    res.status(200).json(updatedArea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Area by ID
export const deleteArea = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedArea = await AreaModel.findByIdAndDelete(id);

    if (!deletedArea) {
      return res.status(404).json({ message: "Area not found" });
    }

    res.status(200).json({ message: "Area deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
