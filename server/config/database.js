const mongoose = require("mongoose");

const database = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((response) => {
      console.log("Connection Host: ", response.connection.host);
    })
    .catch((error) => {
      console.log("Error in DB connection: " + error);
    });
};
mongoose.connection.on("error", (err) => {
  console.log("Error in DB connection");
});
mongoose.connection.on("connected", (connection) => {
  console.log("Connection conneccted");
});

module.exports = database;
