import ModelOfBrandModel from "./ModelOfBrand.model.js";

// GET: Fetch all social links
export async function getModelOfBrands(req, res) {
  try {
    const configData = await ModelOfBrandModel.find({});
    return res.status(200).json({ success: true, data: configData });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// POST: Create a new social link
export async function createModelOfBrand(req, res) {
  try {
    const { brand, modelName, code } = req.body;

    if (!brand || !modelName || !code) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const insertResult = await ModelOfBrandModel.create(req.body);

    if (insertResult) {
      return res.status(200).json({ success: true, insertResult });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

// GET: Get social link by ID
export async function getModelOfBrandById(req, res) {
  const { id } = req.params;
  try {
    const ModelOfBrand = await ModelOfBrandModel.findById(id);

    if (!ModelOfBrand) {
      return res
        .status(404)
        .json({ success: false, message: "Setup Config not found" });
    }
    return res.status(200).json({ success: true, data: ModelOfBrand });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// PUT: Update social link by ID
export async function updateModelOfBrand(req, res) {
  const { id } = req.params;
  const requestData = req.body;

  try {
    const existingData = await ModelOfBrandModel.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, message: "Setup Config not found" });
    }

    const updatedModelOfBrand = await ModelOfBrandModel.findByIdAndUpdate(
      id,
      requestData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedModelOfBrand) {
      return res
        .status(404)
        .json({ success: false, message: "Setup Config not found" });
    }

    return res.status(200).json({ success: true, data: updatedModelOfBrand });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// DELETE: Delete social link by ID
export async function deleteModelOfBrand(req, res) {
  const { id } = req.params;

  try {
    const ModelOfBrandItem = await ModelOfBrandModel.findById(id);
    if (!ModelOfBrandItem) {
      return res
        .status(404)
        .json({ success: false, message: "Setup Config not found" });
    }

    await ModelOfBrandModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "setup Config deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
