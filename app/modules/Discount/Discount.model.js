import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  percentageDiscountActive: {
    type: Boolean,
    default: false,
  },
  percentageDiscount: {
    type: Number,
    default: 0,
    min: 0,
  },
  orderAboveForPercentageDiscount: {
    type: Number,
    default: 0,
    min: 0,
  },
  flatDiscountActive: {
    type: Boolean,
    default: false,
  },
  flatDiscount: {
    type: Number,
    default: 0,
    min: 0,
  },
  orderAboveForFlatDiscount: {
    type: Number,
    default: 0,
    min: 0,
  },
  itemDiscountsActive: {
    type: Boolean,
    default: false,
  },
  itemDiscounts: [
    {
      id: {
        type: String,
        required: true,
      },
      buy: {
        type: Number,
        required: true,
        min: 1,
      },
      free: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  happyHourActive: {
    type: Boolean,
    default: false,
  },
  happyHourStart: {
    type: String,
    default: "17:00",
    validate: {
      validator: function (v) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // Validates HH:mm format
      },
      message: (props) =>
        `${props.value} is not a valid time format! Use HH:mm.`,
    },
  },
  happyHourEnd: {
    type: String,
    default: "19:00",
    validate: {
      validator: function (v) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // Validates HH:mm format
      },
      message: (props) =>
        `${props.value} is not a valid time format! Use HH:mm.`,
    },
  },
  happyHourDiscount: {
    type: Number,
    default: 0,
    min: 0,
  },
  loyaltyDiscountActive: {
    type: Boolean,
    default: false,
  },
  loyaltyDiscount: {
    type: Number,
    default: 0,
    min: 0,
  },
  promoCodeActive: {
    type: Boolean,
    default: false,
  },
  promoCode: {
    type: String,
    default: "",
    trim: true,
  },
  promoCodeDiscount: {
    type: Number,
    default: 0,
    min: 0,
  },
  discountText: {
    type: String,
    default: "",
    trim: true,
  },
  discountTextActive: {
    type: Boolean,
    default: false,
  },
});

const DiscountModel = mongoose.model("Discount", discountSchema);

export default DiscountModel;
