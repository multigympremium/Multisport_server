import mongoose from "mongoose";

const schema = new mongoose.Schema({
  baseUrl: {
    type: String,
    required: [true, "baseUrl is required"],
    trim: true, // Removes extra spaces at the start and end
  },
  apiKey: {
    type: String,
    required: [true, "apiKey is required"],
    trim: true, // Removes extra spaces at the start and end
  },
  secretKey: {
    type: String,
    required: [true, "secretKey is required"],
    trim: true,
  },
});

const SteadFastModel = mongoose.model("stead_fast", schema);

export default SteadFastModel;
