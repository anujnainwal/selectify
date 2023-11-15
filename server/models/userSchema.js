const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const genSalt = 12;

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  //   mobile: {
  //     type: String,
  //     required: true,
  //     unique: true,
  //   },
  password: {
    type: String,
    required: true,
  },
});
//hashPassword;
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(genSalt);
  const hashPassword = await bcrypt.hash(user.password, salt);
  user.password = hashPassword;
  next();
});

//compare Password
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};

const UserModel = mongoose.model("Users", userSchema);
module.exports = UserModel;
