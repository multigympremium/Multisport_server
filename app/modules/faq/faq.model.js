import mongoose from "mongoose";

const productColorSchema = new mongoose.Schema(
  {
    answer: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FaqModel =
  mongoose.model("faqs", productColorSchema);

export default FaqModel;
