import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    css: {
      type: String,
    },
    headerJs: {
      type: String,
    },
    footerJs: {
      type: String, 
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const CustomCssAndJsModel =
  mongoose.model("custom_css_and_js", TestimonialSchema);

export default CustomCssAndJsModel;
