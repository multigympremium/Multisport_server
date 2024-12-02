import SetupConfigModel from "./SetupConfig.model.js";

// GET: Fetch all social links
export async function getSetupConfigs(req, res) {
  try {
    const configData = await SetupConfigModel.find({});
    return res.status(200).json({ success: true, data: configData });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// POST: Create a new social link
export async function createSetupConfig(req, res) {
  try {
    const insertResult = await SetupConfigModel.create(req.body);

    if (insertResult) {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

// GET: Get social link by ID
export async function getSetupConfigById(req, res) {
  const { id } = req.params;
  try {
    const setupConfig = await SetupConfigModel.findById(id);

    if (!setupConfig) {
      return res
        .status(404)
        .json({ success: false, message: "Setup Config not found" });
    }
    return res.status(200).json({ success: true, data: setupConfig });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// PUT: Update social link by ID
export async function updateSetupConfig(req, res) {
  const { id } = req.params;
  const requestData = req.body;

  try {
    const existingData = await SetupConfigModel.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, message: "Setup Config not found" });
    }

    const updatedSetupConfig = await SetupConfigModel.findByIdAndUpdate(
      id,
      requestData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSetupConfig) {
      return res
        .status(404)
        .json({ success: false, message: "Setup Config not found" });
    }

    return res.status(200).json({ success: true, data: updatedSetupConfig });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// DELETE: Delete social link by ID
export async function deleteSetupConfig(req, res) {
  const { id } = req.params;

  try {
    const setupConfigItem = await SetupConfigModel.findById(id);
    if (!setupConfigItem) {
      return res
        .status(404)
        .json({ success: false, message: "Setup Config not found" });
    }

    await SetupConfigModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "setup Config deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
