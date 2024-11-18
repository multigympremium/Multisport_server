import FaqModel from "./faq.model.js";

// Get all Faqs
export const getAllFaqs = async (req, res) => {
  try {
    const faqData = await FaqModel.find({});
    res.status(200).json({ success: true, data: faqData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Create a new Faq
export const createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const reportData = await FaqModel.create({ question, answer });
    res.status(201).json({ success: true, data: reportData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Faq by ID
export const getFaqById = async (req, res) => {
  const { id } = req.params;
  try {
    const productColor = await FaqModel.findById(id);
    if (!productColor) {
      return res.status(404).json({ success: false, message: "Faq not found" });
    }
    res.status(200).json({ success: true, data: productColor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update Faq by ID
export const updateFaqById = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProductColor = await FaqModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProductColor) {
      return res.status(404).json({ success: false, message: "Faq not found" });
    }
    res.status(200).json({ success: true, data: updatedProductColor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete Faq by ID
export const deleteFaqById = async (req, res) => {
  const { id } = req.params;
  try {
    const productColor = await FaqModel.findById(id);
    if (!productColor) {
      return res.status(404).json({ success: false, message: "Faq not found" });
    }

    await FaqModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Faq deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
