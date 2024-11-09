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

const PrivacyPolicyModel =
  mongoose.models.privacy_policies ||
  mongoose.model("privacy_policies", schema);

export default PrivacyPolicyModel;
