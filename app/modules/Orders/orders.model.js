
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OrderSchema = Schema(
  {
    shipping_address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shipping_addresses",
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    color: {
        type: String,
    },
    size: {
        type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const OrderModel =
  mongoose.models.orders || mongoose.model("orders", OrderSchema);

export default OrderModel;
