import mongoose from "mongoose";

const schema = new mongoose.Schema({
  baseUrl: {
    type: String,
    required: [true, "baseUrl is required"],
    trim: true, // Removes extra spaces at the start and end
  },
  clientId: {
    type: String,
    required: [true, "Client Id is required"],
    trim: true, // Removes extra spaces at the start and end
  },
  storeId: {
    type: String,
    required: [true, "Store Id is required"],
    trim: true,
  },
  clientSecret: {
    type: String,
    required: [true, "Client Secret is required"],
    trim: true,
  },
  clientEmail: {
    type: String,
    required: [true, "Client Email is required"],
    trim: true,
    validate: {
      validator: function (email) {
        // Basic email validation regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: "Please enter a valid email address",
    },
  },
  clientPassword: {
    type: String,
    required: [true, "Client Password is required"],
    trim: true,
  },
});

const PathaoModel = mongoose.model("pathao", schema);

export default PathaoModel;
