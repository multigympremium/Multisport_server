import SocialLinkModel from "./socialLink.model.js";



// GET: Fetch all social links
export async function getSocialLinks(req, res) {
  try {
    const brands = await SocialLinkModel.find({});
    return res.status(200).json({ success: true, data: brands });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// POST: Create a new social link
export async function createSocialLink(req, res) {
  try {
    const requestData = req.body;
    const insertResult = await SocialLinkModel.create(requestData);

    if (insertResult) {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

// GET: Get social link by ID
export async function getSocialLinkById(req, res) {
  const { id } = req.params;
  try {
    const brand = await SocialLinkModel.findById(id);

    if (!brand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }
    return res.status(200).json({ success: true, data: brand });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// PUT: Update social link by ID
export async function updateSocialLink(req, res) {
  const { id } = req.params;
  const requestData = req.body;

  try {
    const existingData = await SocialLinkModel.findById(id);
    if (!existingData) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    const updatedBrand = await SocialLinkModel.findByIdAndUpdate(id, requestData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBrand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    return res.status(200).json({ success: true, data: updatedBrand });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// DELETE: Delete social link by ID
export async function deleteSocialLink(req, res) {
  const { id } = req.params;

  try {
    const brandItem = await SocialLinkModel.findById(id);
    if (!brandItem) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    await SocialLinkModel.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Brand deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
