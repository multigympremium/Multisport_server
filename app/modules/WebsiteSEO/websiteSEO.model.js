import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  metaTitle: {
    type: String,
    default: "Online Ecommerce Shopping",
  },
  metaKeywords: {
    type: String,
    default: "ecommerce, shopping, online",
  },
  metaDescription: {
    type: String,
    default: "Shop the latest trends at Fejmo, your go-to destination for online fashion and lifestyle shopping...",
  },
  metaOgTitle: {
    type: String,
    default: "Online Ecommerce Shopping",
  },
  metaOgDescription: {
    type: String,
    default: "",
  },
  metaOgImage: {
    type: String, // URL to image
  },
}, { timestamps: true });

const WebsiteSEO_Model =  mongoose.model('Seo', seoSchema);

export default WebsiteSEO_Model