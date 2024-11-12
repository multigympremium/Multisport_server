import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Assuming the rating is out of 5
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Storing the URL of the uploaded image
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const TestimonialsModel =

  mongoose.model("testimonials", TestimonialSchema);

export default TestimonialsModel;
