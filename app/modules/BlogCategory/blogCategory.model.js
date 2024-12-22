import mongoose from "mongoose";

const productSizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BlogCategoryModel =
  mongoose.model.blog_categories ||
  mongoose.model("blog_categories", productSizeSchema);

export default BlogCategoryModel;
