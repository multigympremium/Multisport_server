import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const ShippingPolicyModel =

  mongoose.model("shipping_policies", schema);

export default ShippingPolicyModel;
