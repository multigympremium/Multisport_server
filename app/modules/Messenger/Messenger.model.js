import mongoose from "mongoose";

const MessengerSchema = new mongoose.Schema(
  {
    pageId: {
      type: String,
      required: true,
    },
    appId: {
      type: String,
      required: true,
    },
    isEnabled: {
      type: Boolean,
      required: true,
    }
  },
  { timestamps: true }
);

const MessengerModel =

  mongoose.model("messenger", MessengerSchema);

export default MessengerModel;
