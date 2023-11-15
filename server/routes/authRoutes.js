const express = require("express");
const {
  registerUser,
  userLogin,
} = require("../controllers/user/userController");
const authRoute = express.Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", userLogin);

module.exports = authRoute;
