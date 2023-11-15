const app = require("../src/app");
const request = require("supertest");

request(app)
  .get("/some")
  .expect(500) // Check the response status code
  .end((err, res) => {
    if (err) throw err; // Handle any error in the request
    // Additional assertions on the response can be added here if needed
  });
