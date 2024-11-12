import mongoose from "mongoose";

const productSizeSchema = new mongoose.Schema(
  {
    sizeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductSizeModel =

  mongoose.model("product_sizes", productSizeSchema);

export default ProductSizeModel;
