import moment from "moment";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UsersSchema = Schema(
  {
    username: {
      type: String,
      required: [true, "Please Add Name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please Add email"],
    },
    contact_no: {
      type: String,
      // required: [true, "Please Add Contact Number"],
    },
    first_name: {
      type: String,
      // required: [true, "Please Add Contact member id"],
    },
    last_name: {
      type: String,
      // required: [true, "Please Add Nickname"],
    },
    address: {
      type: String,
    },
    status: {
      type: String,
    },
    gender: {
      type: String,
      // required: [true, "Please Select Gender"],

      // enum: ["male", "female", "other"],
    },
    photourl: {
      type: String,
      // required: [true, "Please Add Photo"],
    },
    password: {
      type: String,
      // required: [true, "Please Add password"],
    },
    otp: {
      type: String,
    },
    otp_expiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    subscribe: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpires: {
      type: Date,
    },
    role: {
      type: String,
      default: "user",
    },
    register_date: {
      type: Date,
      default: moment().format("YYYY-MM-DD"),
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", UsersSchema);

export default Users;
