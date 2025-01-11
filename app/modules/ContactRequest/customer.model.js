import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Not Served", "Served"],
      default: "Not Served",
    },
    time: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const CustomerModel =
  mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

export default CustomerModel;