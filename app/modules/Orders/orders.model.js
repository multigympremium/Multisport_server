import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OrderSchema = Schema(
  {
    name: "Anamul",
    phone: "01961394375",
    secondary_phone: "01961394379",
    address: "1600 Fake Street",
    city_id: "32",
    city_name: "B. Baria",
    zone_id: "903",
    area_id: "18874",
    area_name: "Dularhat",
    special_instruction: "dfsdfadf asdf afadsf 453453565",
    items: [
      {
        productTitle: "MENS CASUAL SHIRT",
        shortDescription: "Short Description",
        fullDescription:
          '<p><strong style="color: rgb(55, 65, 81);">Full Description</strong></p>',
        price: 522,
        discountPrice: 5,
        rewardPoints: 5,
        stock: 5,
        productCode: "54545",
        metaTitle: "kk",
        metaKeywords: "hg",
        metaDescription: "hg",
        specialOffer: true,
        hasVariants: true,
        thumbnail: "1728189072154-58acca94f0313e0f56c2b0aab45c9257.webp",
        category: "Running",
        brandValue: "Apple",
        productColorValue: "#2aa73be8",
        productSizeValue: "lg",
        productFlagValue: "Flag Name Testing",
        modelOfBrandValue: "one_t_5",
        store_id: 126,
        quantity: 1,
        weight: "0.5",
      },
    ],
    payment_method: "cash",
    total: 39104,
    courierMethod: "SteadFast",
    itemCount: 1,
    items: {
      type: Array,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("orders", OrderSchema);

export default OrderModel;
