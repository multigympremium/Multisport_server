import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const CustomPageModel = mongoose.model("custom-page", TestimonialSchema);

export default CustomPageModel;
