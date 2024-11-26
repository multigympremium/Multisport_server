import mongoose from "mongoose";

const socialLoginSchema = new mongoose.Schema({
  providers: [
    {
      name: {
        type: String,
        required: true,
        enum: ["Google", "Facebook"], // Extend this with more providers as needed
      },
      enabled: {
        type: Boolean,
        default: false,
      },
      clientId: {
        type: String,
        required: true,
      },
      clientSecret: {
        type: String,
        required: true,
      },
      redirectUrl: {
        type: String,
        required: true,
        default: "https://yourwebsite.com/auth/callback",
      },
      scope: {
        type: String,
        default: "email profile", // Adjust default based on provider
      },
      buttonText: {
        type: String,
        default: function () {
          return `Login with ${this.name}`;
        },
      },
    },
  ],
});

// Create the model
const SocialLoginConfig = mongoose.model("social_login_config", socialLoginSchema);

export default SocialLoginConfig;
