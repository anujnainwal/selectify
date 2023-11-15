const express = require("express");
const database = require("../config/database");
const authRoute = require("../routes/authRoutes");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("../middleware/errorHandler");
const app = express();

//database
database();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));

//auth routes
app.use("/api/user", authRoute);
//notFound
app.use(notFound);
app.use(errorHandler);
module.exports = app;
