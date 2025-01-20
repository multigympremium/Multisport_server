import ZonesModel from "./zones.model.js";

// Create a new Zone
export const createZone = async (req, res) => {
  try {
    const { city_id, zone_id, zone_name } = req.body;

    if (!city_id || !zone_id || !zone_name) {
      return res
        .status(400)
        .json({ message: "Zone and SubZones are required" });
    }

    const newZone = new ZonesModel({ city_id, zone_id, zone_name });
    await newZone.save();

    res.status(201).json(newZone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMultipleZones = async (req, res) => {
  try {
    const { items, city_id } = req.body;

    if (!city_id || !items) {
      return res
        .status(400)
        .json({ message: "Zone and SubZones are required" });
    }
    const isExist = await ZonesModel.findOne({ city_id });
    if (isExist) {
      return res.status(400).json({ message: "Zone already exist" });
    }
    const submitData = items.map((item) => ({
      city_id,
      zone_id: item.zone_id,
      zone_name: item.zone_name,
    }));

    const newZone = await ZonesModel.insertMany(submitData);

    res.status(201).json(newZone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Zones
export const getAllZones = async (req, res) => {
  try {
    const Zones = await ZonesModel.find({});
    res.status(200).json(Zones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Zones
export const getAllZonesCityId = async (req, res) => {
  const city_id = req.params.id;
  try {
    const Zones = await ZonesModel.find({ city_id });
    res.status(200).json(Zones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Zone by ID
export const getZoneById = async (req, res) => {
  try {
    const { id } = req.params;
    const Zone = await ZonesModel.findById(id);

    if (!Zone) {
      return res.status(404).json({ message: "Zone not found" });
    }

    res.status(200).json(Zone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Zone by ID
export const updateZone = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedZone = await ZonesModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedZone) {
      return res.status(404).json({ message: "Zone not found" });
    }

    res.status(200).json(updatedZone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Zone by ID
export const deleteZone = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedZone = await ZonesModel.findByIdAndDelete(id);

    if (!deletedZone) {
      return res.status(404).json({ message: "Zone not found" });
    }

    res.status(200).json({ message: "Zone deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
