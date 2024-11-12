import mongoose from "mongoose";

const productColorSchema = new mongoose.Schema(
  {
    productColorName: {
      type: String,
      required: true,
    },
    productColor: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductColorModel =
  mongoose.model("product_colors", productColorSchema);

export default ProductColorModel;
