import TawkLiveChatModel from "./TawkLiveChat.model.js";


// GET all Tawk
export const getAllTawk = async (req, res) => {
  try {
    const TawkData = await TawkLiveChatModel.find({});
    res.status(200).json({ success: true, data: TawkData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST new Tawk
export const createTawk = async (req, res) => {
  try {
    const { isEnabled, code } = req.body;

    if (!isEnabled || !code ) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const newTawk = await TawkLiveChatModel.create(req.body);
    res.status(200).json({ success: true, data: newTawk });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET Tawk by ID
export const getTawkById = async (req, res) => {
  const { id } = req.params;
  try {
    const TawkReport = await TawkLiveChatModel.findById(id);
    if (!TawkReport) {
      return res.status(404).json({ success: false, message: "Tawk not found" });
    }
    res.status(200).json({ success: true, data: Tawk });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT update Tawk by ID
export const updateTawkById = async (req, res) => {
  const { id } = req.params;
  

  try {
    const updatedTawk = await TawkLiveChatModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTawk) {
      return res.status(404).json({ success: false, message: "Tawk not found" });
    }
    res.status(200).json({ success: true, data: updatedTawk });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE Tawk by ID
export const deleteTawkById = async (req, res) => {
  const { id } = req.params;
  try {
    const Tawk = await TawkLiveChatModel.findById(id);
    if (!Tawk) {
      return res.status(404).json({ success: false, message: "Tawk not found" });
    }

    await TawkLiveChatModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Tawk deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
