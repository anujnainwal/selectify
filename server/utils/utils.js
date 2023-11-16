const STATUS_CODES = {
  SUCCESS: {
    code: 200,
    message: "Success",
  },
  CREATED: {
    code: 201,
    message: "Created",
  },
  BAD_REQUEST: {
    code: 400,
    message: "Bad Request",
  },
  UNAUTHORIZED: {
    code: 401,
    message: "Unauthorized",
  },
  FORBIDDEN: {
    code: 403,
    message: "Forbidden",
  },
  NOT_FOUND: {
    code: 404,
    message: "Not Found",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "Internal Server Error",
  },
  USER_ALREADY_EXISTS: {
    code: 409,
    message: "User Registration Failed: User Already Exists",
  },
};

// Function to send a response with a specific status code
const sendResponse = (
  res,
  status,
  success,
  data = undefined,
  error = undefined
) => {
  const { code, message } = status;

  const response = {
    success,
    message,
    data,
    error: error ? error.message : null,
  };

  return res.status(code).json(response);
};

module.exports = {
  STATUS_CODES,
  sendResponse,
};
