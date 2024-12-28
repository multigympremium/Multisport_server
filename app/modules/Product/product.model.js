import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productTitle: {
      type: String,
      // required: true,
    },
    shortDescription: {
      type: String,
      // required: true,
    },
    fullDescription: {
      type: String,
      // required: true,
    },
    specification: {
      type: String,
      // required: true,
    },
    returnPolicy: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
    },
    discountPrice: {
      type: Number,
    },
    rewardPoints: {
      type: Number,
    },
    stock: {
      type: Number,
      // required: true,
    },
    productCode: {
      type: String,
      // required: true,
    },
    metaTitle: {
      type: String,
    },
    metaKeywords: {
      type: String, // Array of keywords
    },
    metaDescription: {
      type: String,
    },
    specialOffer: {
      type: Boolean,
      default: false,
    },
    hasVariants: {
      type: Boolean,
      default: false,
    },
    thumbnail: {
      type: String, // File URL or path for the thumbnail
    },
    gallery: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product_galleries",
      },
    ],
    category: {
      type: String,
      // require: true,
    },
    brandValue: {
      type: String,
      // require: true,
    },
    productColorValue: {
      type: Array,
    },
    productSizeValue: {
      type: Array,
    },
    productFlagValue: {
      type: String,
    },

    subcategory: {
      type: String,
      // require: true,
    },
    childCategory: {
      type: String,
      // require: true,
    },
    isRecommended: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
    wishCount: {
      type: Number,
      default: 0,
    },
    modelOfBrandValue: {
      type: String,
    },
    colorAndSize: {
      type: Array,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("products", ProductSchema);

export default ProductModel;
