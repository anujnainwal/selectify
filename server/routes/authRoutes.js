const express = require("express");
const {
  registerUser,
  userLogin,
  getUserById,
} = require("../controllers/user/userController");
const { AuthCheck } = require("../middleware/jwtVerify");
const authRoute = express.Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", userLogin);

authRoute.get("/:id", AuthCheck, getUserById);
authRoute.put("/updateUser", AuthCheck);
authRoute.delete("/:id", AuthCheck);

//common routes for both user and admin
authRoute.post("/refreshToken");

module.exports = authRoute;
