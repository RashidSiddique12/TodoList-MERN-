const express = require("express");
const User = require("../models/user.js");
const {
  register,
  login,
  getMyProfile,
  logout,
} = require("../controllers/user.js");
const isAuthenticated = require("../middlewares/auth.js");

const router = express.Router();

router.post("/users/new", register);
router.post("/users/login", login);
router.get("/users/logout", logout);
router.get("/users/me", isAuthenticated, getMyProfile);

////
// router.get("/userId/:id", getUserdetails);

module.exports = router;
