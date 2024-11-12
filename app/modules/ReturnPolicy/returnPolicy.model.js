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

const ReturnPolicyModel =
 mongoose.model("return_policies", schema);

export default ReturnPolicyModel;
