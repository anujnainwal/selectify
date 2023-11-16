const Joi = require("joi");
const mongoose = require("mongoose");
const userRegisterValidation = Joi.object({
  firstname: Joi.string().min(3).max(100).required().trim(),
  lastname: Joi.string().min(3).max(100).required().trim(),
  email: Joi.string().email().required().trim().normalize(),
  password: Joi.string().min(6).max(30).required().trim(),
});

//check valid mongooseId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

//update user
const updateUserValidation = Joi.object({
  firstname: Joi.string().min(3).max(100).required().label("First Name").trim(),
  lastname: Joi.string().min(3).max(100).label("Last Name").trim().required(),
});

module.exports = {
  userRegisterValidation,
  isValidObjectId,
  updateUserValidation,
};
