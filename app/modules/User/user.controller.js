import bcrypt from "bcryptjs";
import Users from "./user.model"; // Adjust the path to your userModel

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
