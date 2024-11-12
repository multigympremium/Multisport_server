import PrivacyPolicyModel from "./privacyPolicy.model.js";

// GET all privacy policies
export const getAllPrivacyPolicies = async (req, res) => {
  try {
    const policies = await PrivacyPolicyModel.find();
    res.status(200).json({ success: true, data: policies });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// GET privacy policy by ID
export const getPrivacyPolicyById = async (req, res) => {
  try {
    const policy = await PrivacyPolicyModel.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({ success: false, message: "Policy not found" });
    }
    res.status(200).json({ success: true, data: policy });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST create or update privacy policy
export const createOrUpdatePrivacyPolicy = async (req, res) => {
  const { content, id } = req.body;
  if (!content) {
    return res.status(400).json({ success: false, message: "Required fields missing" });
  }

  try {
    let policy;
    if (id) {
      policy = await PrivacyPolicyModel.findByIdAndUpdate(id, { content }, { new: true });
    } else {
      policy = await PrivacyPolicyModel.create({ content });
    }

    res.status(200).json({ success: true, data: policy });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT update privacy policy by ID
export const updatePrivacyPolicyById = async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ success: false, message: "Required fields missing" });
  }

  try {
    const updatedPolicy = await PrivacyPolicyModel.findByIdAndUpdate(req.params.id, { content }, { new: true });
    if (!updatedPolicy) {
      return res.status(404).json({ success: false, message: "Policy not found" });
    }

    res.status(200).json({ success: true, data: updatedPolicy });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE privacy policy by ID
export const deletePrivacyPolicyById = async (req, res) => {
  try {
    const deletedPolicy = await PrivacyPolicyModel.findByIdAndDelete(req.params.id);
    if (!deletedPolicy) {
      return res.status(404).json({ success: false, message: "Policy not found" });
    }

    res.status(200).json({ success: true, message: "Policy deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
