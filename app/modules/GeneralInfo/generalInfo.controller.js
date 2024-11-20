import GeneralInfoModel from "./generalInfo.model.js";

// GET all brands
export const getAllBrands = async (req, res) => {
  try {
    const brands = await GeneralInfoModel.find({});
    res.status(200).json({ success: true, data: brands });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// GET brand by ID
export const getBrandById = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await GeneralInfoModel.findById(id);
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.status(200).json({ success: true, data: brand });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST create a new brand
export const createBrand = async (req, res) => {
  try {
    const { company_name, phone, email, description, address, google_map_link, play_store_link, app_store_link, trade_license, tin_no, bin_no, footer_copyright } = req.body;

    console.log(req.body, "general info")

    if (!company_name || !phone || !email || !description || !address || !trade_license || !tin_no || !bin_no || !footer_copyright) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const newBrand = await GeneralInfoModel.create(req.body);
    res.status(201).json({ success: true, data: newBrand });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT update a brand by ID
export const updateBrandById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBrand = await GeneralInfoModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBrand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.status(200).json({ success: true, data: updatedBrand });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE delete a brand by ID
export const deleteBrandById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBrand = await GeneralInfoModel.findByIdAndDelete(id);
    if (!deletedBrand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.status(200).json({ success: true, message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
