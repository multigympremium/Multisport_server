import mongoose from "mongoose";
const { Schema, model } = mongoose;

const WishlistSchema = Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    email: {
      type: String,
      required: [true, "Please Add email"],
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  },
  { timestamps: true }
);

const WishlistModel = mongoose.model("wishlists", WishlistSchema);

export default WishlistModel;
