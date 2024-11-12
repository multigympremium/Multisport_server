import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },

    image: {
      type: String, // Storing the URL of the uploaded image
      required: true,
    },
    key: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const ShoesBannerModel =
  mongoose.model.shoes_banners || mongoose.model("shoes_banners", BannerSchema);

export default ShoesBannerModel;
