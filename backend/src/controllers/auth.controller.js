const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const User = require("../models/user.model");
const Role = require("../models/role.model");

const sendEmail = require("../utils/email");

//=========================Register logic================================
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if email already exists

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    await Role.findOrCreate({ where: { name: "patient" } });
    // default role: patient
    const role = await Role.findOne({ where: { name: "patient" } });
    if (!role) {
      return res.status(500).json({ message: "Patient role not found" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    const verifyToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      password: hashed,
      role_id: role.id,
      verify_token: verifyToken,
    });

    const verifyLink = `http://localhost:3000/api/auth/verify-email?token=${verifyToken}`;

    await sendEmail(
      user.email,
      "Verify Your Email",
      `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`
    );
    res.status(201).json({
      message: "Registration successful, Please verify your email.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//=========================login logic====================================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: { model: Role, attributes: ["name"] },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.is_verified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.Role.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.Role.name,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//=========================forgot-password logic============================
const requestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    user.reset_otp = otp;
    user.reset_otp_expiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    await sendEmail(
      user.email,
      "Password Reset OTP",
      `<p>Your OTP for password reset is <b>${otp}</b>. It will expire in 1 hour.</p>`
    );

    console.log("Reset OTP:", otp); // Debug only

    res.json({ message: "Password reset OTP sent to email" });
  } catch (error) {
    console.error("Request reset error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

//=========================reset-password logic============================
const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    const user = await User.findOne({ where: { reset_otp: otp } });

    if (!user || user.reset_otp_expiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.reset_otp = null;
    user.reset_otp_expiry = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

//=========================verify-Email logic============================
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    // check token
    const user = await User.findOne({ where: { verify_token: token } });
    if (!user) {
      return res.status(400).send("Invalid or expired verification link.");
    }

    if (user.is_verified) {
      return res.status(400).send("Email is already verified.");
    }

    // update user
    user.is_verified = true;
    user.verify_token = null;
    await user.save();

    // send confirmation email
    await sendEmail(
      user.email,
      "Email Verified Successfully",
      `<p>${user.name}, your email has been verified successfully.</p>`
    );

    res.send("Your email has been verified successfully. You can now log in.");
  } catch (error) {
    console.error("Verify Email Error:", error);
    res.status(500).send("Something went wrong. Please try again.");
  }
};

module.exports = {
  register,
  login,
  requestResetPassword,
  resetPassword,
  verifyEmail,
};
