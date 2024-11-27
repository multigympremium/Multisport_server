import mongoose from "mongoose";

const CrispLiveChatSchema = new mongoose.Schema(
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

const CrispLiveChatModel =

  mongoose.model("crisp_live_chat", CrispLiveChatSchema);

export default CrispLiveChatModel;
