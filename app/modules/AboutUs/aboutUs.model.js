import mongoose from "mongoose";

const customSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sideImage: {
      type: String, // Storing the URL of the uploaded image
      required: true,
    },
    bannerImage: {
      type: String, // Storing the URL of the uploaded image
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const AboutUsModel = mongoose.model("about_us", customSchema);

export default AboutUsModel;
