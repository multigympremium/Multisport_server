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
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ChildCategoryModel =

  mongoose.model("child_categories", childCategorySchema);

export default ChildCategoryModel;
