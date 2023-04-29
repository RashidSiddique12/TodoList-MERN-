const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const setCookie = require("../utils/feature.js");
const ErrorHandler = require("../middlewares/error.js");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already exist", 404));

    // if (user) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "User Already exist",
    //   });
    // }
    const hasedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hasedPassword });
    setCookie(res, "Register Succesfully", user, 201);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid email or Password", 404));
    // if (!user) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid email or Password",
    //   });
    // }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid email or Password", 404));

    // if (!isMatch) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid email or Password",
    //   });
    // }
    setCookie(res, `Welcome back, ${user.name}`, user, 200);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successful",
    });
};

const getMyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile",
    user: req.user,
  });
};

// const getUserdetails = async (req, res) => {};

module.exports = { getMyProfile, register, login, logout };
