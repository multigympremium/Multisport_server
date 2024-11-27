import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      // required: true,
    },
    subcategory: {
      type: String,
      // required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    featureBrand: {
      type: Boolean,
      default: false,
    },
    logo: {
      type: String,
      // required: true,
    },
    banner: {
      type: String,
      // required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BrandModel =
  mongoose.model.brands || mongoose.model("brands", BrandSchema);

export default BrandModel;
