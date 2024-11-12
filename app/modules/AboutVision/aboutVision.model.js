import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Storing the URL of the uploaded image
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const AboutVisionModel =
  mongoose.model.about_visions ||
  mongoose.model("about_visions", TestimonialSchema);

export default AboutVisionModel;
