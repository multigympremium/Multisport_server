import MessengerModel from "./Messenger.model.js";


// GET all Messenger
export const getAllMessenger = async (req, res) => {
  try {
    const MessengerData = await MessengerModel.find({});
    res.status(200).json({ success: true, data: MessengerData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST new Messenger
export const createMessenger = async (req, res) => {
  try {
    const { pageId, appId , isEnabled } = req.body;

    if (!pageId || !appId || !isEnabled) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const newMessenger = await MessengerModel.create(req.body);
    res.status(200).json({ success: true, data: newMessenger });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET Messenger by ID
export const getMessengerById = async (req, res) => {
  const { id } = req.params;
  try {
    const MessengerReport = await MessengerModel.findById(id);
    if (!MessengerReport) {
      return res.status(404).json({ success: false, message: "Messenger not found" });
    }
    res.status(200).json({ success: true, data: Messenger });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT update Messenger by ID
export const updateMessengerById = async (req, res) => {
  const { id } = req.params;
  

  try {
    const updatedMessenger = await MessengerModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMessenger) {
      return res.status(404).json({ success: false, message: "Messenger not found" });
    }
    res.status(200).json({ success: true, data: updatedMessenger });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE Messenger by ID
export const deleteMessengerById = async (req, res) => {
  const { id } = req.params;
  try {
    const Messenger = await MessengerModel.findById(id);
    if (!Messenger) {
      return res.status(404).json({ success: false, message: "Messenger not found" });
    }

    await MessengerModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Messenger deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
