import SocialLoginConfig from "./SocialLogin.model.js";

// GET: Fetch all social Logins
export async function getSocialLogins(req, res) {
  try {
    const socialLogins = await SocialLoginConfig.find({});
    return res.status(200).json({ success: true, data: socialLogins });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

// POST: Create a new social Login
export async function createSocialLogin(req, res) {
  try {
    const requestData = req.body;

    // Validate required fields (if needed, add further checks)
    if (!requestData.providers ) {
      return res.status(400).json({
        success: false,
        message: "Name and URL are required fields.",
      });
    }

    const newSocialLogin = await SocialLoginConfig.create(requestData);
    return res.status(201).json({ success: true, data: newSocialLogin });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

// GET: Get a social Login by ID
export async function getSocialLoginById(req, res) {
  const { id } = req.params;
  try {
    const socialLogin = await SocialLoginConfig.findById(id);

    if (!socialLogin) {
      return res
        .status(404)
        .json({ success: false, message: "Social Login not found" });
    }
    return res.status(200).json({ success: true, data: socialLogin });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// PUT: Update a social Login by ID
export async function updateSocialLogin(req, res) {
  const { id } = req.params;
  const requestData = req.body;

  try {
    const existingSocialLogin = await SocialLoginConfig.findById(id);
    if (!existingSocialLogin) {
      return res
        .status(404)
        .json({ success: false, message: "Social Login not found" });
    }

    const updatedSocialLogin = await SocialLoginConfig.findByIdAndUpdate(
      id,
      requestData,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({ success: true, data: updatedSocialLogin });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// DELETE: Delete a social Login by ID
export async function deleteSocialLogin(req, res) {
  const { id } = req.params;

  try {
    const existingSocialLogin = await SocialLoginConfig.findById(id);
    if (!existingSocialLogin) {
      return res
        .status(404)
        .json({ success: false, message: "Social Login not found" });
    }

    await SocialLoginConfig.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Social Login deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
