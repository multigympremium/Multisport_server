import mongoose from 'mongoose';

const colorSettingsSchema = new mongoose.Schema({
  primaryColor: {
    type: String,
    required: true,
  },
  secondaryColor: {
    type: String,
    required: true,
  },
  tertiaryColor: {
    type: String,
    required: true,
  },
  titleColor: {
    type: String,
    required: true,
  },
  paragraphColor: {
    type: String,
    required: true,
  },
  borderColor: {
    type: String,
    required: true,
  }
});
const WebsiteThemeColorModel = mongoose.model('color_settings', colorSettingsSchema);

export default WebsiteThemeColorModel