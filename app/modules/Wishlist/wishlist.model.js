import mongoose from "mongoose";
const { Schema, model } = mongoose;

const WishlistSchema = Schema(
  {
    user_id: {
      type: String,
      required: [true, "Please Add Name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please Add email"],
    },
    product_id: {
        type: String,
        required: [true, "Please Add product id"],
    }
    
  },
  { timestamps: true }
);

const WishlistModel = mongoose.models.wishlists || mongoose.model("wishlists", WishlistSchema);

export default WishlistModel;
