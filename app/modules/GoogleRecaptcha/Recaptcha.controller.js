import RecaptchaModel from "./Recaptcha.model.js";


// GET all Recaptcha
export const getAllRecaptcha = async (req, res) => {
  try {
    const recaptchaData = await RecaptchaModel.find({});
    res.status(200).json({ success: true, data: recaptchaData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST new Recaptcha
export const createRecaptcha = async (req, res) => {
  try {
    const { site_key, secret_key , isRecaptcha } = req.body;

    if (!site_key || !secret_key || !isRecaptcha) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const newRecaptcha = await RecaptchaModel.create(req.body);
    res.status(200).json({ success: true, data: newRecaptcha });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET Recaptcha by ID
export const getRecaptchaById = async (req, res) => {
  const { id } = req.params;
  try {
    const RecaptchaReport = await RecaptchaModel.findById(id);
    if (!RecaptchaReport) {
      return res.status(404).json({ success: false, message: "Recaptcha not found" });
    }
    res.status(200).json({ success: true, data: Recaptcha });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT update Recaptcha by ID
export const updateRecaptchaById = async (req, res) => {
  const { id } = req.params;
  

  try {
    const updatedRecaptcha = await RecaptchaModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedRecaptcha) {
      return res.status(404).json({ success: false, message: "Recaptcha not found" });
    }
    res.status(200).json({ success: true, data: updatedRecaptcha });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE Recaptcha by ID
export const deleteRecaptchaById = async (req, res) => {
  const { id } = req.params;
  try {
    const Recaptcha = await RecaptchaModel.findById(id);
    if (!Recaptcha) {
      return res.status(404).json({ success: false, message: "Recaptcha not found" });
    }

    await RecaptchaModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Recaptcha deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
