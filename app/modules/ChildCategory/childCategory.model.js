import mongoose from "mongoose";
const { Schema, model } = mongoose;

const childCategorySchema = Schema(
  {
    subcategory: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    childCategoryName: {
      type: String,
    },
    childCategoryIcon: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ChildCategoryModel =
  mongoose.models.child_categories ||
  mongoose.model("child_categories", childCategorySchema);

export default ChildCategoryModel;
