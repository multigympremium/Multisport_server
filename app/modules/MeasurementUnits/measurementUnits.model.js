import mongoose from "mongoose";

const productSizeSchema = new mongoose.Schema(
  {
    unitName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MeasurementUnitsModel = 
  mongoose.model("measurement_units", productSizeSchema);

export default MeasurementUnitsModel;
