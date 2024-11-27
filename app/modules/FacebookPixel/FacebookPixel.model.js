import mongoose from "mongoose";

const FacebookPixelSchema = new mongoose.Schema(
  {
    isEnabled: {
      type: boolean,
      required: true,
    },
    pixelId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FacebookPixelModel =

  mongoose.model("facebook_pixel", FacebookPixelSchema);

export default FacebookPixelModel;