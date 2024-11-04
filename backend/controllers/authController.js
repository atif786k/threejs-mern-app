const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ msg: 'User created successfully', token });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ msg:'User login successfully', token });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { registerUser, loginUser };