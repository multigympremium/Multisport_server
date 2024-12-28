import PromoBannerModel from "./PromotionalBanner.model.js";

// GET: Fetch all social links
export async function getPromoBanners(req, res) {
  try {
    const PromoBanners = await PromoBannerModel.find({});
    return res.status(200).json({ success: true, data: PromoBanners });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// POST: Create a new social link
export async function createPromoBanner(req, res) {
  try {
    const requestData = req.body;
    const insertResult = await PromoBannerModel.create(requestData);

    if (insertResult) {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

// GET: Get social link by ID
export async function getPromoBannerById(req, res) {
  const { id } = req.params;
  try {
    const PromoBanner = await PromoBannerModel.findById(id);

    if (!PromoBanner) {
      return res
        .status(404)
        .json({ success: false, message: "PromoBanner not found" });
    }
    return res.status(200).json({ success: true, data: PromoBanner });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// PUT: Update social link by ID
// export async function updatePromoBanner(req, res) {
//   const { id } = req.params;
//   const requestData = req.body;

//   try {
//     const existingData = await PromoBannerModel.findById(id);
//     if (!existingData) {
//       return res
//         .status(404)
//         .json({ success: false, message: "PromoBanner not found" });
//     }

//     const updatedPromoBanner = await PromoBannerModel.findByIdAndUpdate(
//       id,
//       requestData,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedPromoBanner) {
//       return res
//         .status(404)
//         .json({ success: false, message: "PromoBanner not found" });
//     }

//     return res.status(200).json({ success: true, data: updatedPromoBanner });
//   } catch (error) {
//     return res.status(400).json({ success: false, error: error.message });
//   }
// }

// PUT: Update social link by ID
export async function updatePromoBanner(req, res) {
  const { id } = req.params;
  const requestData = req.body;

  try {
    const existingData = await PromoBannerModel.findById(id);
    if (!existingData) {
      return res
        .status(404)
        .json({ success: false, message: "PromoBanner not found" });
    } 
    
    const updatedPromoBanner = await PromoBannerModel.findByIdAndUpdate(
      id,
      requestData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPromoBanner) {
      return res
        .status(404)
        .json({ success: false, message: "PromoBanner not found" });
    }

    return res.status(200).json({ success: true, data: updatedPromoBanner });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

// DELETE: Delete social link by ID
export async function deletePromoBanner(req, res) {
  const { id } = req.params;

  try {
    const PromoBannerItem = await PromoBannerModel.findById(id);
    if (!PromoBannerItem) {
      return res
        .status(404)
        .json({ success: false, message: "PromoBanner not found" });
    }

    await PromoBannerModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "PromoBanner deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
