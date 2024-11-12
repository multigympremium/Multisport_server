// controllers/returnPolicyController.js

import ReturnPolicyModel from "./returnPolicy.model.js";


// Handle GET request: Get all return policies
export const getAllReturnPolicies = async (req, res) => {
  try {
    const returnPolicies = await ReturnPolicyModel.find();
    return res.status(200).json({ success: true, data: returnPolicies });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Handle POST request: Create or update a return policy
export const createOrUpdateReturnPolicy = async (req, res) => {
  try {
    const { content, id } = req.body;
    if (!content) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const existingReturnPolicy = await ReturnPolicyModel.findById(id);

    if (existingReturnPolicy) {
      // Update existing return policy
      const updatedReturnPolicy = await ReturnPolicyModel.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      );

      if (!updatedReturnPolicy) {
        return res.status(404).json({ success: false, message: "Return Policy not found" });
      }
      return res.status(200).json({ success: true, data: updatedReturnPolicy });
    }

    // Create new return policy
    const returnPolicyData = { content };
    const newReturnPolicy = await ReturnPolicyModel.create(returnPolicyData);
    return res.status(201).json({ success: true, data: newReturnPolicy });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Handle GET request: Get return policy by ID
export const getReturnPolicyById = async (req, res) => {
  const { id } = req.params;
  try {
    const returnPolicy = await ReturnPolicyModel.findById(id);

    if (!returnPolicy) {
      return res.status(404).json({ success: false, message: "Return Policy not found" });
    }

    return res.status(200).json({ success: true, data: returnPolicy });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Handle PUT request: Update return policy content
export const updateReturnPolicy = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    if (!content) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const updatedReturnPolicy = await ReturnPolicyModel.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!updatedReturnPolicy) {
      return res.status(404).json({ success: false, message: "Return Policy not found" });
    }

    return res.status(200).json({ success: true, data: updatedReturnPolicy });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Handle DELETE request: Delete return policy
export const deleteReturnPolicy = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReturnPolicy = await ReturnPolicyModel.findByIdAndDelete(id);

    if (!deletedReturnPolicy) {
      return res.status(404).json({ success: false, message: "Return Policy not found" });
    }

    return res.status(200).json({ success: true, message: "Return Policy deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
