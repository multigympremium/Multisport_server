import mongoose from "mongoose";
const { Schema, model } = mongoose;

const subcategorySchema = Schema(
  {
    subcategoryName: {
      type: String,
      required: true,
    },
    subcategoryIcon: {
      type: String,
    },
    subcategoryImage: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    childCategoryId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "child_categories",
    },
    
  },
  { timestamps: true }
);

const SubcategoryModel =
  mongoose.model.subcategories ||  mongoose.model("subcategories", subcategorySchema);

export default SubcategoryModel;
