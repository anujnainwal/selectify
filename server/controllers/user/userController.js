const UserModel = require("../../models/userSchema");
const { sendResponse, STATUS_CODES } = require("../../utils/utils");

exports.registerUser = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    const existingEmail = await UserModel.findOne({ email: email });
    if (existingEmail) {
      return sendResponse(
        res,
        STATUS_CODES.USER_ALREADY_EXISTS,
        false,
        null,
        `This ${email} already exists.`
      );
    }
    const newEmail = new UserModel({
      email,
      password,
    });
    await newEmail.save();
    return sendResponse(
      res,
      STATUS_CODES.CREATED,
      true,
      { sccuessMessage: "User Registrated Successfully.", newEmail },
      null
    );
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

//login
exports.userLogin = async (req, res, next) => {
  try {
    const match = await UserModel.findByCredentials(
      req.body.email,
      req.body.password
    );

    return sendResponse(res, STATUS_CODES.SUCCESS, true, {
      message: "Login Successfull",
      userDetails: match,
    });
  } catch (error) {
    return sendResponse(
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      false,
      null,
      error.message
    );
  }
};
