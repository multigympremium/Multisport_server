import ShippingPolicyModel from "./shippingPolicy.model.js";


// Function to get all shipping policies
export const getAllShippingPolicies = async (req, res) => {
  try {
    const shippingPolicies = await ShippingPolicyModel.find();
    return res.status(200).json({ success: true, data: shippingPolicies });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Function to get a shipping policy by ID
export const getShippingPolicyById = async (req, res) => {
  const { id } = req.params;
  try {
    const shippingPolicy = await ShippingPolicyModel.findById(id);

    if (!shippingPolicy) {
      return res.status(404).json({ success: false, message: "Shipping Policy not found" });
    }

    return res.status(200).json({ success: true, data: shippingPolicy });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// Function to create or update a shipping policy
export const createOrUpdateShippingPolicy = async (req, res) => {
  try {
    const { content, id } = req.body;
    if (!content) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    if (id) {
      // If id exists, update the existing shipping policy
      const updatedShippingPolicy = await ShippingPolicyModel.findByIdAndUpdate(id, { content }, { new: true });
      if (!updatedShippingPolicy) {
        return res.status(404).json({ success: false, message: "Shipping Policy not found" });
      }
      return res.status(200).json({ success: true, data: updatedShippingPolicy });
    }

    // Create a new shipping policy
    const newShippingPolicy = await ShippingPolicyModel.create({ content });
    return res.status(201).json({ success: true, data: newShippingPolicy });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Function to update an existing shipping policy
export const updateShippingPolicy = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    if (!content) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const updatedShippingPolicy = await ShippingPolicyModel.findByIdAndUpdate(id, { content }, { new: true });

    if (!updatedShippingPolicy) {
      return res.status(404).json({ success: false, message: "Shipping Policy not found" });
    }

    return res.status(200).json({ success: true, data: updatedShippingPolicy });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Function to delete a shipping policy by ID
export const deleteShippingPolicy = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedShippingPolicy = await ShippingPolicyModel.findByIdAndDelete(id);

    if (!deletedShippingPolicy) {
      return res.status(404).json({ success: false, message: "Shipping Policy not found" });
    }

    return res.status(200).json({ success: true, message: "Shipping Policy deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
