import ShippingAddress from "./shippingAddress.model.js";

// GET Request: Get all shipping addresses
export const getAllShippingAddresses = async (req, res) => {
  try {
    const shippingAddresses = await ShippingAddress.find();
    return res.status(200).json({ success: true, data: shippingAddresses });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// POST Request: Create a new shipping address
export const createShippingAddress = async (req, res) => {
  try {
    const {
      recipientName,
      contact_number,
      city_id,
      area_id,
      address,
      postCode,
      deliveryType,
      zone_id,
      userId,
    } = req.body;

    // Check required fields
    if (
      !recipientName ||
      !contact_number ||
      !city_id ||
      !area_id ||
      !zone_id ||
      !userId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    // Create a new shipping address
    const newAddress = await ShippingAddress.create(req.body);

    return res.status(201).json({ success: true, data: newAddress });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// GET Request: Get shipping address by ID
export const getShippingAddressById = async (req, res) => {
  const { id } = req.params;
  try {
    const shippingAddress = await ShippingAddress.findById(id);

    if (!shippingAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    return res.status(200).json({ success: true, data: shippingAddress });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// GET Request: Get shipping address by ID
export const getShippingAddressByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const shippingAddress = await ShippingAddress.find({ userId: id });

    return res.status(200).json({ success: true, data: shippingAddress });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

// PUT Request: Update shipping address by ID
export const updateShippingAddressById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAddress = await ShippingAddress.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    return res.status(200).json({ success: true, data: updatedAddress });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE Request: Delete shipping address by ID
export const deleteShippingAddressById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAddress = await ShippingAddress.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
