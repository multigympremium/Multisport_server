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
    list_name: {
      type: String,
      // required: [true, "Please Add Nickname"],
    },
    date_of_birth: {
      type: String,
      // required: [true, "Please Add Date of Birth"],
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

      enum: ["Male", "Female", "Other"],
    },
    religion: {
      type: String,
      // required: [true, "Please Add Religion"],
    },
    blood_group: {
      type: String,
      // required: [true, "Please Add Blood Group"],

      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""],
    },
    height: {
      type: String,
      // required: [true, "Please Add height"],
    },
    weight: {
      type: String,
      // required: [true, "Please Add Weight"],
    },
    profession: {
      type: String,
      // required: [true, "Please Add profession"],
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
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", UsersSchema);

export default Users;
