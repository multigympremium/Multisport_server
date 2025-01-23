import mongoose from "mongoose";

const ShippingAddressSchema = new mongoose.Schema(
  {
    recipientName: {
      type: String,
      required: [true, "Recipient Name is required"],
    },
    contact_number: {
      type: String,
      required: [true, "Contact Number is required"],
    },

    city_id: {
      type: String,
      required: [true, "Area id is required"],
    },
    city_name: {
      type: String,
      required: [true, "Area name is required"],
    },
    zone_id: {
      type: String,
      required: [true, "Area id is required"],
    },
    zone_name: {
      type: String,
      required: [true, "Area name is required"],
    },
    area_id: {
      type: String,
      required: [true, "Area id is required"],
    },
    area_name: {
      type: String,
      required: [true, "Area name is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    special_instruction: {
      type: String,
      // required: [true, "Special Instruction  is required"],
    },
    deliveryType: {
      type: String,
      default: 48,
    },
    email: {
      type: String,
      required: [true, "Please Add email"],
    },
    userId: {
      type: String,
      required: [true, "Please Add userId"],
    },
  },
  {
    timestamps: true,
  }
);

const ShippingAddress = mongoose.model(
  "shipping_addresses",
  ShippingAddressSchema
);

export default ShippingAddress;
