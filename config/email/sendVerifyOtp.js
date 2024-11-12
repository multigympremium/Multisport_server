
import { sendEmailWithResend } from "./sendEmailWithResend.js";

const sendVerifyOtp = async (email, otp) => {
  const html = `
    <h1>Dot.cards</h1>
    <p>Hello,</p>
    <p>Please verify your email to continue.</p>
    <p>Your OTP is: ${otp}</p>
    <p>Thanks,</p>
    <p>Dot.cards Team</p>
  `;

  const text = `
    Hello,
    Please verify your email to continue.
    Your OTP is: ${otp}
    Thanks,
    Dot.cards Team
  `;

  const mailResult = await sendEmailWithResend(email, "Dot.cards Verify OTP", text, html);

  return mailResult;
};

export default sendVerifyOtp;
