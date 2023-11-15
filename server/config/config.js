const whiteListed = ["http://localhost:3000", "http://localhost:4040"];
//cors options
exports.corsOptions = {
  origin: function (origin, callback) {
    if (whiteListed.indexOf(origin) !== -1 || !origin) {
      callback(null);
    } else {
      callback(new Error("Not Allowed by CORS."));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};
