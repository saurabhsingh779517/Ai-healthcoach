const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendVerificationEmail = require("../services/EmailServices");

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
     
    
  
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });
   

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Hash token
    const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isEmailVerified: false,
      emailVerificationToken: hashedToken,
      emailVerificationExpires: new Date(
        Date.now() + 15 * 60 * 1000
      ),
    });

    //
   console.log("sending verification email");
const info =  await sendVerificationEmail(email, verificationToken);
  console.log("email sending completed");
  
    res.status(201).json({
      message: "Registration successful",
      
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Server error register"
    });
  }
};


// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
   if (!user.isEmailVerified) {
  return res.status(403).json({
    message: "Please verify your email before logging in",
  });
}
    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};
const verifyEmail = async (req, res) => {
  try {

    const { token } = req.params;

    const user = await User.findOne({
      emailVerificationToken: token,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid verification token",
      });
    }

    if (
      !user.emailVerificationExpires ||
      user.emailVerificationExpires < new Date()
    ) {
      return res.status(400).json({
        message: "Verification token has expired",
      });
    }

    user.isEmailVerified = true;

    user.emailVerificationToken = null;

    user.emailVerificationExpires = null;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully. You can now login.",
    });

  } catch (error) {

    console.error("Email verification error:", error);

    return res.status(500).json({
      message: "Server error while verifying email",
    });
  }
};
module.exports = {
  register,
  login,
  verifyEmail,
};