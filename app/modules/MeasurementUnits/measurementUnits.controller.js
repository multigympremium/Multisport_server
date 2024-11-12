import MeasurementUnitsModel from "./measurementUnits.model.js";

// GET all measurement units
export const getAllUnits = async (req, res) => {
  try {
    const units = await MeasurementUnitsModel.find({});
    res.status(200).json({ success: true, data: units });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// GET unit by ID
export const getUnitById = async (req, res) => {
  const { id } = req.params;
  try {
    const unit = await MeasurementUnitsModel.findById(id);
    if (!unit) {
      return res.status(404).json({ success: false, message: 'Unit not found' });
    }
    res.status(200).json({ success: true, data: unit });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST create a new unit
export const createUnit = async (req, res) => {
  try {
    const { unitName } = req.body;
    if (!unitName) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const newUnit = await MeasurementUnitsModel.create({ unitName });
    res.status(201).json({ success: true, data: newUnit });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT update unit by ID
export const updateUnitById = async (req, res) => {
  const { id } = req.params;
  const { unitName } = req.body;

  try {
    const updatedUnit = await MeasurementUnitsModel.findByIdAndUpdate(
      id,
      { unitName },
      { new: true, runValidators: true }
    );

    if (!updatedUnit) {
      return res.status(404).json({ success: false, message: 'Unit not found' });
    }
    res.status(200).json({ success: true, data: updatedUnit });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE unit by ID
export const deleteUnitById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUnit = await MeasurementUnitsModel.findByIdAndDelete(id);

    if (!deletedUnit) {
      return res.status(404).json({ success: false, message: 'Unit not found' });
    }
    res.status(200).json({ success: true, message: 'Unit deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
