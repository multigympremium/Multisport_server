import mongoose from "mongoose";

const recaptchaSchema = new mongoose.Schema(
  {
    site_key: {
      type: String,
      required: true,
    },
    secret_key: {
      type: String,
      required: true,
    },
    isRecaptcha: {
      type: Boolean,
      required: true,
    }
  },
  { timestamps: true }
);

const RecaptchaModel =

  mongoose.model("google_recaptcha", recaptchaSchema);

export default RecaptchaModel;
