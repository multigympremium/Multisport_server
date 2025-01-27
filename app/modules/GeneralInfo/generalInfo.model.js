import mongoose from "mongoose";

const SchemaModel = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    google_map_link: {
      type: String,
    },
    play_store_link: {
      type: String,
    },
    app_store_link: {
      type: String,
    },
    trade_license: {
      type: String,
    },
    tin_no: {
      type: String,
    },
    bin_no: {
      type: String,
    },
    footer_copyright: {
      type: String,
    },
  },
  { timestamps: true }
);

const GeneralInfoModel = mongoose.model("general_info", SchemaModel);

export default GeneralInfoModel;
