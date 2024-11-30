import mongoose from "mongoose";

const setupConfigSchema = new mongoose.Schema(
  {
    productSize: {
      type: Boolean,
      default: false,
      required: true,
    },
    modelOfBrand: {
      type: Boolean,
      default: false,
      required: true,
    },
    productColor: {
      type: Boolean,
      default: false,
      required: true,
    },
    measurementUnit: {
      type: Boolean,
      default: false,
      required: true,
    },
    seoInformation: {
      type: Boolean,
      default: false,
      required: true,
    },
    rewardPoints: {
      type: Boolean,
      default: false,
    },
    productFlags: {
      type: Boolean,
      default: false,
    },
    productCode: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const SetupConfigModel = mongoose.model("setup_config", setupConfigSchema);

export default SetupConfigModel;
