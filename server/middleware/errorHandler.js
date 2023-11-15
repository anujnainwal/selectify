const notFound = (req, res, next) => {
  let error = `This origin ${req.originalUrl} does not exist.`;
  return res.status(404).json({ error: error });
};

const errorHandler = (err, req, res) => {
  // Define a standard error response structure
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const errorResponse = {
    error: true,
    message: err.message || "Internal Server Error",
    stack: err.stack,
  };

  // Set the HTTP status code based on the error type
  return res.status(statusCode).json(errorResponse);
};

module.exports = { errorHandler, notFound };
