const User = require("../models/user-models");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")
const sendVerificationEmail = require("../configs/SendEmail");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // ✅ Check if all fields are provided
    if (!name || !email || !password) {
      return next(new Error("All fields are required"));
    }

    // ✅ Check if user already exists
    const isExist = await User.findOne({ email });
    if (isExist) {
      return next(new Error("User already exists"));
    }

    // ✅ Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Generate verification token
    const verifyToken = crypto.randomBytes(32).toString("hex");

    // ✅ Create user in DB
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // Store hashed password
      verifyToken,
    });

    // ✅ Send verification email
    try {
      await sendVerificationEmail(email, newUser.verifyToken);
    } catch (emailError) {
      return next(new Error("User Verification Failed"));
    }

    res
      .status(201)
      .json({
        success: true,
        message: "User registered. Please check your email for verification.",
      });
  } catch (error) {
    return next(new Error(error.message || "Backend error"));
  }
};
const verify_email =async(req,res,next)=>{ {
  try {
    const { token } = req.query;

    const user = await User.findOne({ verifyToken:token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verifyToken = null;
    await user.save();

    res
      .status(200)
      .json({ 
        success: true,
        message: "Email verified successfully. You can now log in." });
  } catch (error) {
    next(error);
  }
}}


const login=async(req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new Error("All fields are required"));
    }

    // ✅ Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new Error("User not found"));
    }
    //check is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "Email is not verified" });
    }
    // ✅ Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new Error("Incorrect email or password"));
    }
    // ✅ Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      role: user.role,
    });
  }catch (error) {
    console.log("email, password error",error);
    return next(new Error(error.message || "Backend error"));
  }

}




module.exports = { register,verify_email,login };
