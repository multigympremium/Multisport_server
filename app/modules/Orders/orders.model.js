import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OrderSchema = Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    secondary_phone: {
      type: String,
    },
    address: {
      type: String,
    },
    city_id: {
      type: String,
    },
    city_name: {
      type: String,
    },
    zone_id: {
      type: String,
    },
    area_id: {
      type: String,
    },
    area_name: {
      type: String,
    },
    special_instruction: {
      type: String,
    },
    courierMethod: {
      type: String,
    },
    items: {
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
      default: "Pending",
    },
    invoice: {
      type: String,
    },
    tracking_code: {
      type: String,
    },
    note: {
      type: String,
    },
    courier_status: {
      type: String,
    },
    merchant_order_id: {
      type: String,
    },
    delivery_fee: {
      type: String,
    },
    consignment_id: {
      type: String,
    },
    deliveryCharge: {
      type: String,
    },
    itemPerDiscount: {
      type: String,
    },
    discount: {
      type: String,
    },
    coupon: {
      type: String,
      default: "",
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    totalActualPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("orders", OrderSchema);

export default OrderModel;
