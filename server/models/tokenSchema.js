const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const tokenSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expireTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
const TokenModel = mongoose.model("token", tokenSchema);
module.exports = {
  TokenModel,
};
