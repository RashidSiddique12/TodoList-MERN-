const User = require("../models/user");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);
  if (!token) {
    res.status(404).json({
      success: false,
      message: "login first",
    });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decode._id);
  next();
};

module.exports = isAuthenticated;
