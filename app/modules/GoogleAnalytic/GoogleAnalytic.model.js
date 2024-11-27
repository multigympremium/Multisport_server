import mongoose from "mongoose";

const GoogleAnalyticSchema = new mongoose.Schema(
  {
    isEnabled: {
      type: Boolean,
      required: true,
    },
    trackingID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const GoogleAnalyticModel =

  mongoose.model("google_analytic", GoogleAnalyticSchema);

export default GoogleAnalyticModel;
