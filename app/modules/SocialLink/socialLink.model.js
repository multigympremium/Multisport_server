import mongoose from 'mongoose';

const socialMediaLinksSchema = new mongoose.Schema({
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  messenger: {
    type: String,
  },
  whatsapp: {
    type: String,
  },
  telegram: {
    type: String,
  },
  youtube: {
    type: String,
  },
  tiktok: {
    type: String,
  },
  pinterest: {
    type: String,
  },
  viber: {
    type: String,
  }
});

const SocialLinkModel = mongoose.models.social_media_links || mongoose.model('social_media_links', socialMediaLinksSchema);

export default SocialLinkModel