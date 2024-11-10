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

const TermsConditionModel =
  mongoose.models.terms_conditions ||
  mongoose.model("terms_conditions", schema);

export default TermsConditionModel;
