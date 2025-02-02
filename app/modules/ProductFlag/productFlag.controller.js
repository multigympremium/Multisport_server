import { deleteFile, uploadFile } from "../../helpers/aws-s3.js";
import ProductFlagModel from "./productFlag.model.js";

// GET all flags
export const getAllFlags = async (req, res) => {
  try {
    const flags = await ProductFlagModel.find({});
    res.status(200).json({ success: true, data: flags });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST a new flag
export const createFlag = async (req, res) => {
  try {
    const formData = req.body; // Use req.body with multer for file upload if needed

    const { flagName } = formData;
    const flagIcon = req.files?.flagIcon; // assuming `req.file` for file upload

    if (!flagName) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const submitData = { flagName };

    if (flagIcon) {
      const iconName = `flag/${Date.now()}-${flagIcon.name.replace(
        /\s/g,
        "-"
      )}`;

      const logoResult = await uploadFile(flagIcon, iconName, flagIcon.type);
      submitData.flagIcon = iconName;
    }

    const flagResult = await ProductFlagModel.create(submitData);
    res.status(200).json({ success: true, data: flagResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET a flag by ID
export const getFlagById = async (req, res) => {
  const { id } = req.params;
  try {
    const flag = await ProductFlagModel.findById(id);
    if (!flag) {
      return res
        .status(404)
        .json({ success: false, message: "Flag not found" });
    }
    res.status(200).json({ success: true, data: flag });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT (update) a flag by ID
export const updateFlag = async (req, res) => {
  const { id } = req.params;
  const formData = req.body;
  const flagIcon = req.files?.flagIcon;

  try {
    const existingFlag = await ProductFlagModel.findById(id);
    if (!existingFlag) {
      return res
        .status(404)
        .json({ success: false, message: "Flag not found" });
    }

    const { flagName } = formData;
    if (!flagName) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const submitData = { flagName };

    if (flagIcon) {
      const iconName = `flag/${Date.now()}-${flagIcon.name.replace(
        /\s/g,
        "-"
      )}`;
      await deleteFile(existingFlag.flagIcon); // delete old icon if exists
      await uploadFile(flagIcon, iconName, flagIcon.type);
      submitData.flagIcon = iconName;
    }

    const updatedFlag = await ProductFlagModel.findByIdAndUpdate(
      id,
      submitData,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updatedFlag });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE a flag by ID
export const deleteFlag = async (req, res) => {
  const { id } = req.params;
  try {
    const flag = await ProductFlagModel.findById(id);
    if (!flag) {
      return res
        .status(404)
        .json({ success: false, message: "Flag not found" });
    }

    await deleteFile(flag.flagIcon); // delete the icon from S3
    await ProductFlagModel.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Flag deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
