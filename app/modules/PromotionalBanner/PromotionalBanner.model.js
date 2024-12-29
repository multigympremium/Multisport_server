import mongoose from "mongoose";

const PromoSchema = new mongoose.Schema({
  headerText: {
    type: String,
    required: true, // Required to ensure the field is provided
    default: "Don't Miss!!",
  },
  titleText: {
    type: String,
    required: true,
    default: "Enhance Your Music Experience",
  },
  description: {
    type: String,
    required: true,
    default: "Description",
  },
  timeStart: {
    type: Date,
    required: true,
    default: new Date("2024-01-06T10:00:00"),
  },
  timeEnd: {
    type: Date,
    required: true,
    default: new Date("2024-01-10T23:00:00"),
  },
  buttonText: {
    type: String,
    required: true,
    default: "Check it Out",
  },
  buttonLink: {
    type: String,
    required: true,
    default: "#",
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  image: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const PromoBannerModel = mongoose.model("promotional_banner", PromoSchema);

export default PromoBannerModel;
