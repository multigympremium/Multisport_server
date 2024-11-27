import mongoose from "mongoose";

const TawkLiveChatSchema = new mongoose.Schema(
  {
    isEnabled: {
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

const TawkLiveChatModel =

  mongoose.model("tawk_live_chat", TawkLiveChatSchema);

export default TawkLiveChatModel;
