import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OtpSchema = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    otp_expiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const OtpModel = mongoose.model("otp_documents", OtpSchema);

export default OtpModel;
