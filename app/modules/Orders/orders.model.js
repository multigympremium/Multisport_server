import moment from "moment";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const generateInvoiceSerial = () => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const date = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${year}${month}${date}${hours}${minutes}${seconds}`;
};

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
      // type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    totalItems: {
      type: Number,
      required: true,
    },
    totalActualPrice: {
      type: Number,
    },
    totalWeight: {
      type: Number,
    },
    order_date: {
      type: String,
      default: moment().format("YYYY-MM-DD-HH:mm:ss"),
    },
    orderOverview: {
      type: String,
    },
    email: {
      type: String,
    },
    invoice_id: {
      type: String,

      unique: true,

      default: generateInvoiceSerial(),
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("orders", OrderSchema);

export default OrderModel;
