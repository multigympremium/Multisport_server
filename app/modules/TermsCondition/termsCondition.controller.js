import TermsConditionModel from "./termsCondition.model.js";

// GET request - Get all Terms and Conditions
export async function getTermsConditions(req, res) {
  try {
    const termsConditions = await TermsConditionModel.find();
    return res.status(200).json({ success: true, data: termsConditions });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// POST request - Create or Update Terms and Conditions
export async function postTermsCondition(req, res) {
  try {
    const { content, id } = req.body;
    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const newTermsCondition = await TermsConditionModel.create({ content });
    return res.status(201).json({ success: true, data: newTermsCondition });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

// GET request - Get Terms and Conditions by ID
export async function getTermsConditionById(req, res) {
  const { id } = req.params;
  try {
    const termsCondition = await TermsConditionModel.findById(id);
    if (!termsCondition) {
      return res
        .status(404)
        .json({ success: false, message: "Terms and Conditions not found" });
    }
    return res.status(200).json({ success: true, data: termsCondition });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// PUT request - Update Terms and Conditions by ID
export async function putTermsCondition(req, res) {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: "Required fields missing" });
  }

  try {
    const updatedTermsCondition = await TermsConditionModel.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    if (!updatedTermsCondition) {
      return res
        .status(404)
        .json({ success: false, message: "Terms and Conditions not found" });
    }
    return res.status(200).json({ success: true, data: updatedTermsCondition });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

// DELETE request - Delete Terms and Conditions by ID
export async function deleteTermsCondition(req, res) {
  const { id } = req.params;

  try {
    const deletedTermsCondition = await TermsConditionModel.findByIdAndDelete(
      id
    );
    if (!deletedTermsCondition) {
      return res
        .status(404)
        .json({ success: false, message: "Terms and Conditions not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Terms and Conditions deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
