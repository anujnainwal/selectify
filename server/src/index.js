require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 5050;

const server = app.listen(port, () => {
  console.log("listening on port " + port);
});

// Handle unhandled promise rejections or other errors
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  // Gracefully handle or log the error as needed
  server.close(() => {
    process.exit(1); // Exit the application
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // Gracefully handle or log the error as needed
  server.close(() => {
    process.exit(1); // Exit the application
  });
});
