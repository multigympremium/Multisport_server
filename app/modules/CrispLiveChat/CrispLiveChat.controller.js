import CrispLiveChatModel from "./CrispLiveChat.model.js";


// GET all Crisp
export const getAllCrisp = async (req, res) => {
  try {
    const CrispData = await CrispLiveChatModel.find({});
    res.status(200).json({ success: true, data: CrispData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST new Crisp
export const createCrisp = async (req, res) => {
  try {
    const { isEnabled, code } = req.body;

    if (!isEnabled || !code ) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const newCrisp = await CrispLiveChatModel.create(req.body);
    res.status(200).json({ success: true, data: newCrisp });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET Crisp by ID
export const getCrispById = async (req, res) => {
  const { id } = req.params;
  try {
    const CrispReport = await CrispLiveChatModel.findById(id);
    if (!CrispReport) {
      return res.status(404).json({ success: false, message: "Crisp not found" });
    }
    res.status(200).json({ success: true, data: Crisp });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT update Crisp by ID
export const updateCrispById = async (req, res) => {
  const { id } = req.params;
  

  try {
    const updatedCrisp = await CrispLiveChatModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCrisp) {
      return res.status(404).json({ success: false, message: "Crisp not found" });
    }
    res.status(200).json({ success: true, data: updatedCrisp });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE Crisp by ID
export const deleteCrispById = async (req, res) => {
  const { id } = req.params;
  try {
    const Crisp = await CrispLiveChatModel.findById(id);
    if (!Crisp) {
      return res.status(404).json({ success: false, message: "Crisp not found" });
    }

    await CrispLiveChatModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Crisp deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
