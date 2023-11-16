const UserModel = require("../../models/userSchema");
const { sendResponse, STATUS_CODES } = require("../../utils/utils");
const generateToken = require("../../config/generateToken");
const {
  userRegisterValidation,
  isValidObjectId,
} = require("../../utils/validation/validation");

exports.registerUser = async (req, res, next) => {
  let { email, password, firstname, lastname } = req.body;
  const { error, value } = userRegisterValidation.validate(req.body, UserModel);

  if (error) {
    return sendResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      false,
      null,
      // {error}
      error.details[0]
    );
  }
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
      firstname,
      lastname,
      email,
      password,
    });

    await newEmail.save();
    const userData = {
      id: newEmail._id,
    };
    const accessToken = await generateToken.accessToken(
      newEmail._id,
      newEmail.role
    );
    const refreshToken = await generateToken.refreshToken(userData);
    return sendResponse(
      res,
      STATUS_CODES.CREATED,
      true,
      {
        sccuessMessage: "User Registrated Successfully.",
        userInfo: newEmail,
        accessToken,
        refreshToken,
      },
      null
    );
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

//login
exports.userLogin = async (req, res, next) => {
  try {
    const checkEmail = await UserModel.findByCredentials(
      req.body.email,
      req.body.password
    );
    const userData = {
      id: checkEmail._id,
      role: checkEmail.role,
    };

    const accessToken = await generateToken.accessToken(
      checkEmail._id,
      checkEmail.role
    );
    const refreshToken = await generateToken.refreshToken(userData);

    return sendResponse(res, STATUS_CODES.SUCCESS, true, {
      message: "Login Successfull",
      userInfo: checkEmail,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return sendResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      false,
      null,
      error.message
    );
  }
};

//find by id
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid Id." });
  }
  try {
    const findUser = await UserModel.findById(id);
    if (!findUser) {
      return sendResponse(
        res,
        STATUS_CODES.NOT_FOUND,
        false,
        null,
        "User not found."
      );
    }
    return sendResponse(res, STATUS_CODES.SUCCESS, true, {
      message: "Fetch Details",
      userInfo: findUser,
    });
  } catch (error) {
    return sendResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      false,
      null,
      error
    );
  }
};

//update user
exports.updateUserprofile = async () => {
  let {error,value } = 
  try {
  } catch (error) {
    return sendResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      false,
      null,
      error
    );
  }
};

//delete user
exports.deleteUserAccount = async () => {
  try {
  } catch (error) {
    return sendResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      false,
      null,
      error
    );
  }
};
