import bcrypt from "bcryptjs";
import Users from "./user.model.js"; // Adjust the path to your userModel

import OtpModel from "./otp.model.js";
// import moment from "moment";
import sendVerifyOtp from "../../../config/email/sendVerifyOtp.js";
import { generateOTP } from "../../helpers/generateOTP.js";
import { uploadFile } from "../../helpers/aws-s3.js";
import e from "express";

import moment from "moment-timezone";
import axios from "axios";

export default async function updatePassword (req, res) {
  const { email, password } = req.body;

  console.log(email, password, "email password");

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found with the provided email" });
    }

    // Generate salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password and save the old password
    await Users.updateOne(
      { email },
      {
        password: hashedPassword,
        old_password: user.password,
      }
    );

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function loginUser(req, res) {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    console.log(email, "email", password, "password", process.env.MONGODB_URI);
  
    try {
      const userResult = await Users.findOne({ email: email });
  
      console.log(userResult, "UserResult");
  
      if (!userResult) {
        return res.status(404).json({ message: "Invalid email or user" });
      }
  
      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, userResult.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      res.status(200).json({ message: "User verified successfully", user: userResult });
    } catch (error) {
      console.error("Error verifying user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

export async function sendOtp(req, res) {
  moment.tz.setDefault("Asia/Dhaka");
  try {
    const { email } = req.body;

    console.log(email, "username, email");

    if (!email) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const otp = generateOTP();
    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(otp, salt);
    const otp_expiration_time = process.env.OTP_EXPIRATION_TIME || 5;

    const existingUser = await Users.findOne({ email });
    const existingOtp = await OtpModel.findOne({ email });

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ error: "User already exists" });
      }
    }

    const otp_expiry = Date.now() + otp_expiration_time * 60000;

    if (existingOtp) {
      const updateOtpResult = await OtpModel.updateOne(
        { email },
        {
          otp: hashedOTP,
          otp_expiry:  moment()
          .add(otp_expiration_time, "minutes")
          .format("YYYY-MM-DD HH:mm:ss"),
        },
        { new: true }
      );

      if (updateOtpResult.acknowledged) {
        await sendVerifyOtp(email, otp);

        return res.status(200).json({
          message: "OTP sent successfully",
          otp_expiry: moment()
            .add(otp_expiration_time, "minutes")
            .format("YYYY-MM-DD HH:mm:ss"),
          otp_limitation_time: otp_expiration_time,
        });
      }
    }

    const otp_document = new OtpModel({
      email,
      otp: hashedOTP,
      otp_expiry,
    });

    const otpResult = await otp_document.save();

    if (otpResult) {
      await sendVerifyOtp(email, otp);

      return res.status(200).json({
        message: "OTP sent successfully",
        otp_expiry: moment()
          .add(otp_expiration_time, "minutes")
          .format("YYYY-MM-DD HH:mm:ss"),
        otp_limitation_time: otp_expiration_time,
      });
    }

    return res.status(400).json({ error: "User not created" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}




export async function verifyOtp(req, res) {
    const { email, otp } = req.body;
  
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
  
    const otpResult = await OtpModel.findOne({ email });
  
    if (!otpResult) {
      return res.status(400).json({ message: "Invalid email or OTP" });
    }
  
    // Check if OTP has expired
    if (Date.now() > otpResult.otp_expiry) {
      return res.status(400).json({ message: "OTP has expired" });
    }
  
    // Compare the provided OTP with the hashed OTP
    const isMatch = await bcrypt.compare(otp, otpResult.otp);
  
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  
    return res.status(200).json({ message: "OTP verified successfully" });
  }


export async function createSystemUser(req, res) {
    try {
      const { first_name, last_name, email, password, contact_no, address, gender , role} = req.body;
  
      console.log( email, password, "username, email, password");
  
      if ( !email || !password || !contact_no || !address || !gender || !role) {
        return res.status(400).json({ error: "Please fill in all fields" });
      }

      const image = req.files.photourl;

    let thumbnailUrl = "";
    if (image && image.size > 0) {
      thumbnailUrl = `${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      await uploadFile(image, thumbnailUrl, image.type);
    }
  
      const salt = await bcrypt.genSalt(10);
  
      const existingUser = await Users.findOne({ email });
  
      if (existingUser) {
        if (existingUser.isVerified) {
          return res.status(400).json({ error: "User already exists" });
        } else {
          const otp = generateOTP(); // Generate OTP
          await sendVerifyOtp(email, otp);
          return res.status(400).json({ error: "Verification pending. OTP sent to email." });
        }
      }
  
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new Users({
        username: first_name + " " + last_name,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashedPassword,
        contact_no: contact_no,
        address: address,
        gender: gender,
        photourl: thumbnailUrl,
        role: role
      });
  
      const userResult = await user.save();
  
      if (userResult) {
        return res.status(200).json({
          message: "User Created successfully",
          user: userResult,
        });
      }
  
      return res.status(400).json({ error: "User not created" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
}

export async function getSystemUser(req, res) {
    try {
  
      const existingUser = await Users.find({ role: {$ne: "user"} });
  
      if (!existingUser) {
        return res.status(400).json({ error: "User not found" });
      }
  
      return res.status(200).json({ data: existingUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
}
export async function signUp(req, res) {
    try {
      const { username, email, password } = req.body;
  
      console.log(username, email, password, "username, email, password");
  
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Please fill in all fields" });
      }
  
      const salt = await bcrypt.genSalt(10);
  
      const existingUser = await Users.findOne({ email });
  
      if (existingUser) {
        if (existingUser.isVerified) {
          return res.status(400).json({ error: "User already exists" });
        } else {
          const otp = generateOTP(); // Generate OTP
          await sendVerifyOtp(email, otp);
          return res.status(400).json({ error: "Verification pending. OTP sent to email." });
        }
      }
  
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new Users({
        username: username,
        email: email,
        password: hashedPassword,
      });
  
      const userResult = await user.save();
  
      if (userResult) {
        return res.status(200).json({
          message: "User Created successfully",
          user: userResult,
        });
      }
  
      return res.status(400).json({ error: "User not created" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
}

export const getSystemUserById = async (req, res)=> {
  const id = req.params.id;

  const existingUser = await Users.findById(id);

  if(!existingUser) {
    return res.status(404).json({error: "User not found"});
  }

  return res.status(200).json(existingUser);
}

export const updateSystemUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);  
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: "Error updating user" });
  }
}


export const deleteSystemUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.remove();
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export async function verifyRecaptcha(req, res) {

  const { token } = req.body;

  console.log(token, "token")
  console.log(process.env.RECAPTCHA_SECRET_KEY, "process.env.RECAPTCHA_SECRET_KEY")

  try {
    const response = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, // No body data for URL-encoded request
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
      })

    console.log(response.data, "response.data")

    if (response.data.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log(error, "error")
  }

}


