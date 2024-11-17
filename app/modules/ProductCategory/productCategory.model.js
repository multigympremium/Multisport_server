import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    featureCategory: {
      type: String,
      required: true,
    },
    showOnNavbar: {
      type: String,
      required: true,
    },
    categoryIcon: {
      type: String,
      // required: true,
    },
    categoryBanner: {
      type: String,
      // required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CategoryModel =
 mongoose.model("categories", categorySchema);

export default CategoryModel;
