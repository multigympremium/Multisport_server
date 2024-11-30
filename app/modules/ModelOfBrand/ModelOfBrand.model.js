import mongoose from "mongoose";

const ModelBrandSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ModelOfBrandModel = mongoose.model("models_of_brands", ModelBrandSchema);

export default ModelOfBrandModel;
