import mongoose from "mongoose";

const zonesSchema = new mongoose.Schema(
  {
    city_id: {
      type: String,
      required: [true, "zones is required"],
    },
    zone_id: {
      type: String,
      required: [true, "zones is required"],
    },
    zone_name: {
      type: Array,
      required: [true, "zones is required"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const ZonesModel = mongoose.model("zones", zonesSchema);

export default ZonesModel;
