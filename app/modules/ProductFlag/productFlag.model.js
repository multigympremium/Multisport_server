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

  mongoose.model("product_flags", productFlagSchema);

export default ProductFlagModel;
