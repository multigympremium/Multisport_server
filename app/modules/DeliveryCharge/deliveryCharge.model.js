import mongoose from 'mongoose';

const DeliveryChargeSchema = new mongoose.Schema(
  {
    district: {
      type: String,
      required: [true, "District is required"],
    },
    subdistricts: {
      type: Array,
      required: [true, "Subdistricts is required"],
    },
    charge: {
      type: Number,
      required: [true, "Charge is required"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const DeliveryChargeModel =  mongoose.model('delivery_charges', DeliveryChargeSchema);

export default DeliveryChargeModel