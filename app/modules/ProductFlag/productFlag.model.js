import mongoose from "mongoose";

const productFlagSchema = new mongoose.Schema(
  {
    flagName: {
      type: String,
      required: true,
    },
    flagIcon: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProductFlagModel =
  mongoose.models.product_flags ||
  mongoose.model("product_flags", productFlagSchema);

export default ProductFlagModel;
