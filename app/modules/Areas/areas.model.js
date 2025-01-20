import mongoose from "mongoose";

const AreasSchema = new mongoose.Schema(
  {
    zone_id: {
      type: String,
      required: [true, "Areas is required"],
    },
    area_name: {
      type: String,
      required: [true, "Areas is required"],
    },
    area_id: {
      type: String,
      required: [true, "Areas is required"],
    },
    home_delivery_available: {
      type: Boolean,
      required: [true, "home delivery available is required"],
    },
    pickup_available: {
      type: Boolean,
      required: [true, "pickup available is required"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const AreaModel = mongoose.model("Areas", AreasSchema);

export default AreaModel;
