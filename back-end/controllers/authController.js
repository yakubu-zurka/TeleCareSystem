const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, userType } = req.body;

    if (!fullName || !email || !password || !userType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // ✅ Hash password only once
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("🔹 Plain Password:", password);
    console.log("🔹 Hashed Password (Stored in DB):", hashedPassword);

    user = new User({ fullName, email, password: hashedPassword, userType });
    await user.save();

    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      userType: user.userType,
    });
  } catch (error) {
    console.error("🚨 Signup Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message || error });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    console.log("🔹 Input Password:", password);
    console.log("🔹 Stored Hashed Password:", user.password);

    // ✅ Properly compare plaintext password with hashed password in the database
    const isMatch = await (password, user.password);
    console.log("✅ Password Match:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email, userType: user.userType }
    });
  } catch (error) {
    console.error("🚨 Login Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message || error });
  }
};

// Get logged-in user's profile
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("🚨 Get Current User Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
