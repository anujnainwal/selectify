const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { TokenModel } = require("../models/tokenSchema");
const accessToken = async (id, role) => {
  return jwt.sign({ id, role }, process.env.SECRET_KEY, {
    expiresIn: process.env.SECRET_KEY_EXPIRES,
  });
};

const refreshToken = async (userData) => {
  const refreshToken = crypto.randomUUID();
  const token = new TokenModel({
    userID: userData.id,
    refreshToken: refreshToken,
    expireTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
  });
  await token.save();
  return refreshToken;
};

module.exports = { accessToken, refreshToken };
