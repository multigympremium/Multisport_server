import DiscountModel from "./Discount.model.js";

// GET: Fetch all social links
export async function getDiscounts(req, res) {
  try {
    const Discounts = await DiscountModel.find({});
    return res.status(200).json({ success: true, data: Discounts });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// POST: Create a new social link
export async function createDiscount(req, res) {
  try {
    const requestData = req.body;
    const insertResult = await DiscountModel.create(requestData);

    if (insertResult) {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

// GET: Get social link by ID
export async function getDiscountById(req, res) {
  const { id } = req.params;
  try {
    const Discount = await DiscountModel.findById(id);

    if (!Discount) {
      return res
        .status(404)
        .json({ success: false, message: "Discount not found" });
    }
    return res.status(200).json({ success: true, data: Discount });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// PUT: Update social link by ID
export async function updateDiscount(req, res) {
  const { id } = req.params;
  const requestData = req.body;

  try {
    const existingData = await DiscountModel.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, message: "Discount not found" });
    }

    const updatedDiscount = await DiscountModel.findByIdAndUpdate(
      id,
      requestData,
      {
        new: true,
      }
    );

    if (!updatedDiscount) {
      return res
        .status(404)
        .json({ success: false, message: "Discount not found" });
    }

    return res.status(200).json({ success: true, data: updatedDiscount });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// DELETE: Delete social link by ID
export async function deleteDiscount(req, res) {
  const { id } = req.params;

  try {
    const DiscountItem = await DiscountModel.findById(id);
    if (!DiscountItem) {
      return res
        .status(404)
        .json({ success: false, message: "Discount not found" });
    }

    await DiscountModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Discount deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
